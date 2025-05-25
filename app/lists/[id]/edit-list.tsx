import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import Container from '@/components/Container';
import Title from '@/components/Title';

const Page = () => {
  const { id } = useLocalSearchParams();
  console.log('Edit List Page ID:', id);

  return (
    <Container>
      <Title title="Edit List" onBackPress />
    </Container>
  );
};

export default Page;

const styles = StyleSheet.create({});
