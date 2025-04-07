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
  private currentHoveredFileName: string = "";
  private currentHoveredFolderName: string = "";
  private actionsApplied: MouseAction[] = [];
  private verbose = false;

  constructor(actions?: MouseAction[], verbose?: boolean) {
    this.verbose = verbose || false;
    if (actions) {
      this.applyActions(actions);
    }
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
      // file explorer context menu movements
      case 'mouse-move-file-explorer-context-menu-new-file':
        this.currentLocation = 'file-explorer-context-menu-new-file';
        break;
      case 'mouse-move-file-explorer-context-menu-new-folder':
        this.currentLocation = 'file-explorer-context-menu-new-folder';
        break;
      // file context menu movements
      case 'mouse-move-file-explorer-file-context-menu-rename':
        this.currentLocation = 'file-explorer-file-context-menu-rename';
        break;
      case 'mouse-move-file-explorer-file-context-menu-delete':
        this.currentLocation = 'file-explorer-file-context-menu-delete';
        break;
      // folder context menu movements
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
    }

    if (action.name.startsWith('mouse-move') && action.name !== 'mouse-move-file-explorer-file') {
      // reset the hovered file name if we're not hovering over a file
      this.currentHoveredFileName = '';
    }

    if (action.name.startsWith('mouse-move') && action.name !== 'mouse-move-file-explorer-folder') {
      // reset the hovered folder name if we're not hovering over a folder
      this.currentHoveredFolderName = '';
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