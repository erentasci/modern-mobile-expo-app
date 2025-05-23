import { TextInputProps } from 'react-native';

export type InputProps = {
  placeHolderText: string;
  placeholderTextColor: string;
} & TextInputProps;
