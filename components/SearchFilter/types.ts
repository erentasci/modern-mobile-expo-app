export type SearchFilterInput = {
  value: string;
  placeHolderText: string;
  placeholderTextColor: string;
  onChangeText: (text: string) => void;
};

type WithFilter = {
  hasFilter: true;
  onFilterPress: () => void;
};

type WithoutFilter = {
  hasFilter?: false;
  onFilterPress?: never;
};

export type SearchFilterProps = SearchFilterInput & (WithFilter | WithoutFilter);
