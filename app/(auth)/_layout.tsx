import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthRoutesLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(call)"} />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#5F5DEC", }}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In to get started",
            headerShown: false,
            // headerTitleAlign:"center"
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Create a new account",
            headerBackTitle: "Sign In",
            headerStyle: { backgroundColor: "#5f5dec" },
            headerTintColor: "white",
          }}
        />
      </Stack>

    </SafeAreaView>
  );
};

export default AuthRoutesLayout;
