## About The Project
For when you need to make "click away" or "click outside" interactions in react native.
 
This package contains a provider that publishes all touch events to consuming hooks and has utilities to figure out if a user clicked inside a node. And is written in Typescript.

## Getting Started
### Installation

```sh
npm i react-native-touch-tracker
```
or
```sh
yarn add react-native-touch-tracker
```

#### Add the provider
Place the provider as high as possible in your tree probably in `<App />`

```tsx
import { TouchTrackerProvider } from "react-native-touch-tracker"; 

export default function App(): JSX.Element {
  return (
    <TouchTrackerProvider style={{ flex: 1 }}>
    ...
    </TouchTrackerProvider>
  );
}
```
Since `<TouchTrackerProvider />` renders a view you probably need to add some style like flex: 1 to keep it from messing up your style.

## Usage

Place the hook in a component that needs to be aware of all touches:

```tsx
import { useTouchTracker } from "react-native-touch-tracker"; 
import { Button, GestureResponderEvent } from "react-native";

function TouchAwareComponent() {
  useTouchTracker((evt: GestureResponderEvent) => {
    console.log(evt.target); // gives all nodes user touches
  });

  return <Button onPress={() => 0} title="Press it" />;
}
```
### Utilities
You can make use of the utilities to detect if a click was inside or outside
```tsx
import { useTouchTracker, isReactFiberComponentType, isNodeDescendantOf } from "react-native-touch-tracker"; 

function TouchAwareComponent() {
  const ref = useRef<Button>(null);

  useTouchTracker((evt: GestureResponderEvent) => {
    console.log(evt.target); // gives all nodes user touches

    if (
      !isReactFiberComponentType(ref.current) ||
      !isReactFiberComponentType(evt.target)
    ) {
      return; // components should have the correct properties and be casted to ReactNativeFiberHostComponentƒ
    }

    if (isNodeDescendantOf(ref.current, evt.target)) {
      console.log("inside");
    } else {
      console.log("outside");
    }
  });

  return <Button ref={ref} onPress={() => 0} title="Press it" />;
}

```

## License

Distributed under the unlicense License. See `LICENSE` for more information.