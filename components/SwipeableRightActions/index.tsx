import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import { useListStore } from '@/store/listStore';

const SwipeableRightAction = ({ id }: { id: number }) => {
  const { deleteListById } = useListStore();

  const handleDelete = async () => {
    if (!id) {
      console.error('ID is required to delete a list');
      return null;
    }
    try {
      const response = await deleteListById(id);
      if (response?.success) {
        console.log('List deleted successfully:', response.message);
      } else {
        console.error('Failed to delete list:', response?.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred while deleting the list:', error);
    }
  };

  return (
    <View className={styles.container}>
      <TouchableOpacity onPress={handleDelete} className={styles.actionButton}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity className={styles.actionButton}>
        <Ionicons name="pencil-outline" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default SwipeableRightAction;
