import { useSignIn } from "@clerk/clerk-expo";
import {  MaterialIcons } from "@expo/vector-icons";
import { Link, useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Whoops!",
        "Looks like you entered the wrong email or password. \n\n Please try again."
      )
    }
  }, [isLoaded, emailAddress, password]);

  return (
    // <SafeAreaView>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        backgroundColor: "#5F5DEC",
        paddingHorizontal: 20,
        justifyContent: "center",
        gap: 10,
      }}
      >
        <MaterialIcons
        name="video-chat"
        size={160}
        color="white"
        style={{ alignSelf: "center",justifyContent:"center" }}
        />
        <TextInput
          autoCapitalize="none"
          style={{padding:20,width:"100%",backgroundColor:"white",borderRadius:10}}
          value={emailAddress}
          placeholder="Enter Email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          value={password}
          style={{padding:20,width:"100%",backgroundColor:"white",borderRadius:10}}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <View 
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
        />
        <Button title="Sign in" onPress={onSignInPress} />
        <View>
          <Text>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text>Sign up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
      // <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    // </SafeAreaView>
  );
};

export default SignInScreen;
