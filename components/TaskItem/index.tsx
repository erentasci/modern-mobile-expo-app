import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { TaskItemProps } from './types';

const TaskItem = ({ link, title, bgColor }: TaskItemProps) => {
  return (
    <Link href={link as any} className="mt-4">
      <View className={[styles.taskItemContainer, bgColor].join(' ')}>
        <View className={styles.textContainer}>
          <Text className={styles.title}>
            {title.length > 20 ? title.slice(0, 20) + '...' : title}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </View>
    </Link>
  );
};

export default TaskItem;
