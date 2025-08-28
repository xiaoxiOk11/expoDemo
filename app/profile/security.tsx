import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, HelperText, TextInput } from 'react-native-paper';

export default function SecurityScreen() {
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const error = confirm.length > 0 && pwd !== confirm;

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="安全设置" />
        <Card.Content>
          <TextInput label="新密码" mode="outlined" secureTextEntry style={styles.input} value={pwd} onChangeText={setPwd} />
          <TextInput label="确认密码" mode="outlined" secureTextEntry style={styles.input} value={confirm} onChangeText={setConfirm} />
          <HelperText type={error ? 'error' : 'info'} visible={confirm.length > 0}>
            {error ? '两次密码不一致' : ' '}
          </HelperText>
          <Button mode="contained" disabled={!pwd || !confirm || error}>保存</Button>
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


