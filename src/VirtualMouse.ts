import {
  IMouseSnapshot,
  MouseAction,
  MouseLocation,
} from "@fullstackcraftllc/codevideo-types";

/**
 * A virtual mouse that keeps track of its position and actions
 */
export class VirtualMouse {
  private currentLocation: MouseLocation = "editor";
  // the absolute path of the file currently hovered over in the file explorer
  private currentHoveredFileName: string = "";
  // the absolute path of the folder currently hovered over in the file explorer
  private currentHoveredFolderName: string = "";
  // the absolute path of the file currently hovered over in the editor
  private currentHoveredEditorTabFileName: string = "";
  // current cursor position in pixels - we allow both to be negative because a user may not want to have a cursor shown or used
  private currentCursorPosition: { x: number; y: number } = { x: -1, y: -1 }; 
  private actionsApplied: MouseAction[] = [];
  private verbose = false;

  constructor(actions?: MouseAction[], verbose?: boolean) {
    this.verbose = verbose || false;
    if (actions) {
      this.applyActions(actions);
    }
  }

  /**
   * Applies a snapshot to the virtual mouse
   * Useful for restoring the state of the mouse at a given point in time
   * @param snapshot The snapshot to apply
   */
  applySnapshot(snapshot: IMouseSnapshot) {
    this.currentLocation = snapshot.location;
    this.currentHoveredFileName = snapshot.currentHoveredFileName;
    this.currentHoveredFolderName = snapshot.currentHoveredFolderName;
    this.currentHoveredEditorTabFileName = snapshot.currentHoveredEditorTabFileName;
    this.currentCursorPosition = { x: snapshot.x, y: snapshot.y };
  }

  /**
   * Applies a list of actions to the virtual mouse
   * @param actions The actions to apply
   */
  applyActions(actions: MouseAction[]) {
    actions.forEach((action) => {
      this.applyAction(action);
    });
  }

