import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { IconProps } from './types';

const Icon = ({ onPress, iconName, iconSize, iconColor }: IconProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles.icon}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default Icon;
