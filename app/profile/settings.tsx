import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Switch } from 'react-native-paper';

export default function SettingsScreen() {
  const [dark, setDark] = useState(false);
  const [notify, setNotify] = useState(true);

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <List.Section>
          <List.Item title="深色模式" left={(p) => <List.Icon {...p} icon="theme-light-dark" />} right={() => (
            <Switch value={dark} onValueChange={setDark} />
          )} />
          <List.Item title="消息通知" left={(p) => <List.Icon {...p} icon="bell" />} right={() => (
            <Switch value={notify} onValueChange={setNotify} />
          )} />
        </List.Section>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 16 },
});


