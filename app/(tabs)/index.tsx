import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { getToken } from '@/utils/auth';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, Surface, Text, TextInput, TouchableRipple } from 'react-native-paper';

const { width } = Dimensions.get('window');

const carouselImages = [
  require('@/assets/images/partial-react-logo.png'),
  require('@/assets/images/icon.png'),
  require('@/assets/images/partial-react-logo.png'),
];

const icons = [
  { key: 'music', title: '音乐', icon: 'music' },
  { key: 'gift', title: '礼包', icon: 'gift' },
  { key: 'ranking', title: '排行', icon: 'trophy' },
  { key: 'daily', title: '每日', icon: 'calendar' },
  { key: 'store', title: '商店', icon: 'cart' },
  { key: 'friends', title: '好友', icon: 'account-group' },
  { key: 'task', title: '任务', icon: 'check-circle' },
  { key: 'more', title: '更多', icon: 'dots-horizontal' },

];

export default function HomeScreen() {
  const [checking, setChecking] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        router.replace('/auth/login');
      } else {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return null;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E9ECF5', dark: '#111827' }}
      headerImage={<View />}
    >
      <ThemedView style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <View>
            <Text variant="titleLarge">你好，玩家</Text>
            <Text variant="bodyMedium" style={{ color: '#6b7280' }}>祝你今天也有好心情</Text>
          </View>
          <Avatar.Icon size={42} icon="account" />
        </View>
        <TextInput
          mode="outlined"
          placeholder="搜索你想要的内容"
          left={<TextInput.Icon icon="magnify" />}
          style={{ marginTop: 12 }}
          theme={{ roundness: 14 }}
        />
      </ThemedView>

      <View style={{ width, paddingTop: 6 }}>
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={(e) => {
            const page = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveSlide(page);
          }}
          showsHorizontalScrollIndicator={false}
          style={{ width, height: 200 }}
        >
          {carouselImages.map((img, idx) => (
            <View key={idx} style={{ width, height: 200, alignItems: 'center', justifyContent: 'center' }}>
              <Image  source={img} style={{ width: width - 32, height: 180, borderRadius: 10 }} contentFit="fill" />
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotsRow}>
          {carouselImages.map((_, i) => (
            <View key={i} style={[styles.dot, activeSlide === i && styles.dotActive]} />
          ))}
        </View>
      </View>

      <ThemedView style={{ paddingHorizontal: 16, paddingTop: 4 }}>
        <View style={styles.grid}>
          {icons.map(item => (
            <TouchableRipple key={item.key} style={styles.gridItem} onPress={() => router.push('/music')} borderless>
              <View style={{ alignItems: 'center' }}>
                <Surface style={[styles.gridIcon, { backgroundColor: '#EEF2FF' }]} elevation={0}>
                  <Avatar.Icon size={40} icon={item.icon} style={{ backgroundColor: 'transparent' }} color="#6366f1" />
                </Surface>
                <Text style={{ marginTop: 6 }}>{item.title}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>

        <Divider style={{ marginVertical: 8 }} />

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium">推荐</Text>
          <Button compact onPress={() => router.push('/explore')}>查看全部</Button>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} style={styles.recoCard} mode="elevated">
              <Image source={require('@/assets/images/icon.png')} style={{ width: 140, height: 90, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} contentFit="cover" />
              <Card.Content>
                <Text numberOfLines={1} style={{ marginTop: 6 }}>推荐内容 {i}</Text>
                <Text numberOfLines={1} style={{ color: '#6b7280', marginTop: 2 }}>精彩不容错过</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotsRow: {
    height: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#6366f1',
    width: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 16 * 2) / 4,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gridIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    marginTop: 2,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recoCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
});