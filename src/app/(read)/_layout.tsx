import { Stack } from "expo-router";

export default function ReadLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
            <Stack.Screen name="index" options={{ title: 'Read Manga', headerShown:false }} />
        </Stack>
    );
}