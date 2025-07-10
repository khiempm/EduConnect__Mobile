import Constants from "expo-constants";
import styled from "styled-components/native";
import { View, Text, Image, TextInput } from "react-native";
import { Colors } from "./color";

const { background, active, primary, black, red ,secondary, darkLight, brand, green} = Colors;
const StatusBarHeight = Constants.statusBarHeight;
// EduConnect_Mobile/constant/style.js
export const ContainerTimeTable = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight}px;
`;

export const Header = styled.View`
  flex-direction: column;
  justify-content: center;
  background-color: ${background};
  gap: 10px;
  align-items: center;
  padding-bottom: 15px;
`;

export const DayBox = styled.TouchableOpacity`
  background-color: ${props => props.active ? active : primary};
  border-radius: 10px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  min-width: 44px;
  align-items: center;
  min-height: 60px;
`;

export const DayRow = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  gap: 10px;
`;

export const Day = styled.View`
  align-items: center;
`;

export const DayText = styled.Text`
  color: ${props => props.active ? primary : black};
  font-weight: bold;
  font-size: 16px;
`;

export const DayLabel = styled.Text`
  color: ${props => props.active ? background : black};
  font-size: 12px;
`;

export const Badge = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${red};
  border-radius: 8px;
  padding-horizontal: 4px;
  min-width: 16px;
  align-items: center;
`;

export const BadgeText = styled.Text`
  color: ${primary};
  font-size: 10px;
`;

export const ScheduleList = styled.View`
  flex: 1;
  padding-vertical: 20px;
  padding-horizontal: 15px;
  background-color: ${primary};
`;

export const ScheduleBox = styled.TouchableOpacity`
  background-color: ${secondary};
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 14px;
  border-left-width: 4px;
  border-left-color: ${props => props.color || brand};
  position: relative;
`;

export const ScheduleContainer = styled.View`
  flex-direction: row;
  margin-bottom: 2px;
`;

export const ScheduleTimeContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: 2px;
  gap: 20px;
  border-right-width: 1px;
  margin-right: 10px;  
`;

export const ScheduleTime = styled.Text`
  font-weight: bold;
  font-size: 16px;
  width: 80px;
`;

export const SubjectContainer = styled.View`
  flex-direction: column;
  gap: 5px ;
  flex: 1;
`;

export const ScheduleSubject = styled.Text`
  font-weight: bold;
  font-size: 15px;
  flex: 1;
  color: ${props => props.color || brand};
`;

export const ScheduleRoom = styled.Text`
  color: ${brand};
  font-size: 13px;
  margin-right: 10px;
`;

export const ScheduleNote = styled.Text`
  color: ${red};
  font-size: 12px;
`;

export const ScheduleBadge = styled.View`
width: 8px;
height: 8px;
border-radius: 4px;
background-color: ${red};
margin-right: 4px;
`;

export const Now = styled.Text`
  color: ${active};
  font-weight: bold;
  font-size: 12px;
  margin-left: 8px;
`;

export const NotYet = styled.Text`
  color: ${green};
  font-weight: bold;
  font-size: 12px;
  margin-left: 8px;
`;
export const Done = styled.Text`
  color: ${red};
  font-weight: bold;
  font-size: 12px;
  margin-left: 8px;
`;