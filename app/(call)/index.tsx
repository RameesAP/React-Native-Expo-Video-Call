// import { Text } from "@/components/Themed";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TabOneScreen() {
  return (
    <SafeAreaView>
      <Text >Hello world</Text>

      <SignedIn>
        <Text>you are signed in</Text>
      </SignedIn>

      <SignedOut>
        <Text>you are signed out</Text>
      </SignedOut>
    </SafeAreaView>
  );
}
