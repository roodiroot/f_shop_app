import { ScrollView, Text, View } from "react-native";
import Logo from "../ui/icons/logo";

interface AuthWrapperFormProps extends React.PropsWithChildren {
  title: string;
}

const AuthWrapperForm: React.FC<AuthWrapperFormProps> = ({
  title,
  children,
}) => {
  return (
    <View className="pb-8 flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-8 pt-10 items-center gap-4"
      >
        <Logo width={50} height={50} />
        <Text className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {title}
        </Text>
        {children}
      </ScrollView>
    </View>
  );
};

export default AuthWrapperForm;
