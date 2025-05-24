import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import Input from '@/components/Input';
import Title from '@/components/Title';
import { TaskFormData, taskSchema } from '@/lib/validators/taskSchema';
import { useTaskStore } from '@/store/taskStore';

const Page = () => {
  const { id } = useLocalSearchParams();

  const { createNewTaskById } = useTaskStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (formData: TaskFormData) => {
    try {
      const newTask = {
        id: Date.now(),
        name: formData.name,
        description: formData.description ?? null,
        image: formData.image ?? null,
        status: formData.status ?? null,
        priority: formData.priority ?? null,
        is_completed: formData.is_completed === 'true',
        due_date: formData.due_date ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        list_id: Number(id),
      };
      const response = await createNewTaskById(newTask, Number(id));
      if (response?.success) {
        Alert.alert('Success', response.message);
        reset();
      } else {
        Alert.alert('Error', response?.message);
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while creating the task');
    }
  };

  console.log('errors:', errors);
  console.log('id:', id);

  return (
    <Container>
      <Title title="Add Task" onBackPress />
      <View className="flex flex-col gap-5">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Name"
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Description"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="description"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Image"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="image"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Status"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="status"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Priority"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="priority"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Is Completed"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="is_completed"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Due Date"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="due_date"
          rules={{ required: true }}
        />
        <Button
          className="rounded-md bg-green-500 shadow-sm"
          title="Add New Task"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default Page;
