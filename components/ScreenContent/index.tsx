import { Text, View } from 'react-native';

import EditScreenInfo from '../EditScreenInfo';
import { styles } from './styles';
import { ScreenContentProps } from './types';

const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};

export default ScreenContent;
