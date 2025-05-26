import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { TitleProps } from './types';

const Title = ({
  title = 'List Details',
  onPress,
  onBackPress,
  buttonColor,
  buttonBgColor,
  buttonIcon,
  fontStyle,
}: TitleProps) => {
  const router = useRouter();

  return (
    <View className={styles.container}>
      {onBackPress ? (
        <View className={styles.backButtonTitle}>
          <TouchableOpacity onPress={() => router.back()} className={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </TouchableOpacity>

          <Text className={[styles.text, fontStyle].join(' ')}>{title}</Text>
        </View>
      ) : (
        <Text className={[styles.text, fontStyle].join(' ')}>{title}</Text>
      )}
      {onPress && (
        <TouchableOpacity onPress={onPress} className={styles.button + ` ${buttonBgColor}`}>
          <Ionicons name={buttonIcon} size={24} color={buttonColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Title;
