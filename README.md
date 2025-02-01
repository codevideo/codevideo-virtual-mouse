# @fullstackcraft/codevideo-virtual-author

![NPM Version](https://img.shields.io/npm/v/:fullstackcraftllc/codevideo-virtual-author)

`codevideo-virtual-author` is a TypeScript class that simulates a virtual author that can speak. This lightweight and versatile library is ideal for building educational tools, code playgrounds, and interactive coding environments within web applications.

This library heavily relies on the types from [codevideo-types](https://github.com/codevideo/codevideo-types)

## Example Usage

```typescript
import { VirtualAuthor } from '@fullstackcraftllc/codevideo-virtual-author';

// Initialize a VirtualAuthor instance with initial existing command history
const virtualAuthor = new VirtualAuthor();

// Apply speak action to the virtual author
virtualAuthor.applyActions([
  { name: 'speak-before', value: "Hi! I'm Chris, virtual CodeVideo author!" }
]);

// Use the virtual author object
const actionsApplied = virtualAuthor.getActionsApplied();
const currentSpeechCaption = virtualAuthor.getCurrentSpeechCaption();

// Log the final code and actions applied
console.log('Actions applied:');
console.log(actionsApplied);
console.log('Current speech caption:');
console.log(currentSpeechCaption); // "Hi! I'm Chris, virtual CodeVideo author!"
```

## Available Methods

### `applyAction(action: IAction): void`

Apply a single action to the code.

### `applyActions(actions: Array<IAction>): void`

Apply a series of actions to the virtual author.

### `getActionsApplied(): Array<IAction>`

Get the actions applied to the virtual author.

### `getCurrentSpeechCaption(): string`

Get the current speech caption of the virtual author. Returns an empty string if no speech caption is set.

## Why?

Why do we need a seemingly useless class? This library, along with [`codevideo-virtual-code-block`](https://github.com/codevideo/codevideo-virtual-code-block) create the backbone of [`codevideo-virtual-code-editor`](https://github.com/codevideo/codevideo-virtual-code-editor) which are used to validate steps across the CodeVideo ecosystem. This is a small part of a larger project to create a declarative way to build, edit, and generate step by step educational video software courses.

See more at [codevideo.io](https://codevideo.io)