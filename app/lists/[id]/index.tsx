import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Container } from '@/components/Container';
import Title from '@/components/Title';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { List } from '@/types';

const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getListById } = useListStore();
  const { fetchTasksByListId, tasks, setTasks } = useTaskStore();
  const [currentList, setCurrentList] = useState<List>();

  useEffect(() => {
    const fetchCurrentList = async () => {
      if (id) {
        const list = await getListById(Number(id));
        if (list) {
          setCurrentList(list);
        } else {
          console.error('List not found');
        }
      }
    };

    setTasks([]);
    fetchTasksByListId(Number(id));
    fetchCurrentList();
  }, [id]);

  return (
    <Container>
      <Title
        title={currentList?.name?.toString() ?? ''}
        onBackPress
        onPress={currentList ? () => router.push(`/lists/${id}/add-task`) : undefined}
        buttonColor="white"
        buttonBgColor="bg-bleue-500"
        buttonIcon="add"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <View key={task.id} className="border-b border-gray-200 p-4">
              <Text>{task.name}</Text>
              <Text className="text-sm text-gray-500">{task.description}</Text>
              <Text>Status: {task.is_completed === true ? 'Completed' : 'Not Completed'}</Text>
              <Text>Priority: {task.priority?.toLocaleUpperCase()}</Text>
              <Text>Due Date: {task.due_date ?? 'No due date'}</Text>
              <Text>Created At: {new Date(task.created_at).toLocaleDateString()}</Text>
              <Text>Updated At: {new Date(task.updated_at).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <View className="p-4">
            <Text>No tasks available</Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default Page;
