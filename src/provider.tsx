import { StyleProp, View, ViewStyle } from "react-native";
import * as React from "react";
import { publish } from "./pubsub";

type TouchTrackerCaptureHandler = (evt: any) => {};

interface TouchTrackerProviderRendererParams = {
   handleStartShouldSetResponderCapture: TouchTrackerCaptureHandler;
};

type TouchTrackerProviderProps = {
  children: React.ReactNode;
  renderer: ({ handleStartShouldSetResponderCapture }: TouchTrackerProviderRendererParams) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function TouchTrackerProvider({
  children,
  renderer,
  style,
}: TouchTrackerProviderProps): JSX.Element {
  const handleStartShouldSetResponderCapture = (evt) => {
    evt.persist(); // remove after react v17, e.persist()
    publish(evt);
    return false;
  };
  if (renderer) {
    return renderer({ handleStartShouldSetResponderCapture });
  }
  return (
    <View
      style={style}
      onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
    >
      {children}
    </View>
  );
}
