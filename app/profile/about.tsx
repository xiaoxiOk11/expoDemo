import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="关于" />
        <Card.Content>
          <Text>版本 1.0.0</Text>
          <Text style={{ marginTop: 8, color: '#6b7280' }}>这是一个示例应用的关于页面。</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 16 },
});


