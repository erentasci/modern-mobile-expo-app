import { View } from 'react-native';

const SkeletonTaskItemHeader = () => {
  return (
    <View className="flex animate-pulse flex-row items-center justify-between gap-5">
      <View className="my-4 h-12 flex-1 rounded bg-neutral-200" />
      <View className="flex h-8 w-8 rounded-full bg-neutral-200" />
    </View>
  );
};

export default SkeletonTaskItemHeader;
