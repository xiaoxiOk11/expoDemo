import { useAccentColor } from '@/contexts/AccentColorContext';
import { ThemeMode, useThemeMode } from '@/contexts/ThemeModeContext';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, RadioButton, Switch } from 'react-native-paper';

export default function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const { accentColor, setAccentColor } = useAccentColor();
  const { themeMode, setThemeMode } = useThemeMode();

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <List.Section>
          <List.Subheader>主题模式</List.Subheader>
          <RadioButton.Group onValueChange={(v) => setThemeMode(v as ThemeMode)} value={themeMode}>
            <List.Item title="跟随系统" left={(p) => <List.Icon {...p} icon="cellphone-cog" />} right={() => (
              <RadioButton value="system" />
            )} onPress={() => setThemeMode('system')} />
            <List.Item title="浅色" left={(p) => <List.Icon {...p} icon="white-balance-sunny" />} right={() => (
              <RadioButton value="light" />
            )} onPress={() => setThemeMode('light')} />
            <List.Item title="深色" left={(p) => <List.Icon {...p} icon="weather-night" />} right={() => (
              <RadioButton value="dark" />
            )} onPress={() => setThemeMode('dark')} />
          </RadioButton.Group>
          <List.Item title="消息通知" left={(p) => <List.Icon {...p} icon="bell" />} right={() => (
            <Switch value={notify} onValueChange={setNotify} />
          )} />
          <List.Subheader>主题色</List.Subheader>
          {COLOR_PRESETS.map((c) => (
            <List.Item
              key={c}
              title={c}
              left={() => <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: c, marginLeft: 16 }} />}
              right={() => <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: accentColor === c ? 6 : 1, borderColor: accentColor === c ? c : '#e5e7eb', marginRight: 16 }} />}
              onPress={() => setAccentColor(c)}
            />
          ))}
        </List.Section>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 16 },
});

const COLOR_PRESETS = [
  '#6366f1', // indigo
  '#ef4444', // red
  '#22c55e', // green
  '#eab308', // yellow
  '#06b6d4', // cyan
  '#a855f7', // purple
  '#f97316', // orange
];


