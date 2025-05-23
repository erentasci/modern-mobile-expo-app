import { View } from 'react-native';

import Icon from '../Icon';
import Input from '../Input';
import { styles } from './styles';
import { SearchFilterProps } from './types';

const SearchFilter = ({
  onChangeText,
  onFilterPress,
  placeHolderText,
  placeholderTextColor,
}: SearchFilterProps) => {
  return (
    <View className={styles.container}>
      <Input
        placeHolderText={placeHolderText}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
      />
      <Icon iconName="filter" iconSize={24} iconColor="black" onPress={onFilterPress} />
    </View>
  );
};

export default SearchFilter;
