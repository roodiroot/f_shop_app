import AuthWrapperForm from "@/components/form/auth-wrapper-form";
import RegisterForm from "@/components/form/register-form";

import { View } from "react-native";

export default function RegisterPage() {
  return (
    <View className="flex-1 items-center justify-center">
      <AuthWrapperForm title="Регистрация">
        <RegisterForm />
      </AuthWrapperForm>
    </View>
  );
}
