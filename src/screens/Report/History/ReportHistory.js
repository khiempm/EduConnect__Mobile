import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import {HeaderTitle, BackButton } from "../../../constant/styleAttendanceList";
import { Colors } from "../../../constant/color";
import { useReportHistory } from "./useReportHistory";
const { brand } = Colors;

const StatusBarHeight = Constants.statusBarHeight;
const ReportHistory = () => {
  const navigation = useNavigation();
  const { listReports, getListReport } = useReportHistory();

  useEffect(() => {
    getListReport();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View>
      <BackButton style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={brand} />
      </BackButton>
      <HeaderTitle style={styles.header}>Lịch sử báo cáo</HeaderTitle>
      </View>
      {listReports.map((report) => (
        <TouchableOpacity key={report.reportId} style={styles.card} onPress={() => navigation.navigate('ReportDetail', { report })}>
          <Text style={styles.title}>{report.title}</Text>
          <Text style={styles.info}>Lớp: {report.className}</Text>
          <Text style={styles.info}>Giáo viên chủ nhiệm: {report.teacherName}</Text>
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
    color: brand,
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
