import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { SwipeableRightActionsProps } from './types';

import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';

const SwipeableRightAction = ({ id, list, task }: SwipeableRightActionsProps) => {
  const router = useRouter();

  const { deleteListById } = useListStore();
  const { deleteTaskById } = useTaskStore();

  const handleDelete = async () => {
    if (list) {
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
    } else if (task) {
      if (!id) {
        console.error('ID is required to delete a list');
        return null;
      }
      try {
        const response = await deleteTaskById(id);
        if (response?.success) {
          console.log('Task deleted successfully:', response.message);
        } else {
          console.error('Failed to task list:', response?.message);
        }
      } catch (error) {
        console.error('An unexpected error occurred while deleting the task:', error);
      }
    }
  };

  const handleEdit = () => {
    if (task) {
      router.push(`/tasks/${id}/edit-task`);
    }
    if (list) {
      router.push(`/lists/${id}/edit-list`);
    }
  };

  return (
    <View className={styles.container}>
      <TouchableOpacity onPress={handleDelete} className={styles.actionButton}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit} className={styles.actionButton}>
        <Ionicons name="pencil-outline" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default SwipeableRightAction;
