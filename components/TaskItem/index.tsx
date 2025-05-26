import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';
import { TaskItemProps } from './types';

const STATUS_COLOR = {
  pending: 'bg-violet-500',
  in_progress: 'bg-teal-500',
  completed: 'bg-sky-500',
};

const PRIORITY_COLOR = {
  low: 'bg-yellow-500',
  medium: 'bg-orange-500',
  high: 'bg-red-500',
};

type StatusKey = keyof typeof STATUS_COLOR;
type PriorityKey = keyof typeof PRIORITY_COLOR;

const TaskItem = ({
  name,
  description,
  isCompleted,
  image,
  status,
  priority,
  dueDate,
}: TaskItemProps & { status: StatusKey; priority: PriorityKey }) => {
  const [error, setError] = useState(false);
  return (
    <View className={styles.container}>
      {!error && image ? (
        <Image
          source={{ uri: image }}
          onError={() => {
            setError(true);
          }}
          className={styles.image}
          resizeMode="cover"
          alt="Task Image"
        />
      ) : (
        <View className={[styles.image, 'bg-neutral-400'].join(' ')}>
          <MaterialIcons
            name="image-not-supported"
            className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
            size={24}
            color="#ffffff"
          />
        </View>
      )}

      <View className={styles.infoContainer}>
        <View className="flex flex-row justify-between">
          <Text className={styles.title}>{name}</Text>
          {isCompleted ? (
            <Ionicons name="checkmark-circle" size={28} color="green" />
          ) : (
            <Ionicons name="close-circle" size={28} color="red" />
          )}
        </View>
        <Text className={styles.description}>{description}</Text>
        <View className={styles.sub_info_container}>
          <View className={styles.sub_texts}>
            <Text className={[styles.status, STATUS_COLOR[status]].join(' ')}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
            <Text className={[styles.priority, PRIORITY_COLOR[priority]].join(' ')}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
          </View>
          <Text className={styles.due_date}>{dueDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskItem;
