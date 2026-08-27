import { useSignIn, useSignUp } from "@clerk/expo";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import ThemedText from "../components/themed-text";

export default function SignInScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const { signUp, errors: signUpErrors, fetchStatus: signUpFetchStatus } = useSignUp();
    const [code, setCode] = useState("");
    const [showEmailCode, setShowEmailCode] = useState(false);

    const isFetching = signUpFetchStatus === "fetching";

    const onSignup = async () => {
        console.log("Full Name:", fullName);
        if (fullName.trim() === "") {
            setErrorMessage("Full name is required.");
            return;
        }
        console.log("Email:", email);
        console.log("Password:", password);
        try {
            const { error } = await signUp.password({
                emailAddress: email,
                password: password,
                firstName: fullName.split(" ")[0],
                lastName: fullName.split(" ")[1] || "",
            });
            if (error) {
                // console.log("Sign up after identifier not found:", JSON.stringify(error, null, 2));
                return;
            }
            await signUp.verifications.sendEmailCode();

            const needEmailCode = Array.isArray(signUp.unverifiedFields) && signUp.unverifiedFields.includes("email_address");

            if (needEmailCode) {
                setShowEmailCode(true);
                return;
            }
            if (signUp.status === "missing_requirements" && (signUp.missingFields?.length ?? 0) > 0) {
                router.push("/continue" as Href);
                return;
            }
            console.error("Unexpected sign-up state after password:", {
                status: signUp.status,
                unverifiedFields: signUp.unverifiedFields,
                missingFields: signUp.missingFields,
            });
            return;
        } catch (error) {
            console.error("Error during sign-up:", error);
        }

    };

    if (showEmailCode) {
      const codeErrors = signUpErrors.fields?.code;

      return (
        <View className="flex-1 justify-center items-start gap-6">
          <Text className="text-3xl px-4">Verify Email</Text>
          <Text className="text-lg px-4">Enter the code sent to your email</Text>
          <View className="w-full px-8 gap-4">
            <View>
              <Text className="text-md ">Verification Code</Text>
              <TextInput
                className=""
                value={code}
                onChangeText={(text) => {
                  setCode(text);
                }}
                autoCapitalize="none"
                placeholder="Enter code"
              />
              {codeErrors ? <ThemedText>{codeErrors.message}</ThemedText> : null}
            </View>
            <Button title="Verify" onPress={async () => {
              try {
                const { error } = await signUp.verifications.verifyEmailCode({ code });
                if (error) {
                  console.error("Error verifying email code:", error);
                  return;
                }
                if (signUp.status === "complete") {
                  router.push("/sign-in" as Href);
                } else {
                  console.error("Unexpected sign-up state after verifying email code:", {
                    status: signUp.status,
                    unverifiedFields: signUp.unverifiedFields,
                    missingFields: signUp.missingFields,
                  });
                }
              } catch (error) {
                console.error("Error during email code verification:", error);
              }
            }} />
          </View>
        </View>
      )
    }

    return (
        <View className="flex-1 justify-center items-start gap-6">
            <Text className="text-red-600">{errorMessage}</Text>
            <View className="w-full px-4">
                <Text className="text-3xl px-4">Sign Up</Text>
                <Text className="text-lg px-4">Join Now</Text>
            </View>
            <View className="w-full px-8 gap-4">
                <View>
                    <Text className="text-md ">Full Name</Text>
                    <TextInput
                        className=""
                        value={fullName}
                        onChangeText={(text) => {
                            setFullName(text);
                        }}
                        autoCapitalize="none"
                        placeholder="Andrew Smith "
                    />
                </View>
                <View>
                    <Text className="text-md ">Email</Text>
                    <TextInput
                        className=""
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                        autoCapitalize="none"
                        placeholder="example@email.com"
                        autoCorrect={false}
                    />
                    {signUpErrors.fields?.emailAddress ? <ThemedText>{signUpErrors.fields.emailAddress.message}</ThemedText> : null}
                </View>
                <View>
                    <Text className="text-md ">Password</Text>
                    <TextInput
                        className=""
                        value={password}
                        onChangeText={(e) => {
                            setPassword(e);
                        }}
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="password"
                    />
                    {signUpErrors.fields?.password ? <ThemedText>{signUpErrors.fields.password.message}</ThemedText> : null}
                </View>
                <Button title="Sign Up" onPress={onSignup} />
            </View>
            <View className="w-full px-4">
                <Text className="text-md px-4">
                    Already have an account?{" "}
                    <Text className="text-blue-600" onPress={() => router.push("/sign-in")}>
                        Sign In
                    </Text>
                </Text>
            </View>
            <View className="w-full px-4"></View>
        </View>
    );
}
