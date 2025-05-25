export type SearchFilterInput = {
  placeHolderText: string;
  placeholderTextColor: string;
  onChangeText: () => void;
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
