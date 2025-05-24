import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Container } from '@/components/Container';
import SearchFilter from '@/components/SearchFilter';
import TaskItem from '@/components/TaskItem';
import Title from '@/components/Title';
import { getAllLists } from '@/queries/lists';
import { List } from '@/types';

export default function Home() {
  const router = useRouter();
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await getAllLists();
      try {
        if (response) {
          setLists(response);
        } else {
          console.error('Failed to fetch lists');
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchList();
  }, []);

  return (
    <Container>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Title
        title="Lists"
        onPress={() => router.push('/add-list')}
        buttonColor="white"
        buttonBgColor="bg-bleue-500"
        buttonIcon="add"
      />
      <SearchFilter
        placeHolderText="Search Lists"
        placeholderTextColor="text-neutral-400"
        onChangeText={() => console.log('Search')}
        onFilterPress={() => console.log('Filter')}
      />
      <FlatList
        data={lists}
        renderItem={({ item }: { item: List }) => (
          <TaskItem
            title={`${item.name.toString()}`}
            description="Lorem ipsum dolor sit amet"
            link={`lists/${item.id}`}
            bgColor="bg-blue-500"
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
