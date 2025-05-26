import { View } from 'react-native';

const SkeletonList = () => {
  return (
    <View className="mt-4 flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          key={index}
          className=" flex animate-pulse flex-row items-center justify-between rounded-md bg-neutral-300 px-5 py-6 text-white">
          <View className="flex-1 gap-1">
            <View className="h-6 w-3/5 rounded bg-white bg-opacity-10" />
          </View>
          <View className="h-6 w-6 rounded bg-white bg-opacity-10" />
        </View>
      ))}
    </View>
  );
};

export default SkeletonList;
