import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { TitleProps } from './types';

const Title = ({ title, onPress, buttonColor, buttonBgColor, buttonIcon }: TitleProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.text}>{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress} className={styles.button + ` ${buttonBgColor}`}>
          <Ionicons name={buttonIcon} size={24} color={buttonColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Title;
