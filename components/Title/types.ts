import Ionicons from '@expo/vector-icons/Ionicons';

type WithButton = {
  onPress?: () => void;
  onBackPress?: boolean;
  buttonColor?: string;
  buttonIcon?: React.ComponentProps<typeof Ionicons>['name'];
  buttonBgColor?: string;
};

type WithoutButton = {
  onPress?: never;
  onBackPress?: never;
  buttonColor?: never;
  buttonIcon?: never;
  buttonBgColor?: never;
};

export type TitleProps = {
  title: string;
  fontStyle?: string;
} & (WithButton | WithoutButton);
