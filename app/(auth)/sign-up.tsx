import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import StyledButton from "@/components/StyledButton";

const signUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].message);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        "Looks like you entered the wrong code. \n\n Please try again."
      );
    }
  };

  return (
    // <SafeAreaView>

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#5F5DEC",
      }}
    >
      {!pendingVerification && (
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {"Enter your details to get staterd!"}
          </Text>
          <TextInput
            style={{
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
            }}
            autoCapitalize="none"
            value={emailAddress}
            secureTextEntry={false}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            style={{
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
            }}
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <StyledButton title="Sign Up" onPress={onSignUpPress} />
        </View>
      )}
      {pendingVerification && (
        <>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            A verification code has been sent to your email.Please enter it
            below.
          </Text>
          <TextInput
           style={{
            padding: 20,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom:10,
          }}
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <StyledButton title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

export default signUpPage;
