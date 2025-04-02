# @fullstackcraft/codevideo-virtual-mouse

![NPM Version](https://img.shields.io/npm/v/@fullstackcraftllc/codevideo-virtual-mouse)

`codevideo-virtual-mouse` is a TypeScript class that simulates a virtual mouse that can speak. This lightweight and versatile library is ideal for building educational tools, code playgrounds, and interactive coding environments within web applications.

This library heavily relies on the types from [codevideo-types](https://github.com/codevideo/codevideo-types)

## Example Usage

```typescript
import { VirtualMouse } from '@fullstackcraftllc/codevideo-virtual-mouse';

// Initialize a VirtualMouse instance with initial existing command history
const virtualMouse = new VirtualMouse();

// Apply speak action to the virtual mouse
virtualMouse.applyActions([
  { name: 'mouse-move-file-explorer', value: "1" }
]);

// Use the virtual mouse object
const currentLocation = virtualMouse.getCurrentLocation();

// Log the final code and actions applied
console.log('Current mouse location:');
console.log(currentLocation);  // "file-explorer"
```

## Why?

Why do we need a seemingly useless class? This library, along with many others create an entire event sourcing framework for the IDE. This is a small part of a larger project to create a declarative way to build, edit, and generate step by step educational video software courses.

See more at [codevideo.io](https://codevideo.io)