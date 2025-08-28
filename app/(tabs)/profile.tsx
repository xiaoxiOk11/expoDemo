import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, List, Surface, Text } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.headerCard} mode="elevated">
        <Card.Content>
          <View style={styles.headerRow}>
            <Avatar.Icon size={56} icon="account" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text variant="titleMedium">未登录用户</Text>
              <Text variant="bodySmall" style={{ color: '#6b7280' }}>点击登录或注册</Text>
            </View>
            <Link href="/auth/login" asChild>
              <Button mode="contained">去登录</Button>
            </Link>
          </View>
        </Card.Content>
      </Card>

      <Surface style={styles.statRow} elevation={1}>
        <View style={styles.statItem}>
          <Text variant="titleMedium">12</Text>
          <Text style={styles.statLabel}>收藏</Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="titleMedium">5</Text>
          <Text style={styles.statLabel}>关注</Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="titleMedium">3</Text>
          <Text style={styles.statLabel}>消息</Text>
        </View>
      </Surface>

      <Card style={styles.card} mode="elevated">
        <List.Section>
          <Link href="/profile/account" asChild>
            <List.Item title="账号信息" left={(p) => <List.Icon {...p} icon="account-circle" />} right={(p) => <List.Icon {...p} icon="chevron-right" />} />
          </Link>
          <Divider />
          <Link href="/profile/security" asChild>
            <List.Item title="安全隐私" left={(p) => <List.Icon {...p} icon="shield-lock" />} right={(p) => <List.Icon {...p} icon="chevron-right" />} />
          </Link>
          <Divider />
          <Link href="/profile/settings" asChild>
            <List.Item title="设置" left={(p) => <List.Icon {...p} icon="cog" />} right={(p) => <List.Icon {...p} icon="chevron-right" />} />
          </Link>
          <Divider />
          <Link href="/profile/about" asChild>
            <List.Item title="关于" left={(p) => <List.Icon {...p} icon="information" />} right={(p) => <List.Icon {...p} icon="chevron-right" />} />
          </Link>
        </List.Section>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    borderRadius: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statRow: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#6b7280',
  },
  card: {
    borderRadius: 16,
  },
});


