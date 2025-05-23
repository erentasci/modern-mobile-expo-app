import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
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
    </Container>
  );
}
