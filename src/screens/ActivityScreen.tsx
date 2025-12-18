import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { loadActivities, saveActivities } from '../utils/storage';
import { Activity } from '../types';

export default function ActivityScreen() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('sv-SE'));

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const loadedActivities = await loadActivities();
    setActivities(loadedActivities);
  };

  const handleAddActivity = async () => {
    if (!title) {
      Alert.alert('Error', 'Mohon isi judul aktivitas');
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      description,
      date: selectedDate,
      completed: false,
    };

    const updatedActivities = [newActivity, ...activities];
    await saveActivities(updatedActivities);
    setActivities(updatedActivities);

    // Reset form
    setTitle('');
    setDescription('');
    setModalVisible(false);
  };

  const toggleActivityStatus = async (id: string) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    );
    await saveActivities(updatedActivities);
    setActivities(updatedActivities);
  };

  const handleDeleteActivity = async (id: string) => {
    Alert.alert('Hapus Aktivitas', 'Apakah Anda yakin ingin menghapus aktivitas ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          const updatedActivities = activities.filter((a) => a.id !== id);
          await saveActivities(updatedActivities);
          setActivities(updatedActivities);
        },
      },
    ]);
  };

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  const sortedDates = Object.keys(groupedActivities).sort((a, b) => b.localeCompare(a));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date().toLocaleDateString('sv-SE');
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('sv-SE');

    if (dateString === today) return 'Hari Ini';
    if (dateString === yesterday) return 'Kemarin';

    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aktivitas</Text>
        <Text style={styles.headerSubtitle}>Catatan aktivitas harianmu</Text>
      </View>

      {/* Activities List */}
      <ScrollView style={styles.activitiesList}>
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{formatDate(date)}</Text>
              {groupedActivities[date].map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  style={styles.activityItem}
                  onPress={() => toggleActivityStatus(activity.id)}
                  onLongPress={() => handleDeleteActivity(activity.id)}
                >
                  <View style={styles.activityCheckbox}>
                    <MaterialCommunityIcons
                      name={activity.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                      size={28}
                      color={activity.completed ? '#4CAF50' : '#999'}
                    />
                  </View>
                  <View style={styles.activityContent}>
                    <Text
                      style={[
                        styles.activityTitle,
                        activity.completed && styles.activityTitleCompleted,
                      ]}
                    >
                      {activity.title}
                    </Text>
                    {activity.description ? (
                      <Text
                        style={[
                          styles.activityDescription,
                          activity.completed && styles.activityDescriptionCompleted,
                        ]}
                      >
                        {activity.description}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Belum ada aktivitas yang dicatat</Text>
        )}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Activity Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Aktivitas</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Tanggal</Text>
            <TouchableOpacity style={styles.dateButton}>
              <MaterialCommunityIcons name="calendar" size={20} color="#6200EE" />
              <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Judul Aktivitas</Text>
            <TextInput
              style={styles.input}
              placeholder="Apa yang kamu lakukan?"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Deskripsi (Opsional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tambahkan detail..."
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAddActivity}>
              <Text style={styles.submitButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#6200EE',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
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
  activitiesList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateGroup: {
    marginBottom: 25,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityCheckbox: {
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
  activityDescriptionCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
