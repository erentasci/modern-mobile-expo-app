import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import Input from '@/components/Input';
import Title from '@/components/Title';

const Page = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Container>
      <Title title="Add List" />
      <View className="flex flex-col gap-5">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="h-12">
              <Input
                placeHolderText="Enter List Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="text-neutral-500"
              />
            </View>
          )}
          name="name"
          rules={{ required: true }}
          defaultValue=""
        />
        <Button
          className="rounded-md bg-indigo-500 shadow-sm"
          title="Add a New List"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default Page;
