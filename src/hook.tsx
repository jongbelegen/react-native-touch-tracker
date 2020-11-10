import { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import { subscribe, unsubscribe } from "./pubsub";

export function useTouchTracker(
  callback: (evt: GestureResponderEvent) => void
): void {
  useEffect(() => {
    const subscriber = { fn: callback };

    subscribe(subscriber);

    return () => {
      unsubscribe(subscriber);
    };
  }, [callback]);
}
