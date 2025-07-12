import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {HeaderTitle, BackButton } from "../../../../constant/styleAttendanceList";
import { Colors } from "../../../../constant/color";
import { useReportDetail } from "./useReportDetail";
import { formatDate } from "../../../../constant/formatTime";


const StatusBarHeight = Constants.statusBarHeight;
const { brand } = Colors;

const ReportDetail = ({ route }) => {
  useEffect(() => {
    getReportDetail(report);
  }, [route]);
  const { timeDetail, loading, error, getReportDetail } = useReportDetail();
  const { report } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View>
      <BackButton style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={brand} />
      </BackButton>
      <HeaderTitle style={styles.title}>{report.title}</HeaderTitle>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Lớp: </Text>
        <Text style={styles.value}>{report.className}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giáo viên chủ nhiệm: </Text>
        <Text style={styles.value}>{report.teacherName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Loại báo cáo: </Text>
        <Text style={styles.value}>{"Chưa có dữ liệu"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày bắt đầu: </Text>
        <Text style={styles.value}>
          {loading ? "Đang tải..." : error ? "Lỗi tải dữ liệu" : timeDetail ? formatDate(timeDetail.startTime) : "Không có dữ liệu"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày kết thúc: </Text>
        <Text style={styles.value}>
          {loading ? "Đang tải..." : error ? "Lỗi tải dữ liệu" : timeDetail ? formatDate(timeDetail.endTime) : "Không có dữ liệu"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày tạo: </Text>
        <Text style={styles.value}>
          {loading ? "Đang tải..." : error ? "Lỗi tải dữ liệu" : timeDetail ? formatDate(timeDetail.createdAt) : "Không có dữ liệu"}
        </Text>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
    color: brand,
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
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ReportDetail;
