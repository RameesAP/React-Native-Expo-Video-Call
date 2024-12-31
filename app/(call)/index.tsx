// import { Text } from "@/components/Themed";
import { SignedIn } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    // <SafeAreaView>
      <View>
        {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
        <Text style={{marginTop:10,backgroundColor: "#5F5DEC"}}>Hello worldd</Text>
        <SignedIn>
          <Text>you are signed in</Text>
        </SignedIn>
      </View>
    // </SafeAreaView>
  );
}
