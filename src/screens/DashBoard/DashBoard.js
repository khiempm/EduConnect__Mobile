import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  getTodayDate,
  handleNotificationPress,
  getPriorityColor,
  getStatusIcon,
} from "./DashBoardFunction";
import {
  ContainerDashBoard,
  Header,
  HeaderContent,
  HeaderTitle,
  DateText,
  SummaryContainer,
  SummaryCard,
  SummaryNumber,
  SummaryLabel,
  NotificationsContainer,
  SectionHeader,
  SectionTitle,
  NotificationsList,
  NotificationCard,
  NotificationHeader,
  StudentInfo,
  StudentName,
  ClassName,
  StatusContainer,
  DetailRow,
  DetailText,
  StatusText,
  NotificationDetails
} from "../../constant/styleDashBoard";
const Dashboard = () => {
  // Dữ liệu mẫu về tiết học của học sinh trong ngày
  const todayClasses = [
    {
      id: 1,
      studentName: "Nguyễn Văn A",
      className: "10A1",
      subject: "Toán học",
      time: "08:00 - 09:00",
      status: "Vắng mặt",
      reason: "Bị ốm",
      priority: "high",
    },
    {
      id: 2,
      studentName: "Trần Thị B",
      className: "10A1",
      subject: "Văn học",
      time: "09:00 - 10:00",
      status: "Đi muộn",
      reason: "Tắc đường",
      priority: "medium",
    },
    {
      id: 3,
      studentName: "Lê Văn C",
      className: "10A2",
      subject: "Tiếng Anh",
      time: "10:00 - 11:00",
      status: "Nghỉ học",
      reason: "Có việc gia đình",
      priority: "low",
    },
    {
      id: 4,
      studentName: "Phạm Thị D",
      className: "10A1",
      subject: "Lịch sử",
      time: "14:00 - 15:00",
      status: "Vắng mặt",
      reason: "Chưa rõ lý do",
      priority: "high",
    },
  ];

  return (
    <ContainerDashBoard>
      {/* Header */}
      <Header>
        <HeaderContent>
          <MaterialIcons name="dashboard" size={30} color="#fff" />
          <HeaderTitle>Bảng Thông Báo</HeaderTitle>
        </HeaderContent>
        <DateText>{getTodayDate()}</DateText>
      </Header>

      {/* Summary Cards */}
      <SummaryContainer style={{ shadowOffset: { width: 0, height: 2 } }}>
        <SummaryCard>
          <MaterialIcons name="people" size={24} color="#FF6B6B" />
          <SummaryNumber>4/36</SummaryNumber>
          <SummaryLabel>Học sinh</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <MaterialIcons name="class" size={24} color="#FFA726" />
          <SummaryNumber>2</SummaryNumber>
          <SummaryLabel>Tiết học hôm nay</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <MaterialIcons name="analytics" size={24} color="#66BB6A" />
          <SummaryNumber>2</SummaryNumber>
          <SummaryLabel>Báo cáo</SummaryLabel>
        </SummaryCard>
      </SummaryContainer>

      {/* Notifications List */}
      <NotificationsContainer>
        <SectionHeader>
          <MaterialIcons name="notifications" size={20} color="#333" />
          <SectionTitle>Thông báo tiết học hôm nay</SectionTitle>
        </SectionHeader>
        
        <NotificationsList>
          {todayClasses.map((notification) => (
            <NotificationCard
              style = {{shadowOffset: { width: 0, height: 1 }, borderLeftColor: getPriorityColor(notification.priority) }}
              key={notification.id}
              onPress={() => handleNotificationPress(notification)}
            >
              <NotificationHeader>
                <StudentInfo>
                  <StudentName>{notification.studentName}</StudentName>
                  <ClassName>{notification.className}</ClassName>
                </StudentInfo>
                <StatusContainer>
                  <Ionicons 
                    name={getStatusIcon(notification.status)} 
                    size={20} 
                    color={getPriorityColor(notification.priority)} 
                  />
                  <StatusText style={{ color: getPriorityColor(notification.priority) }}>
                    {notification.status}
                  </StatusText>
                </StatusContainer>
              </NotificationHeader>
              
              <NotificationDetails>
                <DetailRow>
                  <MaterialIcons name="book" size={16} color="#666" />
                  <DetailText>{notification.subject}</DetailText>
                </DetailRow>
                <DetailRow>
                  <MaterialIcons name="schedule" size={16} color="#666" />
                  <DetailText>{notification.time}</DetailText>
                </DetailRow>
                <DetailRow>
                  <MaterialIcons name="info" size={16} color="#666" />
                  <DetailText>{notification.reason}</DetailText>
                </DetailRow>
              </NotificationDetails>
            </NotificationCard>
          ))}
        </NotificationsList>
      </NotificationsContainer>
    </ContainerDashBoard>
  );
};

export default Dashboard;
