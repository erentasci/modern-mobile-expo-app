import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import Container from '@/components/Container';
import ListItem from '@/components/ListItem';
import SearchFilter from '@/components/SearchFilter';
import SkeletonList from '@/components/Skeleton/Skeleton.List';
import SwipeableRightAction from '@/components/SwipeableRightActions';
import Title from '@/components/Title';
import { useListStore } from '@/store/listStore';
import { List } from '@/types';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { lists, fetchLists, getListByTerm } = useListStore();
  const [searchText, setSearchText] = useState<string>('');
  const reanimatedRef = useRef<SwipeableMethods>(null);

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [lists]);

  useEffect(() => {
    if (searchText.trim() !== '') {
      getListByTerm(searchText);
    } else {
      fetchLists();
    }
  }, [searchText]);

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
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        hasFilter={false}
      />
      {loading ? (
        <SkeletonList />
      ) : (
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
      )}
    </Container>
  );
}
