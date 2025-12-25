import AuthWrapperForm from "@/components/form/auth-wrapper-form";
import RequestPasswordResetForm from "@/components/form/request-password-reset";
import { View } from "react-native";

export default function RequestPasswordResetPage() {
  return (
    <View className="flex-1 items-center justify-center">
      <AuthWrapperForm title="Введите ваш email">
        <RequestPasswordResetForm />
      </AuthWrapperForm>
    </View>
  );
}
