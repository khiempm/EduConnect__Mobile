import styled from "styled-components/native";
import { View, Text, Image, TextInput } from "react-native";
import { Colors } from "./color";

const { background, active, primary, black, darkLight, brand} = Colors;

export const ContainerDashBoard = styled.View`
  flex: 1;
  background-color: ${background};
`;

export const Header = styled.View`
    background-color: ${brand};
    padding-top: 50px;
    padding-bottom: 20px;
    padding-horizontal: 20px;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${primary};
`;

export const DateText = styled.Text`
    font-size: 16px;
    color: ${primary};
    opacity: 0.9;
`;

export const SummaryContainer = styled.View`
    flex-direction: row;
    padding-horizontal: 20px;
    padding-vertical: 15px;
    background-color: ${primary};
    margin-horizontal: 15px;
    margin-top: -15px;
    border-radius: 10px;
    elevation: 3;
    shadow-color: ${primary};
    shadow-opacity: 0.1;
    shadow-radius: 4px;
`;

export const SummaryCard = styled.View`
    flex: 1;
    align-items: center;
`;

export const SummaryNumber = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${black};
    margin-top: 5px;
`;

export const SummaryLabel = styled.Text`
    font-size: 12px;
    color: ${darkLight};
    margin-top: 2px;
`;

export const NotificationsContainer = styled.View`
    flex: 1;
    padding-horizontal: 15px;
    padding-top: 20px;
`;

export const SectionHeader = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
`;

export const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${black};
    margin-left: 8px;
`; 

export const NotificationsList = styled.ScrollView`
    flex: 1;
`;

export const NotificationCard = styled.View`
    background-color: ${primary};
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    border-left-width: 4px;
    elevation: 2;
    shadow-color: ${primary};
    shadow-opacity: 0.1;
    shadow-radius: 2px;
`;

export const NotificationHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
`;

export const StudentInfo = styled.View`
    flex: 1;
`;

export const StudentName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${black};
`;

export const ClassName = styled.Text`
    font-size: 14px;
    color: ${darkLight};
    margin-top: 2px;
`;

export const StatusContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const StatusText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 4px;
`;

export const NotificationDetails = styled.View`
    gap: 8px;
`;

export const DetailRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const DetailText = styled.Text`
    font-size: 14px;
    color: ${darkLight};
    margin-left: 8px;
`;
