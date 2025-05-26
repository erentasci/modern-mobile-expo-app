import { View } from 'react-native';

const SkeletonEditList = () => {
  return (
    <View className="flex animate-pulse flex-col gap-5">
      <View className="h-12">
        <View className="flex-1 rounded-md bg-neutral-200 px-3 py-4" />
      </View>
      <View className="h-12 rounded-md bg-neutral-400" />
    </View>
  );
};

export default SkeletonEditList;
