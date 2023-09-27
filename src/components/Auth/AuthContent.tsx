import LoginForm, { Props as LoginFormProps } from "./LoginForm";
import SignUpForm, { Props as SignUpFormProps } from "./SignUpForm";
import { Text, View } from "react-native";

import { AuthStackNavigationProps } from "../../types/navigation";
import Button from "../UI/Button";
import React from "react";
import tw from "../../lib/tailwind";
import { useNavigation } from "@react-navigation/native";

type Props =
    | {
          mode: "signUp";
          onAuth: SignUpFormProps["onSuccessfulSignUp"];
      }
    | { mode: "login"; onAuth: LoginFormProps["onSuccessfulLogin"] };

const AuthContent = ({ mode, onAuth }: Props) => {
    const { push } = useNavigation<AuthStackNavigationProps<"login">>();

    const handleAuthModeChange = () => {
        push(mode === "signUp" ? "login" : "signUp");
    };

    return (
        <View style={tw`flex-1`}>
            <Text>AuthContent</Text>
            {mode === "signUp" ? (
                <SignUpForm onSuccessfulSignUp={onAuth} />
            ) : (
                <LoginForm onSuccessfulLogin={onAuth} />
            )}
            <View>
                <Button variant="flat" onPress={handleAuthModeChange}>
                    {mode === "signUp"
                        ? "Already have an account?"
                        : "Don't have an account?"}
                </Button>
            </View>
        </View>
    );
};

export default AuthContent;
