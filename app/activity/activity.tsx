import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="账号信息" />
        <Card.Content>
          <TextInput label="昵称" mode="outlined" style={styles.input} />
          <TextInput label="签名" mode="outlined" style={styles.input} />
          <TextInput label="邮箱" mode="outlined" style={styles.input} keyboardType="email-address" />
          <Button mode="contained">保存</Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 16 },
  input: { marginBottom: 12 },
});


