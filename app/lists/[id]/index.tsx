import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
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

      {/* <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        contentContainerClassName="gap-4 mt-2"
        renderItem={() => (
          <View className="flex w-full flex-row items-center gap-2 rounded border border-neutral-50 bg-neutral-200 px-4 py-2">
            <Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              className="h-24 w-24 rounded-full"
              resizeMode="cover"
              alt="Task Image"
            />
            <View className="flex flex-1 flex-col gap-2 p-2">
              <Text className="text-lg font-bold text-neutral-800">Başlık</Text>
              <Text className="text-sm text-neutral-500">Açıklama</Text>
              <View className="flex flex-row items-center gap-2 p-1">
                <View className="flex flex-col gap-2">
                  <Text className="rounded-full bg-red-400 px-3 py-1 text-center text-sm font-bold text-white">
                    Durum
                  </Text>
                  <Text className="rounded-full bg-red-400 px-3 py-1 text-center text-sm font-bold text-white">
                    Durum
                  </Text>{' '}
                </View>
                <Text className="ml-auto mt-auto text-neutral-500">05.10.2023</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
      /> */}
      {/* <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView> */}
    </Container>
  );
};

export default Page;
