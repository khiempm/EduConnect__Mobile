import React, { useCallback, useState } from "react";
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
  ScheduleDoneBadge,
} from "../../constant/styleTimeTable";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fetcher, fetcherWithParams } from "../../api/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { compareDate, formatDate, formatTime, sortByStartTimeAsc } from "../../constant/formatTime";
import Loading from "../../components/Loading";

//chuyển đổi định dạng
function mapCourseToSchedule(course) {
  return {
    startTime: formatTime(course.startTime),
    endTime: formatTime(course.endTime),
    rawStartTime: course.startTime,
    rawEndTime: course.endTime,
    subject: course.subjectName || "No subject",
    classId: course.classId || "",
    color: "#2D9CDB",
    status: course.status,
    courseId: course.courseId,
  };
}

const TimeTable = ({ date, setShow, weekDays, setDate }) => {
  const [schedules, setSchedules] = useState([]);
  const navigation = useNavigation();
  const filteredSchedules = sortByStartTimeAsc(compareDate(schedules, date));
  const countPresent = (startTime, endTime)=>{
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    if(end < start){
      end.setDate(end.getDate() + 1);
    }
    if(now < start){
      const diffMs = start - now;
      const diffMin = Math.ceil(diffMs / 60000);
      if(diffMin > 60){
        return `early`;
      }
      return diffMin;
    }
    if(now >= start && now <= end){
      return "now";
    }
      return "end";
  }

  const getCourse = async () => {
    try {
      const teacherId = await AsyncStorage.getItem("teacherId");
      const response = await fetcher(`Course/teacher/${teacherId}`);
      if (response) {
        const mapped = response.map(mapCourseToSchedule);
        const classIds = [...new Set(mapped.map(item => item.classId))];
        const classInfoList = await Promise.all(
          classIds.map(async classId => {
            if (!classId) return { classId, className: "" };
            try {
              const res = await fetcherWithParams("Classroom",{classId: classId});
              return { classId, className: res?.className || "" };
            } catch {
              return { classId, className: "" };
            }
          })
        );
        // Tạo map classId sang className
        const classIdToName = {};
        classInfoList.forEach(({ classId, className }) => {
          classIdToName[classId] = className;
        });
        // Gán className vào từng schedule
        const mappedWithClassName = mapped.map(item => ({
          ...item,
          className: classIdToName[item.classId] || "",
        }));

        setSchedules(mappedWithClassName);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      getCourse();
    }, [])
  );

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
      {schedules.length > 0 ? (
      <ScheduleList>
        <ScrollView style={{ width: "100%" }}>
          { filteredSchedules.map((item, idx) => (
              <ScheduleBox key={idx} color={item.color} onPress={() => navigation.navigate("Attendance",{
                courseId: item.courseId,
                courseName: item.subject,
                courseTime: item.startTime,
                courseEndTime: item.endTime,
                courseRoom: item.className,
                classId: item.classId,
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
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {item.status === "present" ? <ScheduleDoneBadge /> : <ScheduleBadge />}
                          {item.status === "present" ?<ScheduleNote style={{color: "green"}}>đã điểm danh</ScheduleNote> : <ScheduleNote style={{color: "red"}}>Chưa điểm danh</ScheduleNote>}
                        </View>
                    </View>
                  </SubjectContainer>
                  {(() => {
                    const status = countPresent(item.rawStartTime, item.rawEndTime);
                    if(status === "early"){
                      return <NotYet>Sắp diễn ra</NotYet>
                    } else if(status === "now"){
                      return <Now>Đang diễn ra</Now>
                    } else if(status === "end"){
                      return <Done>Đã kết thúc</Done>
                    }else{
                      return <NotYet>Còn {status} phút</NotYet>
                    }
                  })()}
                </ScheduleContainer>
              </ScheduleBox>
            ))}
        </ScrollView>
      </ScheduleList>
      ):<Loading visible={true} />}
    </ContainerTimeTable>
  );
};
export default TimeTable;
