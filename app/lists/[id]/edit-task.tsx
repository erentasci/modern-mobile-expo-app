import { ScrollView, View } from 'react-native';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import Input from '@/components/Input';
import Title from '@/components/Title';

const Page = () => {
  return (
    <Container>
      <Title title="Edit Task" onBackPress />
      <ScrollView contentContainerClassName="flex flex-col gap-3 pb-6">
        <View className="h-12">
          <Input placeHolderText="Name" placeholderTextColor="text-neutral-500" />
        </View>
        <View className="h-12">
          <Input placeHolderText="Description" placeholderTextColor="text-neutral-500" />
        </View>
        <View className="h-12">
          <Input placeHolderText="Image" placeholderTextColor="text-neutral-500" />
        </View>
        <View className="h-12">
          <Input placeHolderText="Status" placeholderTextColor="text-neutral-500" />
        </View>
        <View className="h-12">
          <Input placeHolderText="Priority" placeholderTextColor="text-neutral-500" />
        </View>
        <View className="h-12">
          <Input placeHolderText="Is Completed" placeholderTextColor="text-neutral-500" />
        </View>
        <View className="h-12">
          <Input placeHolderText="Due Date" placeholderTextColor="text-neutral-500" />
        </View>

        <Button className="rounded-md bg-green-500 shadow-sm" title="Edit Task" />
      </ScrollView>
    </Container>
  );
};

export default Page;
