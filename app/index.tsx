import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import Container from '@/components/Container';
import ListItem from '@/components/ListItem';
import SearchFilter from '@/components/SearchFilter';
import Title from '@/components/Title';
import { COLORS } from '@/lib/contants';
import { useListStore } from '@/store/listStore';
import { List } from '@/types';

export default function Home() {
  const router = useRouter();
  const { lists, fetchLists } = useListStore();
  const reanimatedRef = useRef<SwipeableMethods>(null);

  useEffect(() => {
    fetchLists();
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
        contentContainerClassName="gap-4 mt-4"
        renderItem={({ item, index }: { item: List; index: number }) => (
          <ReanimatedSwipeable ref={reanimatedRef}>
            <ListItem
              title={item.name.toString()}
              link={`lists/${item.id}`}
              bgColor={COLORS[index % COLORS.length]}
            />
          </ReanimatedSwipeable>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
