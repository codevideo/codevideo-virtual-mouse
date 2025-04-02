import { VirtualMouse } from "../../src/VirtualMouse";
import { describe, expect, it } from "@jest/globals";

describe("VirtualMouse", () => {
  describe("file and folder hover", () => {
    it("should report correctly hovering over a given file", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-file", value: "test.js"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFileName).toEqual("test.js");
    })

    it("should report correctly hovering over a given folder", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-file-explorer-folder", value: "MyDir"})
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredFolderName).toEqual("MyDir");
    })
  });
});