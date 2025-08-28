import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Chip, Surface, Text, TextInput, TouchableRipple, useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

const quickActions = [
  { key: 'options', title: 'Options', icon: 'chart-box' },
  { key: 'perp', title: 'Perp', icon: 'axis-arrow' },
  { key: 'deposit', title: 'Deposit', icon: 'arrow-down-bold' },
  { key: 'withdrawal', title: 'Withdrawal', icon: 'arrow-up-bold' },
  { key: 'more', title: 'More', icon: 'dots-grid' },
];

type Coin = {
  key: string;
  base: string;
  price: string;
  change: number;
  color: string;
  icon: string;
};

const coins: Coin[] = [
  { key: 'btc', base: 'BTC', price: '87,747.24', change: -0.98, color: '#F7931A', icon: 'bitcoin' },
  { key: 'eth', base: 'ETH', price: '87,747.24', change: -0.98, color: '#627EEA', icon: 'ethereum' },
  { key: 'trx', base: 'TRX', price: '87,747.24', change: -0.98, color: '#FF060A', icon: 'alpha-t-circle' },
  { key: 'xrp', base: 'XRP', price: '87,747.24', change: -0.98, color: '#23292F', icon: 'ripple' },
  { key: 'gmx', base: 'GMX', price: '87,747.24', change: -0.98, color: '#4AD0FF', icon: 'alpha-g-circle' },
  { key: 'rpl', base: 'RPL', price: '87,747.24', change: -0.98, color: '#F7931A', icon: 'rocket' },
];

export default function ExploreScreen() {
  const theme = useTheme();
  const [mainSeg, setMainSeg] = useState<string>('Hot');
  const [subSeg, setSubSeg] = useState<string>('Spot');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: theme.colors.background, dark: theme.colors.background }}
      headerImage={<></>}
    >
      <ThemedView style={{ paddingHorizontal: 12, paddingTop: 8 }}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          left={<TextInput.Icon icon="magnify" />}
          style={{ marginBottom: 12 }}
          theme={{ roundness: 14 }}
        />

        <View style={styles.quickRow}>
          {quickActions.map((q) => (
            <TouchableRipple key={q.key} style={styles.quickItem} borderless>
              <View style={{ alignItems: 'center' }}>
                <Surface style={styles.quickIcon} elevation={1}>
                  <Avatar.Icon size={28} icon={q.icon} style={{ backgroundColor: 'transparent' }} />
                </Surface>
                <Text style={{ marginTop: 6 }}>{q.title}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>

        <View style={styles.promoRow}>
          <Card style={styles.promoCard} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium">Copy Trading</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>Copy Trading</Text>
            </Card.Content>
          </Card>
          <Card style={styles.promoCard} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium">Activity</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>Activity</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.segmentRow}>
          {['Hot', 'Self Service', 'Spot', 'Perp', 'Seconds'].map((t) => (
            <Button
              key={t}
              compact
              mode={mainSeg === t ? 'contained' : 'text'}
              style={mainSeg === t ? styles.segmentActive : undefined}
              onPress={() => setMainSeg(t)}
            >
              {t}
            </Button>
          ))}
        </View>

        <View style={[styles.segmentRow, { marginTop: 2 }] }>
          {['Spot', 'Perp', 'Seconds', 'Options'].map((t) => (
            <Button
              key={t}
              compact
              mode={subSeg === t ? 'contained' : 'text'}
              style={subSeg === t ? styles.segmentActive : undefined}
              onPress={() => setSubSeg(t)}
            >
              {t}
            </Button>
          ))}
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.headerColLeft}>Crypto</Text>
          <Text style={styles.headerColMid}>Last Price</Text>
          <Text style={styles.headerColRight}>24h %</Text>
        </View>

        <FlatList
          data={coins}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Avatar.Icon size={32} icon={item.icon} color="#fff" style={{ backgroundColor: item.color, marginRight: 10 }} />
                <Text style={{ fontWeight: '600' }}>{item.base}<Text style={{ color: theme.colors.onSurfaceVariant }}>/USDT</Text></Text>
              </View>
              <View style={styles.cellMid}>
                <Text>{item.price}</Text>
              </View>
              <View style={styles.cellRight}>
                <Chip compact selectedColor="#fff" style={{ backgroundColor: item.change >= 0 ? '#10b981' : '#ef4444' }}>{item.change.toFixed(2)}%</Chip>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 24 }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quickItem: {
    width: (width - 12 * 2) / 5 - 8,
    alignItems: 'center',
  },
  quickIcon: {
    width: 54,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  promoCard: {
    flex: 1,
    borderRadius: 12,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  segmentActive: {
    borderRadius: 999,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerColLeft: { flex: 5, fontWeight: '600' },
  headerColMid: { flex: 4, textAlign: 'right', fontWeight: '600' },
  headerColRight: { flex: 3, textAlign: 'right', fontWeight: '600' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cellLeft: { flex: 5, flexDirection: 'row', alignItems: 'center' },
  cellMid: { flex: 4, alignItems: 'flex-end' },
  cellRight: { flex: 3, alignItems: 'flex-end' },
});