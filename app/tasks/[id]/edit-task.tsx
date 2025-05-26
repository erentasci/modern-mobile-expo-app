import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { Button } from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/ErrorText';
import Input from '@/components/Input';
import SkeletonEditTask from '@/components/Skeleton/Skeleton.EditTask';
import Title from '@/components/Title';
import { COMPLETED_STATUS, PRIORITY, STATUS } from '@/lib/contants';
import { TaskFormData, taskSchema } from '@/lib/validators/taskSchema';
import { updateTask } from '@/queries/tasks';
import { useTaskStore } from '@/store/taskStore';

const Page = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { getTaskById, fetchTasksByListId } = useTaskStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });
  const [currentListId, setCurrentListId] = useState<number>(0);

  useEffect(() => {
    const fetchCurrentTask = async () => {
      setLoading(true);
      if (id) {
        const currentTask = await getTaskById(Number(id));
        setCurrentListId(currentTask?.list_id ?? 0);
        reset({
          name: currentTask?.name,
          description: currentTask?.description || '',
          image: currentTask?.image || '',
          status:
            currentTask?.status === 'pending' ||
            currentTask?.status === 'in_progress' ||
            currentTask?.status === 'completed'
              ? currentTask.status
              : 'pending',
          priority:
            currentTask?.priority === 'low' ||
            currentTask?.priority === 'medium' ||
            currentTask?.priority === 'high'
              ? currentTask.priority
              : 'low',
          is_completed: currentTask?.is_completed ? 'true' : 'false',
          due_date: currentTask?.due_date ?? undefined,
        });
      }

      setLoading(false);
    };

    fetchCurrentTask();
  }, [id]);

  const onSubmit = async (FormData: TaskFormData) => {
    try {
      const response = await updateTask(Number(id), {
        name: FormData.name,
        description: FormData.description || undefined,
        image: FormData.image || undefined,
        status: FormData.status || undefined,
        priority: FormData.priority || undefined,
        is_completed: FormData.is_completed === 'true',
        due_date: FormData.due_date || undefined,
      });

      if (response?.changes > 0) {
        Alert.alert('Success', 'Task updated successfully');
        fetchTasksByListId(currentListId);
      } else {
        Alert.alert('Error', 'Failed to update the task');
      }
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while editing list');
    }
  };
  return (
    <Container>
      <Title title="Edit Task" onBackPress />
      {loading ? (
        <SkeletonEditTask />
      ) : (
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
            title="Edit Task"
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      )}
    </Container>
  );
};

export default Page;
