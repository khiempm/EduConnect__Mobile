import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { StyledButton, ButtonText } from "../../../constant/style";
import { Ionicons } from "@expo/vector-icons";
import {
  ContainerAttendance,
  HeaderContainer,
  HeaderRow,
  BackButton,
  HeaderTitle,
  HeaderIcon,
  LessonInfo,
  LessonRow,
  LessonIcon,
  LessonText,
  StudentList,
  StudentCard,
  AttendanceButton,
  AttendanceButtonText,
  Footer,
  StyledButtonShadow,
  CancelButton,
  CancelButtonText,
  StudentName,
} from "../../../constant/styleAttendanceList";
import { Colors } from "../../../constant/color";
import { useNavigation } from "@react-navigation/native";
import { fetcher, postData } from "../../../api/fetcher";
// Dữ liệu mẫu

// const students = [
//   { id: 1, name: "Nguyen Van A" },
//   { id: 2, name: "Tran Thi B" },
//   { id: 3, name: "Le Van C" },
//   { id: 4, name: "Pham Thi D" },
//   { id: 5, name: "Nguyen Van A" },
//   { id: 6, name: "Tran Thi B" },
//   { id: 7, name: "Le Van C" },
//   { id: 8, name: "Pham Thi D" },
//   { id: 9, name: "Nguyen Van A" },
//   { id: 10, name: "Tran Thi B" },
//   { id: 11, name: "Le Van C" },
//   { id: 12, name: "Pham Thi D" },
//   { id: 13, name: "Nguyen Van A" },
//   { id: 14, name: "Tran Thi B" },
//   { id: 15, name: "Le Van C" },
//   { id: 16, name: "Pham Thi D" },
// ];
const {primary, active} = Colors;
const Attendance = ({route, navigation}) => {
  const {courseId, courseName, courseTime, courseEndTime, courseRoom, classId} = route.params;
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);
  // State lưu nhận xét từng học sinh
  const [studentDetails, setStudentDetails] = useState({});

  // Lắng nghe khi quay lại từ AttendanceDetail
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const params = route.params;
      if (params && params.detailStudentId) {
        setStudentDetails(prev => ({
          ...prev,
          [params.detailStudentId]: {
            note: params.detailNote || "",
            homework: params.detailHomework || "",
            focus: params.detailFocus || ""
          }
        }));
        // Xóa params để tránh lặp lại
        navigation.setParams({ detailStudentId: undefined, detailNote: undefined, detailHomework: undefined, detailFocus: undefined });
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);

  const getStudent = async () => {
    try {
      const response = await fetcher(`Classroom/${classId}/students`);
      if(response){
        setStudents(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getStudent();
    console.log(courseId);
  }, []);

  const handleSave = async () => {
    // Tạo mảng attendanceData từ students và attendance state
    const attendanceData = students.map(student => {
      const details = studentDetails[student.studentId || student.id] || {};
      return {
        atID: "",
        studentId: student.studentId || student.id,
        courseId: courseId,
        participation: attendance[student.studentId || student.id] || "absent",
        note: details.note || "",
        homework: (details.homework || "").toString(),
        focus: (details.focus || "").toString(),
      };
    });
    try {
      // Gọi API POST ở đây, ví dụ:
      console.log(attendanceData);
      const response = await postData('Attendance', attendanceData);
      if(response){
        console.log(response);
      }
      alert("Đã lưu điểm danh!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Lưu điểm danh thất bại!");
    }
  };
  const handleCancel = () => {
    // Xử lý hủy
    setAttendance({});
    navigation.goBack();
  };

  return (
    <ContainerAttendance>
      <HeaderContainer>
        <HeaderRow>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={primary} />
          </BackButton>
          <HeaderTitle>Điểm danh</HeaderTitle>
        </HeaderRow>
        <LessonInfo>
          <LessonRow>
            <LessonIcon>
              <Ionicons name="book" size={20} color={active} />
            </LessonIcon>
            <LessonText>Môn: {courseName}</LessonText>
          </LessonRow>
          <LessonRow>
            <LessonIcon>
              <Ionicons name="time" size={20} color={active} />
            </LessonIcon>
            <LessonText>Thời gian: {courseTime} - {courseEndTime}</LessonText>
          </LessonRow>
          <LessonRow>
            <LessonIcon>
              <Ionicons name="location" size={20} color={active} />
            </LessonIcon>
            <LessonText>Lớp: {courseRoom}</LessonText>
          </LessonRow>
        </LessonInfo>
      </HeaderContainer>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <StudentList>
          {students.map((student, idx) => {
            // Ưu tiên dùng student.studentId, nếu không có thì dùng student.id, nếu không có thì dùng idx
            const uniqueId = student.studentId || student.id || idx;
            const status = attendance[uniqueId] || 'absent';
            let btnProps = {};
            let icon = 'close-circle-outline';
            let text = 'Vắng';
            let iconColor = '#888';
            let btnStyle = {};
            if (status === 'present') {
              btnProps.present = true;
              icon = 'checkmark-circle';
              text = 'Có mặt';
              iconColor = primary;
            } else if (status === 'late') {
              btnProps.late = true;
              icon = 'time';
              text = 'Đi muộn';
              iconColor = '#fff';
            } else if (status === 'absent') {
              btnStyle.backgroundColor = '#e74c3c';
              iconColor = '#fff';
            }
            const nextStatus = status === 'present' ? 'late' : status === 'late' ? 'absent' : 'present';
            return (
              <StudentCard key={uniqueId} onPress={() => navigation.navigate('AttendanceDetail', {
                studentId: uniqueId,
                studentName: student.fullName,
                onSave: (data) => {
                  setStudentDetails(prev => ({
                    ...prev,
                    [data.studentId]: {
                      note: data.note,
                      homework: data.homework,
                      focus: data.focus
                    }
                  }));
                }
              })}>
                <StudentName>{student.fullName}</StudentName>
                <AttendanceButton
                  {...btnProps}
                  onPress={() => setAttendance(prev => {
                    const newState = { ...prev, [uniqueId]: nextStatus };
                    return newState;
                  })}
                  activeOpacity={0.8}
                  style={btnStyle}
                >
                  <Ionicons name={icon} size={20} color={iconColor} />
                  <AttendanceButtonText {...btnProps} style={status === 'absent' ? { color: primary } : {}}>
                    {text}
                  </AttendanceButtonText>
                </AttendanceButton>
              </StudentCard>
            );
          })}
        </StudentList>
      </ScrollView>
      <Footer>
        <StyledButtonShadow
          style={{ flex: 1, marginRight: 10 }}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Ionicons
            name="save"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <ButtonText style={{ fontSize: 18, fontWeight: "bold" }}>
            Lưu
          </ButtonText>
        </StyledButtonShadow>
        <CancelButton onPress={handleCancel} activeOpacity={0.8}>
          <Ionicons name="close-circle-outline" size={22} color="#888" />
          <CancelButtonText>Hủy</CancelButtonText>
        </CancelButton>
      </Footer>
    </ContainerAttendance>
  );
};

export default Attendance;
