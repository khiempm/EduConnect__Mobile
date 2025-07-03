import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

// Dữ liệu mẫu
const reports = [
  {
    id: "1",
    title: "Báo cáo tháng 5",
    createdAt: "2024-05-30T10:00:00Z",
    className: "10A1",
    teacher: "Nguyễn Văn A",
  },
  {
    id: "2",
    title: "Báo cáo tháng 4",
    createdAt: "2024-04-28T09:30:00Z",
    className: "10A2",
    teacher: "Nguyễn Văn A",
  },
  {
    id: "3",
    title: "Báo cáo học kỳ 1",
    createdAt: "2024-01-15T14:20:00Z",
    className: "11B1",
    teacher: "Nguyễn Văn A",
  },
];

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};
const StatusBarHeight = Constants.statusBarHeight;
const ReportHistory = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#2D9CDB" />
      </TouchableOpacity>
      <Text style={styles.header}>Lịch sử báo cáo</Text>
      {reports.map((report) => (
        <TouchableOpacity key={report.id} style={styles.card} onPress={() => navigation.navigate('ReportDetail', { report })}>
          <Text style={styles.title}>{report.title}</Text>
          <Text style={styles.info}>Thời gian tạo: {formatDate(report.createdAt)}</Text>
          <Text style={styles.info}>Lớp: {report.className}</Text>
          <Text style={styles.info}>Giáo viên chủ nhiệm: {report.teacher}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: StatusBarHeight+10,
  },
  backBtn: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    padding: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D9CDB',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  info: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
});

export default ReportHistory;
