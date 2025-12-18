// Common types for the application

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Finance: undefined;
  Activity: undefined;
  Todo: undefined;
};
