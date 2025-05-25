import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { initDB } from '@/db';
import DatabaseProvider from '@/providers/database-provider';

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <DatabaseProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="lists/[id]/index" options={{ headerShown: false }} />
          <Stack.Screen name="lists/[id]/add-task" options={{ headerShown: false }} />
          <Stack.Screen name="lists/[id]/edit-task" options={{ headerShown: false }} />
          <Stack.Screen name="tasks/index" options={{ headerShown: false }} />
          <Stack.Screen name="tasks/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="add-list" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </DatabaseProvider>
  );
}
