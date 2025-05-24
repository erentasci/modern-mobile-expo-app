import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import Input from '@/components/Input';
import Title from '@/components/Title';
import { createList } from '@/queries/lists';

const Page = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const response = await createList(data.name);
    if (response.changes) {
      Alert.alert('Success', 'List created successfully');
    } else {
      Alert.alert('Error', 'Failed to create list');
    }
  };
  return (
    <Container>
      <Title title="Add List" onBackPress />
      <View className="flex flex-col gap-5">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Enter List Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="name"
          rules={{ required: true }}
          defaultValue=""
        />
        <Button
          className="rounded-md bg-indigo-500 shadow-sm"
          title="Add a New List"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default Page;
