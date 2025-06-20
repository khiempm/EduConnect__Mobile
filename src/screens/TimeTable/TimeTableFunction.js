import React from "react";
import TimeTable from "./TimeTable";
import DateTimePicker from "@react-native-community/datetimepicker";

const getWeekDays = (date) => {
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
  const week = [];
  const dayLabels = ["Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "CN"];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push({
      day: d.getDate().toString(),
      label: dayLabels[i],
      dateObj: d,
      active: d.toDateString() === date.toDateString(),
    });
  }
  return week;
};

const TimeTableContainer = () => {
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const weekDays = getWeekDays(date);

  return (
    <>
      <TimeTable
        date={date}
        setShow={setShow}
        weekDays={weekDays}
        setDate={setDate}
        show={show}
        onChange={onChange}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date(2100, 11, 31)}
        />
      )}
    </>
  );
};

export default TimeTableContainer;