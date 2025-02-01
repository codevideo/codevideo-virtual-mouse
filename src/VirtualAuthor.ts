import {
  AuthorAction,
} from "@fullstackcraftllc/codevideo-types";

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

  applyActions(actions: AuthorAction[]) {
    actions.forEach((action) => {
      this.applyAction(action);
    });
  }

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

  getActionsApplied(): AuthorAction[] {
    return this.actionsApplied;
  }

  getCurrentSpeechCaption(): string {
    return this.currentSpeechCaption;
  }
}