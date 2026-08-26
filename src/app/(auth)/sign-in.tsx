import { useAuth, useClerk, useSignIn } from "@clerk/expo";
import { Href, router } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";

export default function SignInScreen() {
    const { signIn, errors } = useSignIn();
    const { setActive } = useClerk();
    const { isLoaded } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                console.error("Error signing in:", error);
            }

            if (signIn.status === "complete") {
                await signIn.finalize({
                    navigate: ({ session, decorateUrl }) => {
                        navigateAfterAuth({ session, decorateUrl });
                    },
                });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Sign In</Text>
        </View>
    );
}
