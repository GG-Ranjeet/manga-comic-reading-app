import { View, Text } from "react-native";
import { useAuth, useClerk, useSignIn } from "@clerk/expo";
import { router } from "expo-router";

export default function SignInScreen() {
    const { isSignedIn, userId, sessionId, signOut } = useAuth();

    if (!isSignedIn) {
        router.push("/sign-in");
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sign gawaw</Text>  
    </View>
    );
}