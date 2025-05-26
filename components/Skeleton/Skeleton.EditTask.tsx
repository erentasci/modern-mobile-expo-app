import { ScrollView, View } from 'react-native';

const SkeletonEditTask = () => {
  return (
    <ScrollView contentContainerClassName="flex flex-col gap-3">
      {Array.from({ length: 7 }).map((_, index) => (
        <View key={index} className="flex animate-pulse flex-col gap-5">
          <View className="h-12">
            <View className="flex-1 rounded-md bg-neutral-200 px-3 py-4" />
          </View>
        </View>
      ))}
      <View className="h-12 rounded-md bg-neutral-400" />
    </ScrollView>
  );
};

export default SkeletonEditTask;
