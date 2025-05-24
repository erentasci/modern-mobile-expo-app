import { SafeAreaView } from 'react-native';

import { styles } from './styles';
import { ContainerProps } from './types';

const Container = ({ children }: ContainerProps) => {
  return <SafeAreaView className={styles.container}>{children}</SafeAreaView>;
};

export default Container;
