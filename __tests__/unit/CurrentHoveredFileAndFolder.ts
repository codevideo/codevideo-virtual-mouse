import { VirtualMouse } from "../../src/VirtualMouse";
import { describe, expect, it } from "@jest/globals";

describe("VirtualMouse", () => {
  describe("file and folder hover", () => {
    it("should report correctly hovering over a given file", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-file", value: "test.js"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("test.js");
    })

    it("should report correctly hovering over a given file nested", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-file", value: "src/test.js"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("src/test.js");
    })

    it("should report correctly hovering over a given folder", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-folder", value: "MyDir"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("MyDir");
    })

    it("should reset the hovered file name when not hovering over a file", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-file", value: "test.js"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("test.js");
      // now that we move to a folder, the hovered file name should be reset
      virtualMouse.applyAction({name: "mouse-move-file-explorer-folder", value: "MyDir"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("");
    });

    it("should reset the hovered folder name when not hovering over a folder", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-folder", value: "MyDir"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("MyDir");
      // now that we move to a file, the hovered folder name should be reset
      virtualMouse.applyAction({name: "mouse-move-file-explorer-file", value: "test.js"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("");
    });

    it("should not reset the hovered file name when doing non move actions after hovering over a file", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-file", value: "test.js"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("test.js");
      // now that we do a non move action, the hovered file name should not be reset
      virtualMouse.applyAction({name: "mouse-left-click", value: "1"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("test.js");
      // or a right click, should not reset the hovered file name
      virtualMouse.applyAction({name: "mouse-right-click", value: "1"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("test.js");
    })

    it("should not reset the hovered folder name when doing non move actions after hovering over a folder", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-folder", value: "MyDir"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("MyDir");
      // now that we do a non move action, the hovered folder name should not be reset
      virtualMouse.applyAction({name: "mouse-left-click", value: "1"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("MyDir");
      // or a right click, should not reset the hovered folder name
      virtualMouse.applyAction({name: "mouse-right-click", value: "1"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("MyDir");
    })
  });
});