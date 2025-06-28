import { create } from 'zustand';
import { generateId } from '../utils/helpers';

export interface Customer {
  id: string;
  name: string;
  order: string;
  patience: number;
  satisfaction: number;
  tipMultiplier: number;
  arrivalTime: number;
}

interface CustomerQueueState {
  // Queue state
  queue: Customer[];
  maxQueueSize: number;
  processingCustomer: Customer | null;
  
  // Actions
  addCustomer: (customer: Omit<Customer, 'id' | 'arrivalTime'>) => void;
  removeCustomer: (customerId: string) => void;
  setProcessingCustomer: (customer: Customer | null) => void;
  updateCustomerSatisfaction: (customerId: string, satisfaction: number) => void;
  clearQueue: () => void;
}

const initialState = {
  queue: [],
  maxQueueSize: 5,
  processingCustomer: null,
};

export const useCustomerQueue = create<CustomerQueueState>()((set) => ({
  ...initialState,

  addCustomer: (customer) => set((state) => {
    if (state.queue.length >= state.maxQueueSize) {
      return state;
    }

    const newCustomer: Customer = {
      ...customer,
      id: generateId(),
      arrivalTime: Date.now(),
    };

    return {
      queue: [...state.queue, newCustomer],
    };
  }),

  removeCustomer: (customerId) => set((state) => ({
    queue: state.queue.filter((customer) => customer.id !== customerId),
  })),

  setProcessingCustomer: (customer) => set({
    processingCustomer: customer,
  }),

  updateCustomerSatisfaction: (customerId, satisfaction) => set((state) => ({
    queue: state.queue.map((customer) =>
      customer.id === customerId
        ? { ...customer, satisfaction }
        : customer
    ),
  })),

  clearQueue: () => set({
    queue: [],
    processingCustomer: null,
  }),
}));
