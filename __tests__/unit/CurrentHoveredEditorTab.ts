import { VirtualMouse } from "../../src/VirtualMouse";
import { describe, expect, it } from "@jest/globals";

describe("VirtualMouse", () => {
  describe("file and folder hover", () => {
    it("should report correctly hovering over a given tab", () => {
      const virtualMouse = new VirtualMouse();
      virtualMouse.applyAction({name: "mouse-move-editor-tab", value: "test.js"})
      expect(virtualMouse.getCurrentLocation()).toEqual("editor-tab");
      expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredEditorTabFileName).toEqual("test.js");
    });

    it("should report correctly hovering over a given tab", () => {
        const virtualMouse = new VirtualMouse();
        virtualMouse.applyAction({name: "mouse-move-editor-tab-close", value: "bob.js"})
        expect(virtualMouse.getCurrentLocation()).toEqual("editor-tab-close");
        expect(virtualMouse.getCurrentMouseSnapshot().currentHoveredEditorTabFileName).toEqual("bob.js");
      });
  });
});