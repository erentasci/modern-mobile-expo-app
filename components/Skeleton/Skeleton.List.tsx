import { ScrollView, View } from 'react-native';

const SkeletonList = () => {
  return (
    <ScrollView contentContainerClassName="mt-4 flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          key={index}
          className="flex animate-pulse flex-row items-center justify-between rounded-md bg-neutral-300 px-5 py-6 text-white">
          <View className="flex-1 gap-1">
            <View className="h-6 w-3/5 rounded bg-neutral-200 " />
          </View>
          <View className="h-6 w-6 rounded bg-neutral-200 " />
        </View>
      ))}
    </ScrollView>
  );
};

export default SkeletonList;
