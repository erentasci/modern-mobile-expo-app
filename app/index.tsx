import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
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
  const [loading, setLoading] = useState<boolean>(true);
  const { lists, fetchLists, getListByTerm } = useListStore();
  const [searchText, setSearchText] = useState<string>('');
  const reanimatedRef = useRef<SwipeableMethods>(null);

  useEffect(() => {
    const loadLists = async () => {
      setLoading(true);
      await fetchLists();
      setLoading(false);
    };
    loadLists();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (searchText.trim() !== '') {
        await getListByTerm(searchText);
      } else {
        await fetchLists();
      }
      setLoading(false);
    };
    fetchData();
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
      ) : lists.length === 0 ? (
        <View className="mt-10">
          <Title title="No Lists Found" fontStyle="text-xl text-gray-400 underline mx-auto" />
        </View>
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
