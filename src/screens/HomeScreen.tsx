import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useGameState } from '../store/gameState';
import { useCustomerQueue, Customer } from '../store/customerQueue';
import { CosmicButton } from '../components/ui/CosmicButton';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { formatCurrency } from '../utils/helpers';
import { CustomerTimer } from '../utils/timers';
import { CosmicBackground } from '../components/animations/CosmicBackground';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const { currency, addCurrency } = useGameState();
  const { queue, addCustomer, removeCustomer, processingCustomer, setProcessingCustomer } = useCustomerQueue();
  const [customerTimers, setCustomerTimers] = useState<Map<string, CustomerTimer>>(new Map());

  // Generate a new customer
  const generateCustomer = () => {
    const newCustomer: Omit<Customer, 'id' | 'arrivalTime'> = {
      name: 'Cosmic Traveler',
      order: 'Stellar Brew',
      patience: 30000, // 30 seconds
      satisfaction: 100,
      tipMultiplier: 1.5,
    };

    addCustomer(newCustomer);
  };

  // Handle customer timeout
  const handleCustomerTimeout = (customerId: string) => {
    removeCustomer(customerId);
    customerTimers.get(customerId)?.cancel();
    customerTimers.delete(customerId);
  };

  // Process customer order
  const processOrder = (customer: Customer) => {
    setProcessingCustomer(customer);
    // Simulate brewing time
    setTimeout(() => {
      const tip = Math.floor(customer.satisfaction * customer.tipMultiplier);
      addCurrency(tip);
      removeCustomer(customer.id);
      setProcessingCustomer(null);
    }, 2000);
  };

  // Update customer satisfaction based on wait time
  useEffect(() => {
    queue.forEach((customer) => {
      if (!customerTimers.has(customer.id)) {
        const timer = new CustomerTimer(customer.patience, () => handleCustomerTimeout(customer.id));
        setCustomerTimers((prev) => new Map(prev).set(customer.id, timer));
      }
    });
  }, [queue]);

  return (
    <View style={styles.container}>
      <CosmicBackground />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.currency}>{formatCurrency(currency)}</Text>
        <Text style={styles.title}>{strings.app.name}</Text>
      </View>

      {/* Customer Queue */}
      <ScrollView style={styles.queueContainer}>
        {queue.map((customer) => (
          <View key={customer.id} style={styles.customerCard}>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{customer.name}</Text>
              <Text style={styles.orderText}>{customer.order}</Text>
            </View>
            
            <View style={styles.satisfactionContainer}>
              <View style={styles.satisfactionBar}>
                <View
                  style={[
                    styles.satisfactionFill,
                    { width: `${customer.satisfaction}%` },
                  ]}
                />
              </View>
              <Text style={styles.satisfactionText}>
                {Math.round(customer.satisfaction)}%
              </Text>
            </View>

            <CosmicButton
              title={strings.ui.buttons.serve}
              onPress={() => processOrder(customer)}
              disabled={!!processingCustomer}
              variant="primary"
              size="small"
            />
          </View>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <CosmicButton
          title={strings.ui.buttons.brew}
          onPress={generateCustomer}
          disabled={queue.length >= 5 || !!processingCustomer}
          variant="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.main,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.backgrounds.card,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 10,
  },
  currency: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  queueContainer: {
    flex: 1,
    padding: 16,
  },
  customerCard: {
    backgroundColor: colors.backgrounds.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cosmic.primary,
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  orderText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  satisfactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  satisfactionBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.backgrounds.modal,
    borderRadius: 2,
    marginRight: 12,
    overflow: 'hidden',
  },
  satisfactionFill: {
    height: '100%',
    backgroundColor: colors.cosmic.primary,
    borderRadius: 2,
  },
  satisfactionText: {
    fontSize: 14,
    color: colors.text.secondary,
    width: 40,
    textAlign: 'right',
  },
  actions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.backgrounds.card,
  },
}); 