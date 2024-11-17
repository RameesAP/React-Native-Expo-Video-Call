import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CallRoutesLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          header:()=>null,
          tabBarActiveTintColor: "#5F5DEC",
          tabBarStyle: {
            display: route.name === "[id]" ? "none" : "flex", // Fixed typo
          },
          tabBarLabelStyle: {
            zIndex: 100,
            paddingBottom: 5,
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "All Calls",
            tabBarIcon: ({ color }) => {
              return <Ionicons name="call" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="join"
          options={{
            title: "Join Call",
            headerTitle:"Enter the Room ID",
            tabBarIcon: ({ color }) => {
              return <Ionicons name="enter-outline" size={24} color={color} />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
