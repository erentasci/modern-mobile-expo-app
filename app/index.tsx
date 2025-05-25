import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import Container from '@/components/Container';
import ListItem from '@/components/ListItem';
import SearchFilter from '@/components/SearchFilter';
import SwipeableRightAction from '@/components/SwipeableRightActions';
import Title from '@/components/Title';
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
        onPress={() => router.push('/lists/add-list')}
        buttonColor="white"
        buttonBgColor="bg-bleue-500"
        buttonIcon="add"
      />
      <SearchFilter
        placeHolderText="Search Lists"
        placeholderTextColor="text-neutral-400"
        onChangeText={() => console.log('Search')}
        hasFilter={false}
      />
      <FlatList
        data={lists}
        contentContainerClassName="gap-4 mt-4"
        renderItem={({ item }: { item: List; index: number }) => (
          <ReanimatedSwipeable
            ref={reanimatedRef}
            renderRightActions={() => <SwipeableRightAction id={item.id} list />}
            rightThreshold={100}
            friction={1}>
            <ListItem
              title={item.name.toString()}
              link={`tasks/${item.id}`}
              bgColor="bg-violet-500"
            />
          </ReanimatedSwipeable>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
