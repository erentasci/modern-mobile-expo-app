import { Image, StyleSheet, Text, View } from 'react-native';

const index = () => {
  return (
    <View className="flex w-full flex-row items-center gap-2 rounded border border-neutral-50 bg-neutral-200 px-4 py-2">
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        className="h-24 w-24 rounded-full"
        resizeMode="cover"
        alt="Task Image"
      />
      <View className="flex flex-1 flex-col gap-2 p-2">
        <Text className="text-lg font-bold text-neutral-800">Başlık</Text>
        <Text className="text-sm text-neutral-500">Açıklama</Text>
        <View className="flex flex-row items-center gap-2 p-1">
          <View className="flex flex-col gap-2">
            <Text className="rounded-full bg-red-400 px-3 py-1 text-center text-sm font-bold text-white">
              Durum
            </Text>
            <Text className="rounded-full bg-red-400 px-3 py-1 text-center text-sm font-bold text-white">
              Durum
            </Text>
          </View>
          <Text className="ml-auto mt-auto text-neutral-500">05.10.2023</Text>
        </View>
      </View>
    </View>
  );
};

export default index;
