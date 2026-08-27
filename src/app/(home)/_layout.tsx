import { Feather, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { LogBox } from "react-native";
import CustomHeader from "../components/custom-header";

// Mute the specific Clerk development key warning in the terminal/console
LogBox.ignoreLogs([
    "Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview",
]);

export default function AppLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: "#2563eb", // Primary color (e.g., Tailwind blue-600)
                header: () => <CustomHeader title="Manga " onProfilePress={() => router.push("/(home)/profile")} />,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color, size }) => <Ionicons name="library" size={size} color={color} />,
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
