import { useEffect, useState } from "react";
import { postData, fetcher, deleteData, putData } from "../../api/fetcher";

export const useAttendance = (route, navigation) => {
  const {courseId, courseName, courseTime, courseEndTime, courseRoom, classId} = route.params;
  const [students, setStudents] = useState([]);
  const [existAttendance, setExistAttendance] = useState(false);
  useEffect(() => {
    const loadStudents = async () => {
      const existAttendance = await getExistAttendance(courseId);
      if (existAttendance && existAttendance.length > 0) {
        // Lưu trạng thái attendance và chi tiết học sinh
        const attendanceObj = {};
        const detailsObj = {};
        setExistAttendance(true);
        existAttendance.forEach(item => {
          attendanceObj[item.studentId] = 
            item.participation === "Có mặt" ? "present" :
            item.participation === "Đi trễ" ? "late" : "absent";
          
          detailsObj[item.studentId] = {
            note: item.note || "",
            homework: item.homework || "",
            focus: item.focus || ""
          };
        });
        
        // Lấy danh sách học sinh và gán trạng thái attendance
        const studentsData = await getStudent(classId);
        const studentsDataWithAttendance = studentsData.map(student => ({
          ...student,
          participation: attendanceObj[student.studentId] || "absent",
          note: detailsObj[student.studentId].note || "",
          homework: detailsObj[student.studentId].homework || "",
          focus: detailsObj[student.studentId].focus || ""
        }));
        setStudents(studentsDataWithAttendance);
      } else {
        const studentsData = await getStudent(classId);
        setStudents(studentsData);
      }
    };
    loadStudents();
  }, [classId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const params = route.params;
      if (params && params.detailStudentId) {
        setStudents(prev => 
          prev.map(student => 
            student.studentId === params.detailStudentId 
              ? { 
                  ...student, 
                  note: params.detailNote || "",
                  homework: params.detailHomework || "",
                  focus: params.detailFocus || ""
                }
              : student
          )
        );

        navigation.setParams({ 
          detailStudentId: undefined, 
          detailNote: undefined, 
          detailHomework: undefined, 
          detailFocus: undefined 
        });
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);


  const getStudent = async (classId) => {
    try {
      const response = await fetcher(`Classroom/${classId}/students`);
      if(response){
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getExistAttendance = async (courseId) => {
    try {
      const response = await fetcher(`Attendance/course/${courseId}`);
      if(response){
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async () => {
    if(existAttendance){
      const response = await deleteData(`Attendance/course/${courseId}`);
      if(response){
        console.log(response);
      } else {
        console.log("Delete attendance failed");
      }
    }
    const attendanceData = students.map(student => {
      let participationStatus = student.participation || "absent";
      let participation = "Vắng mặt";
      if (participationStatus === "present") participation = "Có mặt";
      else if (participationStatus === "late") participation = "Đi trễ";
      return {
        atID: "",
        studentId: student.studentId,
        courseId: courseId,
        participation: participation,
        note: student.note || "",
        homework: student.homework || "",
        focus: student.focus || "",
      };
    });
    try {
      const response = await postData('Attendance', attendanceData);
      if(response){
        const status = await putData('Course/status', {
          courseId: courseId,
          status: "present"
        });
        if(status){
          console.log("cập nhật trạng thái điểm danh thành công!");
        }
      }
      alert("Đã lưu điểm danh!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Lưu điểm danh thất bại!");
    }
  };

  const handleCancel = () => {
    setStudents([]);
    navigation.goBack();
  };

  const handleAttendanceChange = (studentId, nextStatus) => {
    setStudents(prev => 
      prev.map(student => 
        student.studentId === studentId 
          ? { ...student, participation: nextStatus }
          : student
      )
    );
  };

  const handleStudentDetailSave = (data) => {
    setStudents(prev => 
      prev.map(student => 
        student.studentId === data.studentId 
          ? { 
              ...student, 
              note: data.note,
              homework: data.homework,
              focus: data.focus
            }
          : student
      )
    );
  };

  const getAttendanceStatus = (studentId) => {
    return students.find(student => student.studentId === studentId)?.participation || 'absent';
  };

  const getAttendanceButtonProps = (status) => {
    let btnProps = {};
    let icon = 'close-circle-outline';
    let text = 'Vắng';
    let iconColor = '#888';
    let btnStyle = {};

    if (status === 'present') {
      btnProps.present = true;
      icon = 'checkmark-circle';
      text = 'Có mặt';
      iconColor = '#fff';
    } else if (status === 'late') {
      btnProps.late = true;
      icon = 'time';
      text = 'Đi muộn';
      iconColor = '#fff';
    } else if (status === 'absent') {
      btnStyle.backgroundColor = '#e74c3c';
      iconColor = '#fff';
    }

    return { btnProps, icon, text, iconColor, btnStyle };
  };

  const getNextStatus = (currentStatus) => {
    return currentStatus === 'present' ? 'late' : currentStatus === 'late' ? 'absent' : 'present';
  };

  return {
    // State
    students,
    courseId,
    courseName,
    courseTime,
    courseEndTime,
    courseRoom,
    classId,
    
    // Functions
    handleSave,
    handleCancel,
    handleAttendanceChange,
    handleStudentDetailSave,
    getAttendanceStatus,
    getAttendanceButtonProps,
    getNextStatus
  };
}; 