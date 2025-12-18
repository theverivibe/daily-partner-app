import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, Activity, Todo } from '../types';

const TRANSACTIONS_KEY = '@daily_partner_transactions';
const ACTIVITIES_KEY = '@daily_partner_activities';
const TODOS_KEY = '@daily_partner_todos';

// Transactions
export const saveTransactions = async (transactions: Transaction[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const loadTransactions = async (): Promise<Transaction[]> => {
  try {
    const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

// Activities
export const saveActivities = async (activities: Activity[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  } catch (error) {
    console.error('Error saving activities:', error);
  }
};

export const loadActivities = async (): Promise<Activity[]> => {
  try {
    const data = await AsyncStorage.getItem(ACTIVITIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading activities:', error);
    return [];
  }
};

// Todos
export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const data = await AsyncStorage.getItem(TODOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};
