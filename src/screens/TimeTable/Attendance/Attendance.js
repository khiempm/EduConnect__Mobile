import React from "react";
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
import { useAttendance } from "./AttendanceFunction";
import Loading from "../../../components/Loading";

const {primary, active} = Colors;

const Attendance = ({route, navigation}) => {
  const {
    students,
    courseName,
    courseTime,
    courseEndTime,
    courseRoom,
    handleSave,
    handleCancel,
    handleAttendanceChange,
    handleStudentDetailSave,
    getAttendanceStatus,
    getAttendanceButtonProps,
    getNextStatus
  } = useAttendance(route, navigation);
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
      {students.length > 0 ? 
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <StudentList>
          {students.map((student) => {
            const uniqueId = student.studentId;
            const status = getAttendanceStatus(uniqueId);
            const { btnProps, icon, text, iconColor, btnStyle } = getAttendanceButtonProps(status);
            const nextStatus = getNextStatus(status);
            return (
              <StudentCard key={uniqueId} onPress={() => navigation.navigate('AttendanceDetail', {
                studentId: uniqueId,
                studentName: student.fullName,
                noteExist: student.note || "",
                homeworkExist: student.homework || "",
                focusExist: student.focus || "",
                onSave: handleStudentDetailSave
              })}>
                <StudentName>{student.fullName}</StudentName>
                <AttendanceButton
                  {...btnProps}
                  onPress={() => handleAttendanceChange(uniqueId, nextStatus)}
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
        : <Loading visible={true} />}
      <Footer>
        <StyledButtonShadow style={{ flex: 1, marginRight: 10 }} onPress={handleSave} activeOpacity={0.8}>
          <Ionicons name="save" size={22} color="#fff" style={{ marginRight: 8 }}/>
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
