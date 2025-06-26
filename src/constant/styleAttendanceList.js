import styled from "styled-components/native";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "./color";
import { Ionicons } from "@expo/vector-icons";

const { background, primary, black, darkLight, brand, active, green} = Colors;

export const ContainerAttendance = styled.View`
  flex: 1;
  background-color: ${background};
`;
export const HeaderContainer = styled.View`
  position: relative;
  background-color: ${brand};
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0px 2px 12px rgba(0,0,0,0.08);
  elevation: 4;
  padding-top: 36px;
  padding-bottom: 18px;
  padding-horizontal: 0px;
  margin-bottom: 8px;
`;
export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
  z-index: 2;
  padding: 4px;
`;
export const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${primary};
  text-align: center;
`;

export const LessonInfo = styled.View`
  background-color: ${primary};
  border-radius: 16px;
  padding: 18px 20px;
  margin: 16px 8px 8px 8px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.07);
  elevation: 3;
  border-width: 1px;
  border-color: ${active};
`;
export const LessonRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;
export const LessonIcon = styled.View`
  margin-right: 10px;
`;
export const LessonText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;
export const StudentList = styled.View`
  flex: 1;
  margin: 0 8px;
`;
export const StudentCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${primary};
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 12px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.06);
  elevation: 2;
`;
export const StudentName = styled.Text`
  font-size: 17px;
  color: ${black};
  font-weight: 600;
`;
export const AttendanceButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.present ? '#27AE60' : props.late ? '#FFA500' : '#F0F1F3'};
  padding: 8px 18px;
  border-radius: 20px;
  min-width: 90px;
  justify-content: center;
`;
export const AttendanceButtonText = styled.Text`
  color: ${props =>
    props.present ? '#fff' : props.late ? '#fff' : '#888'};
  font-weight: bold;
  font-size: 15px;
  margin-left: 6px;
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0 32px 0;
  background-color: #F7F9FB;
`;
export const StyledButtonShadow = styled.TouchableOpacity`
  border-radius: 22px;
  elevation: 4;
  box-shadow: 0px 4px 16px rgba(0,0,0,0.10);
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${green};
  margin-horizontal: 8px;
`;
export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #fff;
  border-radius: 22px;
  border-width: 2px;
  border-color: #bbb;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  elevation: 2;
  margin-right: 8px;
`;
export const CancelButtonText = styled.Text`
  color: #888;
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`;