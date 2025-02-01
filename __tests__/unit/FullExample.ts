import { VirtualAuthor } from "../../src/VirtualAuthor";
import { describe, expect, it } from "@jest/globals";
import { AuthorAction } from "@fullstackcraftllc/codevideo-types";

describe("VirtualAuthor", () => {
  describe("basic functionality", () => {
    it("should initialize with empty state", () => {
      const virtualAuthor = new VirtualAuthor();
      expect(virtualAuthor.getActionsApplied()).toEqual([]);
      expect(virtualAuthor.getCurrentSpeechCaption()).toEqual("");
    });

    it("should apply actions and return them", () => {
      const actions: AuthorAction[] = [
        {
          name: "author-speak-before",
          value: "Here I'm speaking before whatever is the next action."
        },
        {
          name: "author-speak-during",
          value: "Here I'm speaking during whatever is the next action."
        },
        {
          name: "author-speak-after",
          value: "Here I'm speaking after whatever is the next action."
        }
      ];
      const virtualAuthor = new VirtualAuthor(actions);
      expect(virtualAuthor.getActionsApplied()).toEqual(actions);
      expect(virtualAuthor.getCurrentSpeechCaption()).toEqual("Here I'm speaking after whatever is the next action.");
    });
  });
});