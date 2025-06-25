import React, { useState } from "react";
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
// Dữ liệu mẫu
const lesson = {
  subject: "MGT 101 - Organization Management",
  time: "09:10 - 10:00",
  room: "Room 101",
};
const students = [
  { id: 1, name: "Nguyen Van A" },
  { id: 2, name: "Tran Thi B" },
  { id: 3, name: "Le Van C" },
  { id: 4, name: "Pham Thi D" },
  { id: 5, name: "Nguyen Van A" },
  { id: 6, name: "Tran Thi B" },
  { id: 7, name: "Le Van C" },
  { id: 8, name: "Pham Thi D" },
  { id: 9, name: "Nguyen Van A" },
  { id: 10, name: "Tran Thi B" },
  { id: 11, name: "Le Van C" },
  { id: 12, name: "Pham Thi D" },
  { id: 13, name: "Nguyen Van A" },
  { id: 14, name: "Tran Thi B" },
  { id: 15, name: "Le Van C" },
  { id: 16, name: "Pham Thi D" },
];
const {primary, active} = Colors;
const Attendance = () => {
  const [attendance, setAttendance] = useState({});

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    // Xử lý lưu điểm danh
    alert("Đã lưu điểm danh!");
  };
  const handleCancel = () => {
    // Xử lý hủy
    setAttendance({});
  };

  return (
    <ContainerAttendance>
      <HeaderContainer>
        <HeaderRow>
          <BackButton>
            <Ionicons name="arrow-back" size={28} color={primary} />
          </BackButton>
          <HeaderTitle>Điểm danh</HeaderTitle>
        </HeaderRow>
        <LessonInfo>
          <LessonRow>
            <LessonIcon>
              <Ionicons name="book" size={20} color={active} />
            </LessonIcon>
            <LessonText>Môn: {lesson.subject}</LessonText>
          </LessonRow>
          <LessonRow>
            <LessonIcon>
              <Ionicons name="time" size={20} color={active} />
            </LessonIcon>
            <LessonText>Thời gian: {lesson.time}</LessonText>
          </LessonRow>
          <LessonRow>
            <LessonIcon>
              <Ionicons name="location" size={20} color={active} />
            </LessonIcon>
            <LessonText>Phòng: {lesson.room}</LessonText>
          </LessonRow>
        </LessonInfo>
      </HeaderContainer>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <StudentList>
          {students.map((student) => {
            const status = attendance[student.id] || 'absent';
            let btnProps = {};
            let icon = 'close-circle-outline';
            let text = 'Vắng';
            let iconColor = '#888';
            let btnStyle = {};
            if (status === 'present') {
              btnProps.present = true;
              icon = 'checkmark-circle';
              text = 'Có mặt';
              iconColor = '#fff';
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
              <StudentCard key={student.id}>
                <StudentName>{student.name}</StudentName>
                <AttendanceButton
                  {...btnProps}
                  onPress={() => setAttendance(prev => ({ ...prev, [student.id]: nextStatus }))}
                  activeOpacity={0.8}
                  style={btnStyle}
                >
                  <Ionicons name={icon} size={20} color={iconColor} />
                  <AttendanceButtonText {...btnProps} style={status === 'absent' ? { color: '#fff' } : {}}>
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
