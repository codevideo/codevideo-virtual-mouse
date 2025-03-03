import {
  AuthorAction,
} from "@fullstackcraftllc/codevideo-types";

/**
 * A virtual author that can be used to simulate an author in the CodeVideo ecosystem.
 */
export class VirtualAuthor {
  private currentSpeechCaption = "";
  private actionsApplied: AuthorAction[] = [];
  private verbose = false;

  constructor(actions?: AuthorAction[], verbose?: boolean) {
    this.verbose = verbose || false;
    if (actions) {
      this.applyActions(actions);
    }
  }

  /**
   * Applies a list of actions to the virtual author
   * @param actions The actions to apply
   */
  applyActions(actions: AuthorAction[]) {
    actions.forEach((action) => {
      this.applyAction(action);
    });
  }

  /**
   * Applies an action to the virtual author
   * @param action The action to apply
   */
  applyAction(action: AuthorAction) {
    switch (action.name) {
      case "author-speak-before":
      case "author-speak-during":
      case "author-speak-after":
        this.currentSpeechCaption = action.value;
        break;
    }

    this.actionsApplied.push(action);

    if (this.verbose) {
      console.log(`Action Name: ${action.name}, Action Value: ${action.value}`);
    }
  }

  /**
   * Gets the actions applied
   * @returns The actions applied
   */
  getActionsApplied(): AuthorAction[] {
    return this.actionsApplied;
  }

  /**
   * Gets the current speech caption
   * @returns The current speech caption
   */
  getCurrentSpeechCaption(): string {
    return this.currentSpeechCaption;
  }

   /**
   * Sets the verbose mode for the virtual file explorer
   * @param verbose Whether to enable verbose
   */
   setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }
}