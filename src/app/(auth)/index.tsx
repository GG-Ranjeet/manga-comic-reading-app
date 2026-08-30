import { View, Text, Button } from "react-native";
import { useAuth, useClerk, useSignIn } from "@clerk/expo";
import { router } from "expo-router";
import { useEffect } from "react";

export default function SignInScreen() {
    const { isSignedIn, userId, sessionId, signOut } = useAuth();

    if (!isSignedIn) {
        router.push("/sign-in");
    }
    useEffect(() => {
        if (isSignedIn) {
            console.log("User is signed in, redirecting to home page...");
            router.replace("/(home)");
        } else {
            console.log("User is not signed in.");
            router.replace("/(auth)/sign-in");
        }
    }, [isSignedIn, userId, sessionId]);
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button
                title="click"
                onPress={() => {
                    router.replace("/(home)");
                }}
            />
        </View>
    );
}
