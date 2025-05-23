import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';

export type IconProps = {
  onPress: () => void;
  iconName: ComponentProps<typeof Ionicons>['name'];
  iconSize: number;
  iconColor: string;
};
