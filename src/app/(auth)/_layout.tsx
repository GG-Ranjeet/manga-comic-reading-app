import { Stack } from "expo-router"


export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="sign-in">
      <Stack.Screen name="sign-in" options={{ title: 'Sign In', headerShown:true }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}