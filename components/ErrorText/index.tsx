import { Text, View } from 'react-native';

const ErrorText = ({ message }: { message?: string }) => {
  return (
    <View className="my-0.5 w-full">
      <Text className="text-sm text-red-500 underline">{message}</Text>
    </View>
  );
};

export default ErrorText;
