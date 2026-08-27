import { useAuth } from "@clerk/expo";
import { router, Stack } from "expo-router";
import { Button, View } from "react-native";

export default function AppLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const { signOut } = useAuth();

    if (!isLoaded) {
        return null; // or a loading indicator
    }
    if (!isSignedIn) {
        router.replace("/(auth)/sign-in");
        return null; // or a loading indicator
    }
    if (isLoaded && isSignedIn) {
        // router.replace("/(home)");
    }

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return (
        <View className="flex-1 w-4/5 justify-center items-center gap-2 ">{isLoaded && isSignedIn && <Button title="Sign Up" onPress={handleLogout} />}</View>
    );
}
