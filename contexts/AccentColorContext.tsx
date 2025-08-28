import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AccentColorContextValue = {
  accentColor: string;
  setAccentColor: (color: string) => void;
};

const DEFAULT_ACCENT = '#6366f1';
const STORAGE_KEY = 'app-accent-color';

const AccentColorContext = createContext<AccentColorContextValue | undefined>(undefined);

export function AccentColorProvider({ children }: PropsWithChildren) {
  const [accentColor, setAccentColorState] = useState<string>(DEFAULT_ACCENT);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setAccentColorState(saved);
        }
      } catch {}
    })();
  }, []);

  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
    AsyncStorage.setItem(STORAGE_KEY, color).catch(() => {});
  }, []);

  const value = useMemo(() => ({ accentColor, setAccentColor }), [accentColor, setAccentColor]);

  return <AccentColorContext.Provider value={value}>{children}</AccentColorContext.Provider>;
}

export function useAccentColor() {
  const ctx = useContext(AccentColorContext);
  if (!ctx) throw new Error('useAccentColor must be used within AccentColorProvider');
  return ctx;
}


