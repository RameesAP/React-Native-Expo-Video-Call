import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { inverseFormatSlug } from "@/lib/slug";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = async () => {
    if (!roomId) return;
    const slug = inverseFormatSlug(roomId);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          padding: 20,
          fontWeight: "bold",
        }}
      >
        Enter the Room Name
      </Text>
      <TextInput
        placeholder="e.g. Black Purple Tiger"
        value={roomId}
        onChangeText={setRoomId}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
        }}
      />

      <TouchableOpacity
        onPress={handleJoinRoom}
        style={{
          padding: 20,
          backgroundColor: "#5f5dec",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Join Room
        </Text>
      </TouchableOpacity>
    </View>
  );
}
