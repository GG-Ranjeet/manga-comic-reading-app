import { Stack } from "expo-router";
import { LogBox } from "react-native";

// Mute the specific Clerk development key warning in the terminal/console
LogBox.ignoreLogs([
    "Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview",
]);

export default function AppLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
    );
}
