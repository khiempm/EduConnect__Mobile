import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetcher } from "../../../api/fetcher";
import {
  ContainerAttendance,
  HeaderContainer,
  HeaderRow,
  BackButton,
  HeaderTitle,
  LessonInfo,
  LessonRow,
  LessonIcon,
  LessonText,
  StudentList,
  StudentCard,
  StudentName,
} from "../../../constant/styleAttendanceList";
import { Colors } from "../../../constant/color";
import { formatDate } from "../../../constant/formatTime";
import Loading from "../../../components/Loading";
const {primary, active, darkLight} = Colors;
const ClassDetail = ({route}) => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const {classId, className, year} = route.params;
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
    <ContainerAttendance>
      <HeaderContainer>
        <HeaderRow>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={primary} />
          </BackButton>
          <HeaderTitle>Danh sách học sinh</HeaderTitle>
        </HeaderRow>
        <LessonInfo>
          <LessonRow>
           <LessonIcon>
            <Ionicons name="school" size={20} color={active} />
           </LessonIcon>
          <LessonText>Lớp: {className}</LessonText>
        </LessonRow>
        <LessonRow>
           <LessonIcon>
            <Ionicons name="person" size={20} color={active} />
           </LessonIcon>
          <LessonText>GV chủ nhiệm:  {teacherName}</LessonText>
        </LessonRow>
        <LessonRow>
           <LessonIcon>
            <Ionicons name="calendar" size={20} color={active} />
           </LessonIcon>
          <LessonText>Năm học:  {year}</LessonText>
        </LessonRow>
      </LessonInfo>
      </HeaderContainer>
      {students.length === 0 ? <Loading visible={true} /> : (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <StudentList>
          {students.map((student, index) => (
            <StudentCard style={{flexDirection: "column", alignItems: "flex-start"}} key={index}>
              <StudentName>{student.fullName}</StudentName>
              <StudentName style={{fontSize: 12, color: darkLight}}>Ngày sinh: {formatDate(student.dateOfBirth)}</StudentName>
            </StudentCard>
          ))}
        </StudentList>
      </ScrollView>
      )}
    </ContainerAttendance>
  )
}

export default ClassDetail;
