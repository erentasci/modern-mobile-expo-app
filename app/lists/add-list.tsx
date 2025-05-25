import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/ErrorText';
import Input from '@/components/Input';
import Title from '@/components/Title';
import { ListFormData, listSchema } from '@/lib/validators/listSchema';
import { useListStore } from '@/store/listStore';

const Page = () => {
  const { createNewList, fetchLists } = useListStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ListFormData>({
    resolver: zodResolver(listSchema),
  });

  const onSubmit = async (FormData: ListFormData) => {
    try {
      const response = await createNewList(FormData.name);
      if (response?.success) {
        Alert.alert('Success', response.message);
        reset();
        fetchLists();
      } else {
        Alert.alert('Error', response?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while creating the list');
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
        />
        {errors.name && <ErrorText message={errors.name.message} />}
        <Button
          className="rounded-md bg-green-500 shadow-sm"
          title="Add New List"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default Page;
