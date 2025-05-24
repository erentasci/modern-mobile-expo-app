import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '@/components/Container';
import Title from '@/components/Title';

const Page = () => {
  const { id } = useLocalSearchParams();

  console.log('id', id);

  return (
    <Container>
      <Title title="List Detail" />
      <Text className="text-center text-2xl font-bold">List ID: {id}</Text>
    </Container>
  );
};

export default Page;
