import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import Container from '@/components/Container';
import SwipeableRightAction from '@/components/SwipeableRightActions';
import TaskItem from '@/components/TaskItem';
import Title from '@/components/Title';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { List } from '@/types';

const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getList } = useListStore();
  const { fetchTasksByListId, tasks, setTasks } = useTaskStore();
  const [currentList, setCurrentList] = useState<List>();
  const reanimatedRef = useRef<SwipeableMethods>(null);

  useEffect(() => {
    const fetchCurrentList = async () => {
      if (id) {
        const list = await getList(Number(id));
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
      {/* DÜZENLENECEK */}
      <FlatList
        data={tasks}
        contentContainerClassName="gap-4 mt-2"
        renderItem={({ item }) => (
          <ReanimatedSwipeable
            ref={reanimatedRef}
            renderRightActions={() => <SwipeableRightAction id={item.id} task />}
            rightThreshold={100}
            friction={1}>
            <TaskItem
              id={item.id.toString()}
              name={item.name}
              description={item.description ?? ''}
              image={item.image ?? ''}
              isCompleted={item.is_completed?.valueOf() ?? false}
              status={
                item.status === 'pending' ||
                item.status === 'in_progress' ||
                item.status === 'completed'
                  ? item.status
                  : 'pending'
              }
              priority={
                item.priority === 'low' || item.priority === 'medium' || item.priority === 'high'
                  ? item.priority
                  : 'medium'
              }
              dueDate={item.due_date ?? new Date().toISOString()}
            />
          </ReanimatedSwipeable>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
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
