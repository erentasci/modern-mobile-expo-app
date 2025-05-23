import Ionicons from '@expo/vector-icons/Ionicons';

type WithButton = {
  onPress?: () => void;
  buttonColor?: string;
  buttonIcon?: React.ComponentProps<typeof Ionicons>['name'];
  buttonBgColor?: string;
};

type WithoutButton = {
  onPress?: never;
  buttonColor?: never;
  buttonIcon?: never;
  buttonBgColor?: never;
};

export type TitleProps = {
  title: string;
} & (WithButton | WithoutButton);
