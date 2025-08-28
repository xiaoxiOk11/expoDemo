import { useAudio } from '@/hooks/useAudio';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function MusicScreen() {
  const { toggle, isPlaying, isLoading, error } = useAudio(
    require('@/assets/music.mp3'),
    { shouldPlay: true, isLooping: true }
  );

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>背景音乐示例</Text>
      {error && (
        <Text variant="bodyMedium" style={{ color: 'red', marginBottom: 12 }}>
          错误: {error}
        </Text>
      )}
      <Button mode="contained" onPress={toggle} disabled={isLoading} loading={isLoading}>
        {isLoading ? '加载中...' : isPlaying ? '暂停' : '播放'}
      </Button>
      <View style={{ height: 12 }} />
      <Button onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
      }}>返回</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
});