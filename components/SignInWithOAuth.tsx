import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, Button } from "react-native";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import StyledButton from "./StyledButton";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          // redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
          redirectUrl: Linking.createURL("/(call)", { scheme: "myapp" }),
        });
      // If sign in was successful, set the active session

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        console.log("session created", createdSessionId);
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
        console.log("SignIn:", signIn);
        console.log("SignUp:", signUp);
        console.log("Session not created.");
      }
    } catch (err) {
      console.error("OAuth Error:", err);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return <StyledButton title="Sign in with Google" onPress={onPress} />;
};
export default SignInWithOAuth;
