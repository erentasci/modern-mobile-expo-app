import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

import { DATABASE_NAME } from '@/db';

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export default function DatabaseProvider(props: DatabaseProviderProps) {
  // const { success, error } = useMigrations(db, migrations);
  // console.log('success', success);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense>
        {props.children}
      </SQLiteProvider>
    </Suspense>
  );
}
