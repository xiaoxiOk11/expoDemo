import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  id: `item-${i + 1}`,
  title: `虚拟条目 ${i + 1}`,
  desc: '这是一个虚拟描述，用于占位展示效果。',
}));

export default function ListScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<></>}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">列表</ThemedText>
      </ThemedView>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.desc}</Text>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});