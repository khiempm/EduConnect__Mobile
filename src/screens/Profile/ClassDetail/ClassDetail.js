import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetcher } from "../../../api/fetcher";

const StatusBarHeight = Constants.statusBarHeight;


const ClassDetail = ({route}) => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const {classId, className} = route.params;
  const getStudent = async (classId) => {
    try {
        const teacherName = await AsyncStorage.getItem("teacherName");
        setTeacherName(teacherName);
        const response = await fetcher(`Classroom/${classId}/students`);
        if(response){
            setStudents(response);
        }
    } catch (error) {
        console.log(error);
    }
}
  useEffect(() => {
    getStudent(classId);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#2D9CDB" />
      </TouchableOpacity>
      <View style={styles.headerBox}>
        <Text style={styles.className}>Lớp: {className}</Text>
        <Text style={styles.teacher}>Giáo viên chủ nhiệm: {teacherName}</Text>
      </View>
      <Text style={styles.sectionTitle}>Danh sách học sinh</Text>
      <View style={styles.studentList}>
        {students.map((student, idx) => (
          <View key={student.id || idx} style={styles.studentCard}>
            <Text style={styles.studentName}>{student.fullName}</Text>
            <Text style={styles.studentInfo}>Ngày sinh: {student.dateOfBirth}</Text>
          </View>
        ))}
      </View>
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
  headerBox: {
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  className: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 6,
  },
  teacher: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 8,
    marginTop: 10,
  },
  studentList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  studentCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  studentInfo: {
    fontSize: 14,
    color: '#555',
  },
});

export default ClassDetail;
