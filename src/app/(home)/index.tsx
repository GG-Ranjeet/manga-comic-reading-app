import { useAuth } from "@clerk/expo";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Button, View } from "react-native";

export default function AppLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const { signOut } = useAuth();

    if (!isLoaded) {
        return null; // or a loading indicator
    }
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/sign-in"); // Use replace to prevent stacking auth screens
        }
    }, [isLoaded, isSignedIn]);
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
        <View className="flex-1 w-4/5 justify-center items-center gap-2 ">{isLoaded && isSignedIn && <Button title="Sign Out" onPress={handleLogout} />}</View>
    );
}
