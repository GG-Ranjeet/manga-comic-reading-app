import { Stack, useRouter, useSegments } from "expo-router";
import "../../global.css";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Slot } from "expo-router";
import { useEffect } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
}

const InitialLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }
        const inAuthGroup = segments[0] === "(auth)";
        if (isLoaded && !isSignedIn && !inAuthGroup) {
            router.replace("/(auth)");
        }

        if (isLoaded && isSignedIn && inAuthGroup) {
            router.replace("/(home)");
        }
    }, [isLoaded, isSignedIn, segments]);
    return <Slot />;
};

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            {/* <Stack screenOptions={{ headerShown: true }} /> */}
            <InitialLayout />
        </ClerkProvider>
    );
}

// todo: whats stack
