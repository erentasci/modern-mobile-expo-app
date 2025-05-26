import { ScrollView, View } from 'react-native';

const SkeletonTaskItem = () => {
  return (
    <ScrollView contentContainerClassName="mt-4 flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          className="flex w-full animate-pulse flex-row items-center gap-2 rounded border border-gray-300 bg-neutral-200 px-4 py-2">
          <View className="h-24 w-24 rounded-full bg-neutral-300" />
          <View className="flex flex-1 flex-col gap-2 p-2">
            <View className="flex flex-row justify-between">
              <View className="h-4 w-1/3 bg-neutral-300" />
              <View className="h-7 w-7 rounded bg-neutral-300" />
            </View>
            <View className="h-4 w-1/2 bg-neutral-300" />
            <View className="flex flex-row items-center p-1">
              <View className="flex flex-1 flex-col gap-2">
                <View className="h-3 w-1/2 rounded-full bg-neutral-300" />
                <View className="h-3 w-1/2 rounded-full bg-neutral-300" />
              </View>
              <View className="ml-auto mt-auto h-4 w-2/4 bg-neutral-300" />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default SkeletonTaskItem;
