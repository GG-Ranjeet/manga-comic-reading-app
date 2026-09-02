import { Stack, useRouter, useSegments } from "expo-router";
import "../../global.css";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Slot } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// if (!publishableKey) {
//     throw new Error("Add your Clerk Publishable Key to the .env file");
// }

SplashScreen.preventAutoHideAsync();

// const InitialLayout = () => {
//     const { isLoaded, isSignedIn } = useAuth();
//     const segments = useSegments();
//     const router = useRouter();

//     useEffect(() => {
//         if (!isLoaded) {
//             return;
//         }
//         const inAuthGroup = segments[0] === "(auth)";
//         if (isLoaded && !isSignedIn && !inAuthGroup) {
//             router.replace("/(auth)/sign-in");
//         }

//         if (isLoaded && isSignedIn && inAuthGroup) {
//             router.replace("/(home)");
//         }
//         SplashScreen.hideAsync();
//     }, [isLoaded, isSignedIn, segments]);

//     if (!isLoaded) {
//     return null;
//   }

//     return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" />
//       <Stack.Screen name="(home)" />
//       <Stack.Screen name="(read)" />
//     </Stack>
//   );
// };

export default function RootLayout() {
    return (
        // <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        //     {/* <Stack screenOptions={{ headerShown: true }} /> */}
        //     <InitialLayout />
        // </ClerkProvider>
        <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(read)" />
    </Stack>
    );
}

// todo: whats stack
