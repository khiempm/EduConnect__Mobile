import React from "react";
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

const schedules = [
  {
    startTime: "09:10 AM",
    endTime: "10:00 AM",
    subject: "MGT 101 - Organization Management",
    room: "Room 101",
    note: "Missing assignment",
    status: "now",
  },
  {
    startTime: "10:00 AM",
    endTime: "10:50 AM",
    subject: "EC 203 - Principles Macroeconomics",
    room: "Room 213",
    note: "Missing assignment",
    color: "#27AE60",
    status: "notYet",
  },
  {
    startTime: "10:10 AM",
    endTime: "11:00 AM",
    subject: "EC 202 - Principles Microeconomics",
    room: "Room 302",
    color: "#BB6BD9",
    status: "done",
  },
  {
    startTime: "11:10 AM",
    endTime: "12:00 PM",
    subject: "FN 215 - Financial Management",
    room: "Room 111",
    color: "#2D9CDB",
    status: "done",
  },
];

const TimeTable = ({ date, setShow, weekDays, setDate }) => {
  const navigation = useNavigation();
  // formatDate giữ nguyên
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
          {schedules.map((item, idx) => (
            <ScheduleBox key={idx} color={item.color} onPress={() => navigation.navigate("Attendance")}>
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
                    <ScheduleRoom>{item.room}</ScheduleRoom>
                    {item.note && (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <ScheduleBadge />
                        <ScheduleNote>{item.note}</ScheduleNote>
                      </View>
                    )}
                  </View>
                </SubjectContainer>
                {item.status === "now" && <Now>Now</Now>}
                {item.status === "notYet" && (
                  <NotYet>in {item.inMinutes}min</NotYet>
                )}
                {item.status === "done" && <Done>Done</Done>}
              </ScheduleContainer>
            </ScheduleBox>
          ))}
        </ScrollView>
      </ScheduleList>
    </ContainerTimeTable>
  );
};
export default TimeTable;
