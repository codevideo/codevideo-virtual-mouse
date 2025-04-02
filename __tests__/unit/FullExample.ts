import { VirtualMouse } from "../../src/VirtualMouse";
import { describe, expect, it } from "@jest/globals";
import { MouseAction } from "@fullstackcraftllc/codevideo-types";

describe("VirtualMouse", () => {
  describe("basic functionality", () => {
    it("should initialize with empty state", () => {
      const virtualMouse = new VirtualMouse();
      expect(virtualMouse.getCurrentMouseSnapshot()).toEqual({
        location: "editor",
        currentHoveredFileName: "",
        currentHoveredFolderName: "",
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
      });
    });

    it("should update its location when we move to file-explorer", () => {
      const actions: MouseAction[] = [
        {
          name: "mouse-move-file-explorer",
          value: "1"
        }
      ];
      const virtualMouse = new VirtualMouse(actions);
      expect(virtualMouse.getActionsApplied()).toEqual(actions);
      expect(virtualMouse.getCurrentLocation()).toEqual("file-explorer");
    });

    it("should update its location when we move to editor", () => {
      const actions: MouseAction[] = [
        {
          name: "mouse-move-editor",
          value: "1"
        }
      ];
      const virtualMouse = new VirtualMouse(actions);
      expect(virtualMouse.getActionsApplied()).toEqual(actions);
      expect(virtualMouse.getCurrentLocation()).toEqual("editor");
    });

    it("should update its location when we move to terminal", () => {
      const actions: MouseAction[] = [
        {
          name: "mouse-move-terminal",
          value: "1"
        }
      ];
      const virtualMouse = new VirtualMouse(actions);
      expect(virtualMouse.getActionsApplied()).toEqual(actions);
      expect(virtualMouse.getCurrentLocation()).toEqual("terminal");
    });
  });
});