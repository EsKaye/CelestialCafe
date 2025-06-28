import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { CosmicButton } from '../components/ui/CosmicButton';
import { fonts } from '../constants/fonts';

interface Order {
  id: string;
  customerName: string;
  drink: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  time: string;
  satisfaction: number;
}

const orders: Order[] = [
  {
    id: '1',
    customerName: 'Cosmic Traveler',
    drink: 'Stellar Brew',
    status: 'pending',
    time: '2m ago',
    satisfaction: 100,
  },
  {
    id: '2',
    customerName: 'Nebula Nomad',
    drink: 'Nebula Nectar',
    status: 'preparing',
    time: '1m ago',
    satisfaction: 85,
  },
  {
    id: '3',
    customerName: 'Galaxy Guardian',
    drink: 'Galactic Green Tea',
    status: 'ready',
    time: 'Just now',
    satisfaction: 95,
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return colors.status.warning;
    case 'preparing':
      return colors.cosmic.primary;
    case 'ready':
      return colors.status.success;
    case 'completed':
      return colors.text.secondary;
  }
};

export const OrdersScreen: React.FC = () => {
  const scrollY = new Animated.Value(0);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>{strings.navigation.orders}</Text>
        <Text style={styles.headerSubtitle}>{strings.app.tagline}</Text>
      </Animated.View>
      
      <Animated.ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {orders.map((order) => (
          <Animated.View 
            key={order.id} 
            style={[
              styles.orderCard,
              {
                transform: [{
                  scale: scrollY.interpolate({
                    inputRange: [-50, 0, 50, 100],
                    outputRange: [1.02, 1, 0.98, 0.96],
                    extrapolate: 'clamp',
                  }),
                }],
              },
            ]}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.drinkName}>{order.drink}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.satisfactionContainer}>
                <Text style={styles.satisfactionLabel}>Cosmic Satisfaction</Text>
                <View style={styles.satisfactionBar}>
                  <Animated.View
                    style={[
                      styles.satisfactionFill,
                      { width: `${order.satisfaction}%` },
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.timeText}>{order.time}</Text>
            </View>

            {order.status === 'ready' && (
              <CosmicButton
                title={strings.ui.buttons.serve}
                onPress={() => {}}
                variant="primary"
                size="small"
              />
            )}
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.main,
  },
  header: {
    padding: 16,
    paddingTop: 48,
    backgroundColor: colors.backgrounds.main,
    borderBottomWidth: 1,
    borderBottomColor: colors.cosmic.primary + '20',
  },
  headerTitle: {
    fontSize: fonts.sizes['2xl'],
    fontFamily: fonts.families.primaryBold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.families.secondary,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: colors.backgrounds.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cosmic.primary + '30',
    shadowColor: colors.effects.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerName: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.families.primaryBold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  drinkName: {
    fontSize: fonts.sizes.base,
    fontFamily: fonts.families.secondary,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  status: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.families.secondaryBold,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  satisfactionContainer: {
    flex: 1,
    marginRight: 12,
  },
  satisfactionLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.families.secondary,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  satisfactionBar: {
    height: 4,
    backgroundColor: colors.backgrounds.modal,
    borderRadius: 2,
    overflow: 'hidden',
  },
  satisfactionFill: {
    height: '100%',
    backgroundColor: colors.cosmic.primary,
    borderRadius: 2,
  },
  timeText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.families.secondary,
    color: colors.text.secondary,
  },
}); 