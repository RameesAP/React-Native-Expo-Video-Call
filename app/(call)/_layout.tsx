import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import {
  name,
  LogLevel,
  logLevels,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";

const apiKey = process.env.EXPO_PUBLIC_GET_STREAM_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing API Key. Please set EXPO_PUBLIC_GET_STREAM_API_KEY in your .env"
  );
}

export default function CallRoutesLayout() {
  const { isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();

  if (!isSignedIn || !clerkUser || !apiKey) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const user: User = {
    id: clerkUser.id,
    name: clerkUser.fullName!,
    image: clerkUser.imageUrl!,
  };

  const tokenProvider = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/generateUserToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: clerkUser.id,
          name: clerkUser.fullName!,
          image: clerkUser.imageUrl!,
          email: clerkUser.primaryEmailAddress?.toString()!,
        }),
      }
    );
    const data = await response.json();
    return data.token;
  };

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    tokenProvider,
    options: {
      logger: (logLevel:LogLevel, message: String, ...args: unknown[]) => {},
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StreamVideo client={client}>
        <Tabs
          screenOptions={({ route }) => ({
            header: () => null,
            tabBarActiveTintColor: "#5F5DEC",
            tabBarStyle: {
              display: route.name === "[id]" ? "none" : "flex",
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
            name="[id]"
            options={{
              title: "Start a New call",
              unmountOnBlur: true,
              header: () => null,

              tabBarIcon: ({ color }) => {
                return (
                  <View
                    style={{
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      // top: -10,
                      // left: 20,
                      // right: 20,
                      top: -20,
                      left: -30,
                      right: -30,
                      bottom: 0,
                      margin: "auto",

                      borderRadius: 50,
                      zIndex: 100,
                      backgroundColor: "white",
                      borderColor: "lightgrey",
                      borderWidth: 0.2,
                      borderTopWidth: 1,
                      borderBottomWidth: 0,
                    }}
                  >
                    <FontAwesome
                      name="plus-circle"
                      size={30}
                      color="black"
                      style={{ zIndex: 200 }}
                    />
                  </View>
                );
              },
            }}
          />
          <Tabs.Screen
            name="join"
            options={{
              title: "Join Call",
              headerTitle: "Enter the Room ID",
              tabBarIcon: ({ color }) => {
                return (
                  <Ionicons name="enter-outline" size={24} color={color} />
                );
              },
            }}
          />
        </Tabs>
      </StreamVideo>
    </SafeAreaView>
  );
}
