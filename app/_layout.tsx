import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// Import polyfills for better iOS compatibility
import '@/utils/polyfills';

import { AccentColorProvider, useAccentColor } from '@/contexts/AccentColorContext';
import { ThemeModeProvider, useThemeMode } from '@/contexts/ThemeModeContext';
import { useColorScheme } from '@/hooks/useColorScheme';
// Removed custom HashRouterProvider; rely on Expo Router's hash mode via env/webpack

function InnerRoot() {
  const systemScheme = useColorScheme();
  const { themeMode } = useThemeMode();
  const { accentColor } = useAccentColor();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const effectiveScheme = themeMode === 'system' ? systemScheme : themeMode;
  const base = effectiveScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const paperTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: accentColor,
    },
  } as typeof base;

  return (
      <ThemeProvider value={effectiveScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PaperProvider theme={paperTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="auth/register" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="profile/account" options={{ title: '账号信息' }} />
            <Stack.Screen name="profile/security" options={{ title: '安全隐私' }} />
            <Stack.Screen name="profile/settings" options={{ title: '设置' }} />
            <Stack.Screen name="profile/about" options={{ title: '关于' }} />
            <Stack.Screen name="music" options={{ title: '音乐' }} />
            <Stack.Screen name="activity/activity" options={{ title: '活动' }} />

            <Stack.Screen name="+not-found" options={{ title: '页面错误' }} />
          </Stack>
          <StatusBar style="auto" />
        </PaperProvider>
      </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <AccentColorProvider>
        <InnerRoot />
      </AccentColorProvider>
    </ThemeModeProvider>
  );
}