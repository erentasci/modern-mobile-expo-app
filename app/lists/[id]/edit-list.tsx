import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/ErrorText';
import Input from '@/components/Input';
import Title from '@/components/Title';
import { ListFormData, listSchema } from '@/lib/validators/listSchema';
import { useListStore } from '@/store/listStore';
import { List } from '@/types';

const Page = () => {
  const { id } = useLocalSearchParams();
  const { getList, updateListById, fetchLists } = useListStore();
  const [currentList, setCurrentList] = useState<List>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ListFormData>({
    resolver: zodResolver(listSchema),
  });

  useEffect(() => {
    const fetchCurrentList = async () => {
      if (id) {
        const list = await getList(Number(id));
        if (list) {
          setCurrentList(list);
          reset({
            name: list.name,
          });
        } else {
          console.error('List not found');
        }
      }
    };

    fetchCurrentList();
  }, [id]);

  const onSubmit = async (FormData: ListFormData) => {
    try {
      const response = await updateListById(Number(id), FormData.name);
      if (response?.success) {
        Alert.alert('Success', response.message);
        fetchLists();
      } else {
        Alert.alert('Error', response?.message);
      }
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while editing list');
    }
  };

  return (
    <Container>
      <Title title="Edit List" onBackPress />
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
                defaultValue={currentList?.name}
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
          title="Edit List"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default Page;
