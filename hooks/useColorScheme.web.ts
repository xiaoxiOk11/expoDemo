// hooks/useColorScheme.web.ts (web)
import { useThemeMode } from '@/contexts/ThemeModeContext';
import { useEffect, useState } from 'react';

export function useColorScheme() {
  const { themeMode } = useThemeMode();
  const [system, setSystem] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystem(e.matches ? 'dark' : 'light');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return themeMode === 'system' ? system : themeMode;
}