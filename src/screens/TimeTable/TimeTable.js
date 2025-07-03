import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { PageTitle } from "../../constant/style";
import {
  ContainerTimeTable,
  DayBox,
  DayText,
  DayLabel,
  Badge,
  BadgeText,
  ScheduleList,
  ScheduleBox,
  ScheduleTime,
  ScheduleSubject,
  ScheduleTimeContainer,
  ScheduleContainer,
  Header,
  DayRow,
  Day,
  Now,
  NotYet,
  Done,
  ScheduleRoom,
  ScheduleBadge,
  ScheduleNote,
  SubjectContainer,
} from "../../constant/styleTimeTable";
import { useNavigation } from "@react-navigation/native";
import { fetcher } from "../../api/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const schedules = [
//   {
//     startTime: "09:10 AM",
//     endTime: "10:00 AM",
//     subject: "MGT 101 - Organization Management",
//     room: "Room 101",
//     note: "Missing assignment",
//     status: "now",
//   },
//   {
//     startTime: "10:00 AM",
//     endTime: "10:50 AM",
//     subject: "EC 203 - Principles Macroeconomics",
//     room: "Room 213",
//     note: "Missing assignment",
//     color: "#27AE60",
//     status: "notYet",
//   },
//   {
//     startTime: "10:10 AM",
//     endTime: "11:00 AM",
//     subject: "EC 202 - Principles Microeconomics",
//     room: "Room 302",
//     color: "#BB6BD9",
//     status: "done",
//   },
//   {
//     startTime: "11:10 AM",
//     endTime: "12:00 PM",
//     subject: "FN 215 - Financial Management",
//     room: "Room 111",
//     color: "#2D9CDB",
//     status: "done",
//   },
// ];

// Hàm chuyển đổi dữ liệu API sang định dạng UI
function mapCourseToSchedule(course) {
  // Format giờ phút từ ISO string
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = hours >= 12 ? "CH" : "SA";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${time}`;
  };

  return {
    startTime: formatTime(course.startTime),
    endTime: formatTime(course.endTime),
    subject: course.subjectName || "No subject",
    room: course.classId || "",
    note: "now",
    color: "#2D9CDB",
    status: course.status,
    rawStartTime: course.startTime,
    courseId: course.courseId,
  };
}

const TimeTable = ({ date, setShow, weekDays, setDate }) => {
  const [schedules, setSchedules] = useState([]);
  const navigation = useNavigation();
  
  const getCourse = async () => {
    try {
      const teacherId = await AsyncStorage.getItem("teacherId");
      const response = await fetcher(`Course/teacher/${teacherId}`);
      if (response) {
        // Chuyển đổi dữ liệu trước khi setSchedules
        const mapped = response.map(mapCourseToSchedule);

        // Lấy danh sách classId duy nhất
        const classIds = [...new Set(mapped.map(item => item.room))];

        // Gọi API lấy className cho từng classId
        const classInfoList = await Promise.all(
          classIds.map(async classId => {
            if (!classId) return { classId, className: "" };
            try {
              const res = await fetcher(`Classroom/${classId}`);
              return { classId, className: res?.className || "" };
            } catch {
              return { classId, className: "" };
            }
          })
        );

        // Tạo map classId -> className
        const classIdToName = {};
        classInfoList.forEach(({ classId, className }) => {
          classIdToName[classId] = className;
        });

        // Gán className vào từng schedule
        const mappedWithClassName = mapped.map(item => ({
          ...item,
          className: classIdToName[item.room] || "",
        }));

        setSchedules(mappedWithClassName);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // formatDate giữ nguyên
  useEffect(() => {
    getCourse();
  }, []);
  const formatDate = (dateObj) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString(undefined, options);
  };

  return (
    <ContainerTimeTable>
      {/* Date */}
      <Header>
        <TouchableOpacity onPress={() => setShow(true)}>
          <PageTitle>{formatDate(date)}</PageTitle>
        </TouchableOpacity>
        <DayRow>
          {weekDays.map((d, idx) => (
            <Day key={idx}>
              <DayBox active={d.active} onPress={() => setDate(d.dateObj)}>
                <DayText active={d.active}>{d.day}</DayText>
                <DayLabel active={d.active}>{d.label}</DayLabel>
              </DayBox>
            </Day>
          ))}
        </DayRow>
      </Header>

      {/* Schedule List */}
      <ScheduleList>
        <ScrollView style={{ width: "100%" }}>
          {schedules
            .filter(item => {
              const scheduleDate = new Date(item.rawStartTime);
              const selectedDate = new Date(date);
              return (
                scheduleDate.getFullYear() === selectedDate.getFullYear() &&
                scheduleDate.getMonth() === selectedDate.getMonth() &&
                scheduleDate.getDate() === selectedDate.getDate()
              );
            })
            .map((item, idx) => (
              console.log(item),
              <ScheduleBox key={idx} color={item.color} onPress={() => navigation.navigate("Attendance",{
                courseId: item.courseId,
                courseName: item.subject,
                courseTime: item.startTime,
                courseEndTime: item.endTime,
                courseRoom: item.className,
                classId: item.room,
              })}>
                <ScheduleContainer>
                  <ScheduleTimeContainer>
                    <ScheduleTime>{item.startTime}</ScheduleTime>
                    <ScheduleTime>{item.endTime}</ScheduleTime>
                  </ScheduleTimeContainer>
                  <SubjectContainer>
                    <ScheduleSubject color={item.color}>
                      {item.subject}
                    </ScheduleSubject>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <ScheduleRoom>Lớp: {item.className}</ScheduleRoom>
                      {item.note && (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <ScheduleBadge />
                          <ScheduleNote>{item.status === "unpresent" ? "Chưa điểm danh" : "đã điểm danh"}</ScheduleNote>
                        </View>
                      )}
                    </View>
                  </SubjectContainer>
                  {item.note === "now" && <Now>Đang diễn ra</Now>}
                  {item.note === "notYet" && (
                    <NotYet>in {item.inMinutes}Phút</NotYet>
                  )}
                  {item.note === "done" && <Done>Đã kết thúc</Done>}
                </ScheduleContainer>
              </ScheduleBox>
            ))}
        </ScrollView>
      </ScheduleList>
    </ContainerTimeTable>
  );
};
export default TimeTable;
