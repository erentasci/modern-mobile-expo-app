import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import { Container } from '@/components/Container';
import SearchFilter from '@/components/SearchFilter';
import TaskItem from '@/components/TaskItem';
import Title from '@/components/Title';

export default function Home() {
  return (
    <Container>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Title
        title="Lists"
        onPress={() => console.log('Add New List')}
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
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => (
          <TaskItem
            title={`Task List ${item} AJSDASDADSASDASDASDASDAS`}
            description="Lorem ipsum dolor sit amet"
            link="/lists/1"
            bgColor="bg-blue-500"
          />
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
