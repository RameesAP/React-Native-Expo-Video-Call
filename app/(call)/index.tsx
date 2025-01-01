// import { Text } from "@/components/Themed";
import { SignedIn, useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";

export default function TabOneScreen() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signOut } = useAuth();
  return (
    <View>
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
        }}
        onPress={() => setDialogOpen(true)}
      >
        <MaterialCommunityIcons name="exit-run" size={24} color="#5F5DEC" />
      </TouchableOpacity>
      <Dialog.Container visible={dialogOpen}>
        <Dialog.Title>Sign Out</Dialog.Title>
        <Dialog.Description>Do you want to sign out?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogOpen(false)} />
        <Dialog.Button
          label="Sign Out"
          onPress={async () => {
            await signOut();
            setDialogOpen(false);
          }}
        />
      </Dialog.Container>

      <Text>Hello worldd</Text>
      <SignedIn>
        <Text>you are signed in</Text>
      </SignedIn>
    </View>
  );
}
