import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const StatusBarHeight = Constants.statusBarHeight;
// Dữ liệu mẫu
const report = {
  id: "1",
  title: "Báo cáo tháng 5",
  type: "Tháng",
  timeRange: "01/05/2024 - 31/05/2024",
  className: "10A1",
  teacher: "Nguyễn Văn A",
  description: "Báo cáo tổng kết tình hình học tập, điểm danh và hoạt động của lớp 10A1 trong tháng 5. Lớp duy trì sĩ số tốt, các hoạt động ngoại khoá diễn ra sôi nổi, học sinh tích cực tham gia. Một số học sinh cần cải thiện ý thức học tập.",
};

const ReportDetail = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#2D9CDB" />
      </TouchableOpacity>
      <Text style={styles.title}>{report.title}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Loại báo cáo: </Text>
        <Text style={styles.value}>{report.type}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Khoảng thời gian: </Text>
        <Text style={styles.value}>{report.timeRange}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Lớp: </Text>
        <Text style={styles.value}>{report.className}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giáo viên chủ nhiệm: </Text>
        <Text style={styles.value}>{report.teacher}</Text>
      </View>
      <Text style={styles.sectionTitle}>Mô tả báo cáo</Text>
      <Text style={styles.description}>{report.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: StatusBarHeight+10, 
  },
  backBtn: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  value: {
    color: '#555',
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 18,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 6,
  },
  description: {
    color: '#444',
    fontSize: 15,
    lineHeight: 22,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
});

export default ReportDetail;
