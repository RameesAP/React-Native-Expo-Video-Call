import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CallRoutesLayout() {
  return (
    <SafeAreaView>
      <Tabs>
        <Tabs.Screen
          name="index"
          component={CallScreen}
          options={{
            title:"All Calls",
            tabBarIcon: ({ color }) => (
              <Ionicons name="call-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
