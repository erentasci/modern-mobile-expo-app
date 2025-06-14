import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import Container from '@/components/Container';
import SearchFilter from '@/components/SearchFilter';
import SkeletonTaskItem from '@/components/Skeleton/Skeleton.TaskItem';
import SkeletonTaskItemHeader from '@/components/Skeleton/Skeleton.TaskItemHeader';
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
  const { fetchTasksByListId, tasks, setTasks, getTaskByTerm } = useTaskStore();
  const [currentList, setCurrentList] = useState<List>();
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const reanimatedRef = useRef<SwipeableMethods>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      if (id) {
        const [list] = await Promise.all([getList(Number(id)), fetchTasksByListId(Number(id))]);

        if (list) {
          setCurrentList(list);
        } else {
          console.error('List not found');
        }
      }

      setLoading(false);
    };

    fetchAll();
  }, [id]);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      if (searchText.trim() !== '') {
        await getTaskByTerm(searchText, Number(id));
      } else {
        await fetchTasksByListId(Number(id));
      }
      setLoading(false);
    };

    fetchSearch();
  }, [searchText]);

  return (
    <Container>
      {loading || !currentList ? (
        <SkeletonTaskItemHeader />
      ) : (
        <Title
          title={currentList?.name ?? ''}
          onBackPress
          onPress={currentList ? () => router.push(`/tasks/${id}/add-task`) : undefined}
          buttonColor="white"
          buttonBgColor="bg-bleue-500"
          buttonIcon="add"
        />
      )}

      <SearchFilter
        placeHolderText="Search Tasks"
        placeholderTextColor="text-neutral-400"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        onFilterPress={() => console.log('Filter Pressed')}
        hasFilter
      />
      {loading ? (
        <SkeletonTaskItem />
      ) : tasks.length === 0 ? (
        <View className="mt-10">
          <Title title="No Tasks Found" fontStyle="text-xl text-gray-400 underline mx-auto" />
        </View>
      ) : (
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
      )}
    </Container>
  );
};

export default Page;
