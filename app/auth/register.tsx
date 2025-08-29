import { generateVirtualToken, setToken } from '@/utils/auth';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, HelperText, Text, TextInput, useTheme } from 'react-native-paper';

export default function RegisterScreen() {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState<{ username: boolean; password: boolean; confirm: boolean }>({
    username: false,
    password: false,
    confirm: false,
  });

  const onRegister = async () => {
    try {
      setSubmitting(true);
      if (!username || !password) {
        Alert.alert('提示', '请输入账号和密码');
        setSubmitting(false);
        return;
      }
      if (password !== confirm) {
        Alert.alert('提示', '两次输入的密码不一致');
        setSubmitting(false);
        return;
      }
      const token = generateVirtualToken();
      await setToken(token);
      router.replace('/');
    } catch {
      Alert.alert('错误', '注册失败');
    } finally {
      setSubmitting(false);
    }
  };

  const usernameError = touched.username && username.trim().length < 3;
  const passwordError = touched.password && password.length < 6;
  const confirmError = touched.confirm && confirm !== password;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.blobOne} />
      <View style={styles.blobTwo} />

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <View style={{ alignItems: 'center', marginBottom: 8 }}>
            <Image source={require('../../assets/images/icon.png')} style={styles.logo} contentFit="contain" />
          </View>
          <Text variant="headlineSmall" style={styles.title}>创建账号</Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>加入我们，开启新旅程</Text>

          <TextInput
            mode="outlined"
            label="用户名"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            theme={{ roundness: 14 }}
            autoCapitalize="none"
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            left={<TextInput.Icon icon="account" />}
          />
          <HelperText type={usernameError ? 'error' : 'info'} visible={touched.username}>
            {usernameError ? '用户名至少 3 个字符' : ' '}
          </HelperText>

          <TextInput
            mode="outlined"
            label="密码"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            theme={{ roundness: 14 }}
            secureTextEntry={!showPassword}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword((v) => !v)} />}
          />
          <HelperText type={passwordError ? 'error' : 'info'} visible={touched.password}>
            {passwordError ? '密码至少 6 位' : ' '}
          </HelperText>

          <TextInput
            mode="outlined"
            label="确认密码"
            value={confirm}
            onChangeText={setConfirm}
            style={styles.input}
            theme={{ roundness: 14 }}
            secureTextEntry={!showConfirm}
            onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
            left={<TextInput.Icon icon="lock-check" />}
            right={<TextInput.Icon icon={showConfirm ? 'eye-off' : 'eye'} onPress={() => setShowConfirm((v) => !v)} />}
          />
          <HelperText type={confirmError ? 'error' : 'info'} visible={touched.confirm}>
            {confirmError ? '两次输入的密码不一致' : ' '}
          </HelperText>

          <Button
            mode="contained"
            onPress={onRegister}
            loading={submitting}
            disabled={submitting || usernameError || passwordError || confirmError}
            style={styles.primaryButton}
            contentStyle={{ height: 48 }}
          >
            注册
          </Button>

          <View style={{ height: 12 }} />
          <Link href="/auth/login" asChild>
            <Text style={{ color: theme.colors.primary }}>已有账号？去登录</Text>
          </Link>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blobOne: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7c3aed',
    opacity: 0.2,
    top: -40,
    right: -40,
  },
  blobTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#22d3ee',
    opacity: 0.18,
    bottom: -40,
    left: -40,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginBottom: 4,
  },
  title: {
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
  },
  primaryButton: {
    borderRadius: 14,
  },
});