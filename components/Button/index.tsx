import { forwardRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { ButtonProps } from './types';

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`${styles.button} ${touchableProps.className}`}>
      <Text className={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});
