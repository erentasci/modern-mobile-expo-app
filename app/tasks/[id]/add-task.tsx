import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/ErrorText';
import Input from '@/components/Input';
import Title from '@/components/Title';
import { COMPLETED_STATUS, PRIORITY, STATUS } from '@/lib/contants';
import { TaskFormData, taskSchema } from '@/lib/validators/taskSchema';
import { useTaskStore } from '@/store/taskStore';

const Page = () => {
  const { id } = useLocalSearchParams();

  const { createNewTaskById, fetchTasksByListId } = useTaskStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (formData: TaskFormData) => {
    try {
      const newTask = {
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
        fetchTasksByListId(Number(id));
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

  return (
    <Container>
      <Title title="Add Task" onBackPress />
      <ScrollView contentContainerClassName="flex flex-col gap-3 pb-6">
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
        {errors.name && <ErrorText message={errors.name.message} />}
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
        {errors.description && <ErrorText message={errors.description.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Add Image URL"
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
        {errors.image && <ErrorText message={errors.image.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Dropdown
                data={STATUS}
                style={{
                  flex: 1,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  backgroundColor: '#e5e5e5',
                  borderRadius: 8,
                }}
                placeholderStyle={{
                  color: '#737373',
                  fontSize: 14,
                  fontWeight: '300',
                }}
                selectedTextStyle={{
                  color: '#000',
                  fontSize: 14,
                  fontWeight: '500',
                }}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Status"
                value={value}
                onChange={(status) => {
                  onChange(status.value);
                }}
                onBlur={onBlur}
              />
            </View>
          )}
          name="status"
          rules={{ required: true }}
        />
        {errors.status && <ErrorText message={errors.status.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Dropdown
                data={PRIORITY}
                style={{
                  flex: 1,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  backgroundColor: '#e5e5e5',
                  borderRadius: 8,
                }}
                placeholderStyle={{
                  color: '#737373',
                  fontSize: 14,
                  fontWeight: '300',
                }}
                selectedTextStyle={{
                  color: '#000',
                  fontSize: 14,
                  fontWeight: '500',
                }}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Priority"
                value={value}
                onChange={(priority) => {
                  onChange(priority.value);
                }}
                onBlur={onBlur}
              />
            </View>
          )}
          name="priority"
          rules={{ required: true }}
        />
        {errors.priority && <ErrorText message={errors.priority.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Dropdown
                data={COMPLETED_STATUS}
                style={{
                  flex: 1,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  backgroundColor: '#e5e5e5',
                  borderRadius: 8,
                }}
                placeholderStyle={{
                  color: '#737373',
                  fontSize: 14,
                  fontWeight: '300',
                }}
                selectedTextStyle={{
                  color: '#000',
                  fontSize: 14,
                  fontWeight: '500',
                }}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Completed Status"
                searchPlaceholder="Search..."
                value={value}
                onChange={(completedStatus) => {
                  onChange(completedStatus.value);
                }}
                onBlur={onBlur}
              />
            </View>
          )}
          name="is_completed"
          rules={{ required: true }}
        />
        {errors.is_completed && <ErrorText message={errors.is_completed.message} />}
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
        {errors.due_date && <ErrorText message={errors.due_date.message} />}
        <Button
          className="rounded-md bg-green-500 shadow-sm"
          title="Add New Task"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </Container>
  );
};

export default Page;
