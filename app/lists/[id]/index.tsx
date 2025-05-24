import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { Container } from '@/components/Container';
import Title from '@/components/Title';
import { useListStore } from '@/store/listStore';
import { List } from '@/types';

const Page = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getListById } = useListStore();
  const [currentList, setCurrentList] = useState<List>();

  useEffect(() => {
    const fetchList = async () => {
      if (id) {
        const list = await getListById(Number(id));
        if (list) {
          setCurrentList(list);
        } else {
          console.error('List not found');
        }
      }
    };

    fetchList();
  }, [id]);

  return (
    <Container>
      <Title
        title={currentList?.name?.toString() ?? ''}
        onBackPress
        onPress={currentList ? () => router.push(`/lists/${id}/add-task`) : undefined}
        buttonColor="white"
        buttonBgColor="bg-bleue-500"
        buttonIcon="add"
      />
    </Container>
  );
};

export default Page;
