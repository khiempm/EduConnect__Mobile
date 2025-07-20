import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  getTodayDate,
  handleNotificationPress,
  getPriorityColor,
  getStatusIcon,
  getCourses,
  getClassName,
  getNumberOfStudent,
  getTodayStudent,
  handleTodayCourse,
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
import { useReportHistory } from '../History/useReportHistory';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';


// interface student [{ 
//   id: string,
//   studentId: string,
//   courseId: string,
//   participation: string,
//   note: string,
//   homework: string,
//   focus: string,
//   studentName: string,
//   courseName: string,
//   startTime: string,
//   endTime: string
// }]


const Dashboard = () => {
  const navigation = useNavigation();
  const [numberOfTodayCourse, setNumberOfTodayCourse] = useState(0);
  const [student, setStudent] = useState([]);
  const [className, setClassName] = useState('');
  const [numberPresent, setNumberPresent] = useState("0");
  const [numberStudent, setNumberStudent] = useState("");
  const [todayCourse, setTodayCourse] = useState([]);
  const { listReports } = useReportHistory();
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const course = await getCourses();
        const {listCourse, numberOfCourse, listUnPresentStudent, todayCourse} = course;
        const className = await getClassName();
        const numberOfStudent = await getNumberOfStudent();
        setNumberStudent(numberOfStudent);
        setStudent(listUnPresentStudent);
        setNumberOfTodayCourse(numberOfCourse);
        setClassName(className);
        setTodayCourse(todayCourse);
        const numberOfPresentStudent = await getTodayStudent(listCourse[0].courseId);
        setNumberPresent(numberOfPresentStudent)
      };
      fetchData();
    }, [])
  );
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
      {numberStudent.length === 0 ? <Loading visible={true} /> : (
      <SummaryContainer style={{ shadowOffset: { width: 0, height: 2 } }}>
        <SummaryCard onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="people" size={24} color="#FF6B6B" />
          <SummaryNumber>{numberPresent}/{numberStudent}</SummaryNumber>
          <SummaryLabel>Học sinh</SummaryLabel>
        </SummaryCard>
        <SummaryCard onPress={() => handleTodayCourse(todayCourse)}>
          <MaterialIcons name="class" size={24} color="#FFA726" />
          <SummaryNumber>{numberOfTodayCourse}</SummaryNumber>
          <SummaryLabel>Tiết học hôm nay</SummaryLabel>
        </SummaryCard>
        <SummaryCard onPress={() => navigation.navigate('ReportHistory')}>
          <MaterialIcons name="analytics" size={24} color="#66BB6A" />
          <SummaryNumber>{listReports.length}</SummaryNumber>
          <SummaryLabel>Báo cáo</SummaryLabel>
        </SummaryCard>
      </SummaryContainer>
      )}
      {/* Notifications List */}
      <NotificationsContainer>
        <SectionHeader>
          <MaterialIcons name="notifications" size={20} color="#333" />
          {student.length > 0 ? <SectionTitle>Thông báo học sinh vắng mặt hôm nay</SectionTitle> 
          : <SectionTitle>Hiện tại không có học sinh vắng mặt</SectionTitle>}
        </SectionHeader>
        
        <NotificationsList>
          {student.map((notification) => (
            <NotificationCard
              style = {{shadowOffset: { width: 0, height: 1 }, borderLeftColor: getPriorityColor(notification.participation)}}
              key={notification.id}
              onPress={() => handleNotificationPress(notification)}
            >
              <NotificationHeader>
                <StudentInfo>
                  <StudentName>{notification.studentName}</StudentName>
                  <ClassName>{className}</ClassName>
                </StudentInfo>
                <StatusContainer>
                  <Ionicons 
                    name={getStatusIcon(notification.participation)} 
                    size={20} 
                    color={getPriorityColor(notification.participation)} 
                  />
                  <StatusText style={{ color: getPriorityColor(notification.participation) }}>
                    {notification.participation}
                  </StatusText>
                </StatusContainer>
              </NotificationHeader>
              
              <NotificationDetails>
                <DetailRow>
                  <MaterialIcons name="book" size={16} color="#666" />
                  <DetailText>{notification.courseName}</DetailText>
                </DetailRow>
                <DetailRow>
                  <MaterialIcons name="schedule" size={16} color="#666" />
                  <DetailText>{notification.startTime} - {notification.endTime}</DetailText>
                </DetailRow>
                <DetailRow>
                  <MaterialIcons name="info" size={16} color="#666" />
                  <DetailText>{notification.note || 'Không có ghi chú'}</DetailText>
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
