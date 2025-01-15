// import { Text } from "@/components/Themed";
import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";
import { Call, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";
import { formatSlug } from "@/lib/slug";

export default function IndexScreen() {
  const client = useStreamVideoClient();
  const user = useUser();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMyCalls, setIsMyCalls] = useState(false);
  const [calls, setCalls] = useState<Call[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signOut } = useAuth();

  const fetchCalls = async () => {
    if (!client || !user) return;

    const { calls } = await client.queryCalls({
      filter_conditions: isMyCalls
        ? {
            //filter calls where user is the creator or a member of call
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          }
        : {},
      sort: [{ field: "created_at", direction: -1 }],
      watch: true,
    });
    const sortedCalls = calls.sort((a, b) => {
      return b.state.participantCount - a.state.participantCount;
    });
    setCalls(sortedCalls);
  };

  useEffect(() => {
    fetchCalls();
  }, [isMyCalls]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchCalls();
    setIsRefreshing(false);
  };
  const handleJoinRoom = async (id: string) => {
    router.push(`/(call)/${id}`);
  };

  return (
    <View style={{ paddingVertical: 10 }}>
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          gap: 10,
        }}
      >
        <Text
          style={{
            color: isMyCalls ? "black" : "#5f5dec",
          }}
          onPress={() => setIsMyCalls(false)}
        >
          All Calls
        </Text>

        <Switch
          trackColor={{ false: "#5f5dec", true: "#5f5dec" }}
          thumbColor="white"
          ios_backgroundColor="#5f5dec"
          onValueChange={() => setIsMyCalls(!isMyCalls)}
          value={isMyCalls}
        />
        <Text
          style={{
            color: !isMyCalls ? "black" : "#5f5dec",
          }}
          onPress={() => setIsMyCalls(true)}
        >
          My Calls
        </Text>
      </View>

      <FlatList
        data={calls}
        keyExtractor={(item) => item.id}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleJoinRoom(item.id)}
            disabled={item.state.participantCount === 0}
            style={{
              padding: 20,
              backgroundColor:
                item.state.participantCount === 0 ? "#f1f1f1" : "#fff",
              opacity: item.state.participantCount === 0 ? 0.5 : 1,
              borderBottomWidth: 1,
              borderBottomColor:
                item.state.participantCount === 0 ? "#fff" : "#f1f1f1",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {item.state.participantCount === 0 ? (
              <Feather name="phone-off" size={24} color="gray" />
            ) : (
              <Feather name="phone-call" size={24} color="gray" />
            )}

            <Image
              source={{ uri: item.state.createdBy?.image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.state.createdBy?.name ||
                      item.state.createdBy?.custom.email.split("@")[0]}
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    {item.state.createdBy?.custom.email}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 10 }}>
                  <Text
                    style={{ fontSize: 10, textAlign: "right", width: 100 }}
                  >
                    {formatSlug(item.id)}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.state.participantCount === 0 ? (
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "#5f5dec",
                        }}
                      >
                        Call Ended
                      </Text>
                    ) : (
                      <View
                        style={{
                          borderRadius: 5,
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#f1f1f1",
                          padding: 10,
                        }}
                      >
                        <Entypo
                          name="users"
                          size={14}
                          color="#5f5dec"
                          style={{ marginRight: 5 }}
                        />
                        <Text style={{ color: "#5f5dec", fontWeight: "bold" }}>
                          {item.state.participantCount}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
            {/* <Text>{item.id}</Text> */}

            {/* */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
