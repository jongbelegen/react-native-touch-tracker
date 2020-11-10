import { StyleProp, View, ViewStyle } from "react-native";
import * as React from "react";
import { publish } from "./pubsub";

type TouchTrackerProviderProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ClickTrackerProvider({
  children,
  style,
}: TouchTrackerProviderProps): JSX.Element {
  return (
    <View
      style={style}
      onStartShouldSetResponderCapture={(evt) => {
        evt.persist(); // remove after react v17, e.persist()
        publish(evt);
        return false;
      }}
    >
      {children}
    </View>
  );
}
