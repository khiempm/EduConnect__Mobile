import { Alert } from "react-native";
import { fetcher, fetcherWithParams } from "../../api/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { compareDate, formatTime, sortByStartTimeAsc, sortByStartTimeDesc } from "../../constant/formatTime";

function mapCourseToSchedule(course) {
  return {
    startTime:formatTime(course.startTime),
    endTime: formatTime(course.endTime),
    subject: course.subjectName || "Chưa có tên môn học",
    classId: course.classId || "",
    status: course.status,
    rawStartTime: course.startTime,
    courseId: course.courseId,
  };
}

const getPresentCourse = (schedule) => {
  return schedule.filter(item => item.status === "present");
}

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
    `Học sinh: ${notification.studentName}\n
    Môn học: ${notification.courseName}\n
    Thời gian: ${notification.startTime} - ${notification.endTime}\n
    Trạng thái: ${notification.participation}\n
    Nhắc nhở: ${notification.note}\n
    Tập trung: ${notification.focus}\n
    Bài tập: ${notification.homework}`,
    [{ text: "Đóng", style: "default" }]
  );
};

export const handleTodayCourse = (notification) => {
  Alert.alert(
    "Tiết học hôm nay",
    `${notification.length > 0 ? notification.map(item => 
      `${item.subject}: ${item.startTime} - ${item.endTime} ` + `(${item.status === "present" ? "Đã điểm danh" : "Chưa điểm danh"})`
    ).join("\n") : "Hôm nay không có tiết học"}`,
    [{ text: "Đóng", style: "default" }]
  );
};

export const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Vắng mặt': return '#FF6B6B';
      case 'Đi trễ': return '#FFA726';
      default: return '#9E9E9E';
    }
  };

export const getStatusIcon = (status) => {
    switch(status) {
      case 'Vắng mặt': return 'close-circle';
      case 'Đi trễ': return 'time';
      default: return 'help-circle';
    }
};

export const getCourses = async () => {
  try{
    const classId = await AsyncStorage.getItem('classInfo');
    const response = await fetcher(`Course/class/${classId}`);
    if(response){
      const today = new Date();
      const mapped = response.map(mapCourseToSchedule);
      const presentCourses = getPresentCourse(mapped);
      const todayCourses = sortByStartTimeAsc(compareDate(mapped, today));
      const todayPresentCourses = compareDate(presentCourses, today);
      const sortedCourses = sortByStartTimeDesc(todayPresentCourses);
      const unPresentStudent = await getAttendance(sortedCourses);
      const student = await getStudent(unPresentStudent);
      return {
        listCourse: sortedCourses,
        numberOfCourse: compareDate(mapped, today).length,
        todayCourse: todayCourses,
        listUnPresentStudent: student,
        classId: classId
      }; 
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách môn học:', error);
  }
};

export const getClassName = async () => {
  const classId = await AsyncStorage.getItem('classInfo');
  const response = await fetcherWithParams("Classroom",{classId: classId});
  if(response){
    return response.className;
  }
}

const getAttendance = async (courses) => {
  try{
    const listStudentUnPresent = await Promise.all(
      courses.map(async (course) => {
       const response = await fetcher(`Attendance/course/${course.courseId}`);
        if(response){
          return response.map(item => {
            return {
              id: item.atID,
              studentId: item.studentId,
              courseId: course.courseId,
              participation: item.participation,
              note: item.note,
              homework: item.homework,
              focus: item.focus,
              courseName: course.subject,
              startTime: course.startTime,
              endTime: course.endTime
            }
          });
        }else{
          console.log("Lỗi khi lấy danh sách học sinh vắng mặt:", error);
        }
      })
    );
    const unPresentStudent = listStudentUnPresent.flat().filter(item => item.participation !== 'Có mặt');
    return unPresentStudent;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách học sinh vắng mặt:', error);
  }
}

const getStudent = async (list) => {
  try{
    const classId = await AsyncStorage.getItem('classInfo');
    const response = await fetcher(`Classroom/${classId}/students`);
    if(response){
      const studentInfo = list.map(item => {
        const student = response.find(student => student.studentId === item.studentId);
        return {
          id: item.id,
          studentId: item.studentId,
          courseId: item.courseId,
          participation: item.participation,
          note: item.note,
          homework: item.homework,
          focus: item.focus,
          studentName: student.fullName,
          courseName: item.courseName,
          startTime: item.startTime,
          endTime: item.endTime
        };
      });
      return studentInfo;
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách học sinh:', error);
  }
}

export const getNumberOfStudent = async () => {
  try {
    const classId = await AsyncStorage.getItem('classInfo');
    const response = await fetcher(`Classroom/${classId}/students`);
    if(response){
      return response.length.toString();
    }
  } catch (error) {
    console.error('Lỗi khi lấy số lượng học sinh:', error);
  }
}

export const getTodayStudent = async (courseId) => {
  try {
    const response = await fetcher(`Attendance/course/${courseId}`);
    if(response){
      const presentStudent = response.filter(item => item.participation === 'Có mặt');
      const number = presentStudent.length;
      return number.toString();
    }
  } catch (error) {
    console.error('Lỗi khi lấy số lượng học sinh:', error);
  }
}
