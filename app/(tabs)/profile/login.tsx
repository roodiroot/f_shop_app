import AuthWrapperForm from "@/components/form/auth-wrapper-form";
import LoginForm from "@/components/form/login-form";
import { View } from "react-native";

export default function LoginPage() {
  return (
    <View className="flex-1 items-center justify-center">
      <AuthWrapperForm title="Войдите в аккаунт">
        <LoginForm />
      </AuthWrapperForm>
    </View>
  );
}
