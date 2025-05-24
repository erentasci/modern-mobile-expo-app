import { TextInput } from 'react-native';

import { styles } from './styles';
import { InputProps } from './types';

const Input = ({ placeHolderText, placeholderTextColor, ...props }: InputProps) => {
  return (
    <TextInput
      placeholder={placeHolderText}
      className={styles.input}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize="none"
      {...props}
    />
  );
};

export default Input;
