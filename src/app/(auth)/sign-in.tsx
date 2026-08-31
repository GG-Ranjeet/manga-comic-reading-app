import { useAuth, useClerk, useSignIn } from "@clerk/expo";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import ThemedText from "../components/themed-text";

export default function SignInScreen() {
    const { signIn, errors: signInError, fetchStatus } = useSignIn();
    const { setActive } = useClerk();
    const { isLoaded, isSignedIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [code, setCode] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.replace("/(home)");
        }
    }, [isLoaded, isSignedIn]);

    const navigateAfterAuth = async ({
        session,
        decorateUrl,
    }: {
        session: { currentTask?: unknown } | null | undefined;
        decorateUrl: (url: string) => string;
    }) => {
        if (session?.currentTask) {
            console.log(session.currentTask);
            return;
        }
        const url = decorateUrl("/");
        if (url.startsWith("http")) {
            window.location.href = url;
        } else {
            router.push(url as Href);
        }
    };

    const onSignIn = async () => {
        if (!isLoaded || !signIn) return;

        try {
            const { error } = await signIn.password({
                emailAddress: email,
                password,
            });
            if (error) {
                console.log("Error signing in:", error.message);
                setErrorMessage(error.message);
            }

            if (signIn.status === "complete") {
                await signIn.finalize({
                    navigate: ({ session, decorateUrl }) => {
                        navigateAfterAuth({ session, decorateUrl });
                    },
                });
            } else if (signIn.status === "needs_client_trust") {
                const emailCodeFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === "email_code");

                if (emailCodeFactor) {
                    await signIn.mfa.sendEmailCode();
                }
            } else {
                console.error("Sign-in attempt not complete:", signIn);
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const handleVerify = async () => {
        await signIn.mfa.verifyEmailCode({ code });

        console.log("Sign-in status after verification:", signIn.status);
        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    // Handle session tasks
                    // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                    if (session?.currentTask) {
                        console.log(session?.currentTask);
                        return;
                    }

                    // If no session tasks, navigate the signed-in user to the home page
                    const url = decorateUrl("/");
                    if (url.startsWith("http")) {
                        window.location.href = url;
                    } else {
                        router.push(url as Href);
                    }
                },
            });
        } else {
            // Check why the sign-in is not complete
            console.error("Sign-in attempt not complete:", signIn);
        }
    };

    if (signIn.status === "needs_client_trust") {
        return (
            <View>
                <Text>Verify your account</Text>
                <TextInput
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#666666"
                    onChangeText={(code) => setCode(code)}
                    keyboardType="numeric"
                />
                {signInError.fields.code && <ThemedText>{signInError.fields.code.message}</ThemedText>}
                <Pressable onPress={handleVerify} disabled={fetchStatus === "fetching"}>
                    <ThemedText>Verify</ThemedText>
                </Pressable>
                <Pressable onPress={() => signIn.mfa.sendEmailCode()}>
                    <ThemedText>I need a new code</ThemedText>
                </Pressable>
            </View>
        );
    }
    return (
        <View className="flex-1 justify-center items-center gap-2">
            <Text className="text-3xl px-4">Sign In</Text>
            <Text className="text-lg px-4">Welcome Back</Text>
            <View className="w-3/4 px-4">
                {/* <Text className="text-red-600">{errorMessage}</Text> */}
                <Text className="text-md font-medium">Email</Text>
                <TextInput autoCapitalize="none" value={email} placeholder="Email..." onChangeText={setEmail} />
                {signInError.fields?.identifier ? <ThemedText>{signInError.fields.identifier.message}</ThemedText> : null}
                <Text className="text-md font-medium">Password</Text>
                <TextInput value={password} placeholder="Password..." secureTextEntry onChangeText={setPassword} />
                {signInError.fields?.password ? <ThemedText>{signInError.fields.password.message}</ThemedText> : null}
                <Button title="Sign In" onPress={onSignIn} />
            </View>
            <Text className="text-md px-4">
                Don't have an account?{" "}
                <Text className="text-blue-600" onPress={() => router.push("/sign-up")}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
}
