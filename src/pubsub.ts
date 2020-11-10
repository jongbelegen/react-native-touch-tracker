import { GestureResponderEvent } from "react-native";

type Subscriber = { fn: (evt: GestureResponderEvent) => void };

let subscribers: Subscriber[] = [];

export function subscribe(subscriber: Subscriber): void {
  subscribers.push(subscriber);
}

export function unsubscribe(subscriber: Subscriber): void {
  subscribers = subscribers.filter((s) => s !== subscriber);
}

export function publish(evt: GestureResponderEvent): void {
  subscribers.forEach(({ fn }) => fn(evt));
}