  /**
   * Applies an action to the virtual mouse
   * @param action The action to apply
   */
  applyAction(action: MouseAction) {
    switch (action.name) {
      // movement actions
      case 'mouse-move-file-explorer':
        this.currentLocation = 'file-explorer';
        break;
      case 'mouse-move-terminal':
        this.currentLocation = 'terminal';
        break;
      case 'mouse-move-editor':
        this.currentLocation = 'editor';
        break;
      case 'mouse-move-file-explorer-file':
        this.currentLocation = 'file-explorer-file';
        this.currentHoveredFileName = action.value;
        break;
      case 'mouse-move-file-explorer-folder':
        this.currentLocation = 'file-explorer-folder';
        this.currentHoveredFolderName = action.value;
        break;
      case 'mouse-move-to-coordinates-pixels':
        // TODO: would need to introduce an entire virtual screen / coordinates system
        break;
      case 'mouse-move-to-coordinates-percent':
        // TODO: would need to introduce an entire virtual screen / coordinates system
        break;
      // file explorer context menu movements (new file, new folder)
      case 'mouse-move-file-explorer-context-menu-new-file':
        this.currentLocation = 'file-explorer-context-menu-new-file';
        break;
      case 'mouse-move-file-explorer-context-menu-new-folder':
        this.currentLocation = 'file-explorer-context-menu-new-folder';
        break;
      // file context menu movements (rename, delete)
      case 'mouse-move-file-explorer-file-context-menu-rename':
        this.currentLocation = 'file-explorer-file-context-menu-rename';
        break;
      case 'mouse-move-file-explorer-file-context-menu-delete':
        this.currentLocation = 'file-explorer-file-context-menu-delete';
        break;
      // folder context menu movements (new file, new folder, rename, delete)
      case 'mouse-move-file-explorer-folder-context-menu-new-file':
        this.currentLocation = 'file-explorer-folder-context-menu-new-file';
        break;
      case 'mouse-move-file-explorer-folder-context-menu-new-folder':
        this.currentLocation = 'file-explorer-folder-context-menu-new-folder';
        break;
      case 'mouse-move-file-explorer-folder-context-menu-rename':
        this.currentLocation = 'file-explorer-folder-context-menu-rename';
        break;
      case 'mouse-move-file-explorer-folder-context-menu-delete':
        this.currentLocation = 'file-explorer-folder-context-menu-delete';
        break;
      // editor tab movements (tab itself and tab close button)
      case 'mouse-move-editor-tab':
        this.currentLocation = 'editor-tab';
        this.currentHoveredEditorTabFileName = action.value;
        break;
      case 'mouse-move-editor-tab-close':
        this.currentLocation = 'editor-tab-close';
        this.currentHoveredEditorTabFileName = action.value;
        break;
      // unsaved changes dialog movements
      case 'mouse-move-unsaved-changes-dialog-button-save':
        this.currentLocation = 'unsaved-changes-dialog-button-save';
        break;
      case 'mouse-move-unsaved-changes-dialog-button-dont-save':
        this.currentLocation = 'unsaved-changes-dialog-button-dont-save';
        break;
      case 'mouse-move-unsaved-changes-dialog-button-cancel':
        this.currentLocation = 'unsaved-changes-dialog-button-cancel';
        break;
    }

    // any time we move away from a file, reset the hovered file name
    if (action.name.startsWith('mouse-move') &&
      action.name !== 'mouse-move-file-explorer-file' &&
      !action.name.startsWith("mouse-move-file-explorer-file-context-menu-")) {
      // reset the hovered file name if we're not hovering over a file or in the file context menu
      this.currentHoveredFileName = '';
    }

    // any time we move away from a folder, reset the hovered folder name
    if (action.name.startsWith('mouse-move') &&
      action.name !== 'mouse-move-file-explorer-folder' &&
      !action.name.startsWith("mouse-move-file-explorer-folder-context-menu-")) {
      // reset the hovered folder name if we're not hovering over a folder or in the folder context menu
      this.currentHoveredFolderName = '';
    }

    // any time we move away from an editor tab, reset the hovered editor tab index
    if (action.name.startsWith('mouse-move') &&
      action.name !== 'mouse-move-editor-tab' &&
      action.name !== 'mouse-move-editor-tab-close') {
      // reset the hovered editor tab index if we're not hovering over an editor tab
      this.currentHoveredEditorTabFileName = '';
    }

    this.actionsApplied.push(action);

    if (this.verbose) {
      console.log(`Action Name: ${action.name}, Action Value: ${action.value}`);
    }
  }

  /**
   * Gets the current mouse snapshot
   * @returns The current mouse snapshot
   */
  getCurrentMouseSnapshot(): IMouseSnapshot {
    return {
      location: this.currentLocation,
      currentHoveredFileName: this.currentHoveredFileName,
      currentHoveredFolderName: this.currentHoveredFolderName,
      currentHoveredEditorTabFileName: this.currentHoveredEditorTabFileName,
      x: 0,
      y: 0,
      timestamp: 0,
      type: 'move',
      button: 0,
      buttonStates: {
        left: false,
        right: false,
        middle: false,
      },
      scrollPosition: {
        x: 0,
        y: 0,
      },
      scrollDelta: 0,
    }
  }

  /**
   * Gets the current location of the mouse
   * @returns The mouses' current location
   */
  getCurrentLocation(): MouseLocation {
    return this.currentLocation
  }

  /**
   * Gets the current cursor position
   * @returns The current cursor position
   */
  getCurrentCursorPosition(): { x: number; y: number } {
    return this.currentCursorPosition;
  }

  /**
   * Gets the actions applied
   * @returns The actions applied
   */
  getActionsApplied(): MouseAction[] {
    return this.actionsApplied;
  }

  /**
  * Sets the verbose mode for the virtual file explorer
  * @param verbose Whether to enable verbose
  */
  setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }
}