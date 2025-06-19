import React from "react";
import { ScrollView, View } from "react-native";
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

const days = [
  { day: "18", label: "Mon", active: true, badge: 2 },
  { day: "19", label: "Tue", badge: 1 },
  { day: "20", label: "Wed", badge: 1 },
  { day: "21", label: "Thu", badge: 3 },
  { day: "22", label: "Fri" },
  { day: "23", label: "Sat" },
  { day: "24", label: "Sun" },
];

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

const TimeTable = () => {
  return (
    <ContainerTimeTable>
      {/* Date */}
      <Header>
        <PageTitle>October 18th, 2023</PageTitle>
        {/* Days Row */}
        <DayRow>
          {days.map((d, idx) => (
            <Day key={idx}>
              <DayBox active={d.active}>
                <DayText active={d.active}>{d.day}</DayText>
                <DayLabel active={d.active}>{d.label}</DayLabel>
              </DayBox>
              {d.badge && (
                <Badge>
                  <BadgeText>{d.badge}</BadgeText>
                </Badge>
              )}
            </Day>
          ))}
        </DayRow>
      </Header>

      {/* Schedule List */}
      <ScheduleList>
        <ScrollView style={{ width: "100%" }}>
          {schedules.map((item, idx) => (
            <ScheduleBox key={idx} color={item.color}>
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
