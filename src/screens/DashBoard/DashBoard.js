import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
  // Dữ liệu mẫu về tiết học của học sinh trong ngày
  const todayClasses = [
    {
      id: 1,
      studentName: "Nguyễn Văn A",
      className: "10A1",
      subject: "Toán học",
      time: "08:00 - 09:00",
      status: "Vắng mặt",
      reason: "Bị ốm",
      priority: "high"
    },
    {
      id: 2,
      studentName: "Trần Thị B",
      className: "10A1", 
      subject: "Văn học",
      time: "09:00 - 10:00",
      status: "Đi muộn",
      reason: "Tắc đường",
      priority: "medium"
    },
    {
      id: 3,
      studentName: "Lê Văn C",
      className: "10A2",
      subject: "Tiếng Anh",
      time: "10:00 - 11:00",
      status: "Nghỉ học",
      reason: "Có việc gia đình",
      priority: "low"
    },
    {
      id: 4,
      studentName: "Phạm Thị D",
      className: "10A1",
      subject: "Lịch sử",
      time: "14:00 - 15:00",
      status: "Vắng mặt",
      reason: "Chưa rõ lý do",
      priority: "high"
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA726';
      case 'low': return '#66BB6A';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Vắng mặt': return 'close-circle';
      case 'Đi muộn': return 'time';
      case 'Nghỉ học': return 'calendar';
      default: return 'help-circle';
    }
  };

  const handleNotificationPress = (notification) => {
    Alert.alert(
      'Chi tiết thông báo',
      `Học sinh: ${notification.studentName}\nLớp: ${notification.className}\nMôn học: ${notification.subject}\nThời gian: ${notification.time}\nTrạng thái: ${notification.status}\nLý do: ${notification.reason}`,
      [{ text: 'Đóng', style: 'default' }]
    );
  };

  const getTodayDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('vi-VN', options);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="dashboard" size={30} color="#fff" />
          <Text style={styles.headerTitle}>Bảng Thông Báo</Text>
        </View>
        <Text style={styles.dateText}>{getTodayDate()}</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <MaterialIcons name="people" size={24} color="#FF6B6B" />
          <Text style={styles.summaryNumber}>4/36</Text>
          <Text style={styles.summaryLabel}>Học sinh</Text>
        </View>
        <View style={styles.summaryCard}>
          <MaterialIcons name="class" size={24} color="#FFA726" />
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>Tiết học hôm nay</Text>
        </View>
        <View style={styles.summaryCard}>
          <MaterialIcons name="analytics" size={24} color="#66BB6A" />
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>Báo cáo</Text>
        </View>
      </View>

      {/* Notifications List */}
      <View style={styles.notificationsContainer}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="notifications" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Thông báo tiết học hôm nay</Text>
        </View>
        
        <ScrollView style={styles.notificationsList}>
          {todayClasses.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[styles.notificationCard, { borderLeftColor: getPriorityColor(notification.priority) }]}
              onPress={() => handleNotificationPress(notification)}
            >
              <View style={styles.notificationHeader}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{notification.studentName}</Text>
                  <Text style={styles.className}>{notification.className}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Ionicons 
                    name={getStatusIcon(notification.status)} 
                    size={20} 
                    color={getPriorityColor(notification.priority)} 
                  />
                  <Text style={[styles.statusText, { color: getPriorityColor(notification.priority) }]}>
                    {notification.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.notificationDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="book" size={16} color="#666" />
                  <Text style={styles.detailText}>{notification.subject}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="schedule" size={16} color="#666" />
                  <Text style={styles.detailText}>{notification.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="info" size={16} color="#666" />
                  <Text style={styles.detailText}>{notification.reason}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: -15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  notificationsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  notificationsList: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  className: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  notificationDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default Dashboard;