import { View, Text } from "react-native";
import React from "react";

export default function StyledButton({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: any;
}) {
  return (
    <View>
      <Text>StyledButton</Text>
    </View>
  );
}
