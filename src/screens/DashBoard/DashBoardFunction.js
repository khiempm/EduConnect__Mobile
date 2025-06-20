import React from "react";
import { Alert } from "react-native";

export const getTodayDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString("vi-VN", options);
};

export const handleNotificationPress = (notification) => {
  Alert.alert(
    "Chi tiết thông báo",
    `Học sinh: ${notification.studentName}\nLớp: ${notification.className}\nMôn học: ${notification.subject}\nThời gian: ${notification.time}\nTrạng thái: ${notification.status}\nLý do: ${notification.reason}`,
    [{ text: "Đóng", style: "default" }]
  );
};

export const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA726';
      case 'low': return '#66BB6A';
      default: return '#9E9E9E';
    }
  };

export const getStatusIcon = (status) => {
    switch(status) {
      case 'Vắng mặt': return 'close-circle';
      case 'Đi muộn': return 'time';
      case 'Nghỉ học': return 'calendar';
      default: return 'help-circle';
    }
};