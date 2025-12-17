import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { loadTransactions, loadActivities, loadTodos } from '../utils/storage';
import { Transaction, Activity, Todo } from '../types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const [loadedTransactions, loadedActivities, loadedTodos] = await Promise.all([
      loadTransactions(),
      loadActivities(),
      loadTodos(),
    ]);
    setTransactions(loadedTransactions);
    setActivities(loadedActivities);
    setTodos(loadedTodos);
  };

  const calculateBalance = () => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return income - expense;
  };

  const todayActivities = activities.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  );

  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  const balance = calculateBalance();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Partner</Text>
        <Text style={styles.headerSubtitle}>
          {new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Financial Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="wallet" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Ringkasan Keuangan</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Total</Text>
          <Text style={[styles.balanceAmount, balance < 0 && styles.negativeBalance]}>
            Rp {balance.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="arrow-down-circle" size={20} color="#4CAF50" />
            <Text style={styles.summaryLabel}>Pemasukan</Text>
            <Text style={styles.summaryIncome}>
              Rp{' '}
              {transactions
                .filter((t) => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="arrow-up-circle" size={20} color="#F44336" />
            <Text style={styles.summaryLabel}>Pengeluaran</Text>
            <Text style={styles.summaryExpense}>
              Rp{' '}
              {transactions
                .filter((t) => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      </View>

      {/* Today's Activities */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="clock-outline" size={24} color="#2196F3" />
          <Text style={styles.cardTitle}>Aktivitas Hari Ini</Text>
        </View>
        {todayActivities.length > 0 ? (
          todayActivities.slice(0, 3).map((activity) => (
            <View key={activity.id} style={styles.listItem}>
              <MaterialCommunityIcons
                name={activity.completed ? 'check-circle' : 'circle-outline'}
                size={20}
                color={activity.completed ? '#4CAF50' : '#999'}
              />
              <Text style={styles.listItemText}>{activity.title}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Belum ada aktivitas hari ini</Text>
        )}
      </View>

      {/* Todo Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="format-list-checks" size={24} color="#FF9800" />
          <Text style={styles.cardTitle}>To-Do List</Text>
        </View>
        <View style={styles.todoSummary}>
          <View style={styles.todoSummaryItem}>
            <Text style={styles.todoSummaryNumber}>{pendingTodos.length}</Text>
            <Text style={styles.todoSummaryLabel}>Belum Selesai</Text>
          </View>
          <View style={styles.todoSummaryDivider} />
          <View style={styles.todoSummaryItem}>
            <Text style={[styles.todoSummaryNumber, styles.completedNumber]}>
              {completedTodos.length}
            </Text>
            <Text style={styles.todoSummaryLabel}>Selesai</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  negativeBalance: {
    color: '#F44336',
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginBottom: 3,
  },
  summaryIncome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryExpense: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listItemText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  todoSummary: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  todoSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  todoSummaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  todoSummaryNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  completedNumber: {
    color: '#4CAF50',
  },
  todoSummaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  bottomSpacing: {
    height: 30,
  },
});
