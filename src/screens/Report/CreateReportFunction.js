import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetcher, fetcherWithParams, postData } from "../../api/fetcher";
import { formatDate, formatMonth } from "../../constant/formatTime";

export const generateReport = async (reportData) => {
  try {
    const response = await postData('Term', reportData);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

export const getReportTypes = () => {
  return [
    { id: 'Tuần', title: 'Theo Tuần', icon: 'calendar-outline', description: 'Báo cáo theo tuần học' },
    { id: 'Tháng', title: 'Theo Tháng', icon: 'calendar', description: 'Báo cáo theo tháng' },
    { id: 'Kì', title: 'Theo Kỳ', icon: 'school-outline', description: 'Báo cáo theo học kỳ' },
    { id: 'Năm', title: 'Theo Năm', icon: 'calendar-clear-outline', description: 'Báo cáo theo năm học' }
  ];
};

// Hardcoded data - replace with your API calls later
export const getSemesters = () => {
  return [
    { 
      id: '1', 
      name: 'Học kỳ 1 - Năm học 2024-2025', 
      isCurrent: true
    },
    { 
      id: '2', 
      name: 'Học kỳ 2 - Năm học 2024-2025', 
      isCurrent: false
    },
    { 
      id: '3', 
      name: 'Học kỳ 1 - Năm học 2023-2024', 
      isCurrent: false
    },
    { 
      id: '4', 
      name: 'Học kỳ 2 - Năm học 2023-2024', 
      isCurrent: false
    },
  ];
};

export const getAcademicYears =  async() => {
  try {
    const classId = await AsyncStorage.getItem('classInfo')
    const classInfo = await fetcherWithParams("Classroom",{classId: classId})
    if(classInfo){
      const schoolYear = await fetcher(`SchoolYear/${classInfo.schoolYearId}`)
      const startYear = new Date(schoolYear.startDate)
      const endYear = new Date(schoolYear.endDate)
      endYear.setUTCHours(23, 59, 59, 999)
      return [{
        id: schoolYear.schoolYearId,
        label: 'Năm học ' + startYear.getFullYear() + '-' + endYear.getFullYear(),
        isCurrent: schoolYear.status,
        value: startYear.getFullYear() + '-' + endYear.getFullYear(),
        startDate: startYear,
        endDate: endYear
      }]
    }
  } catch (error) {
    console.log(error)
  }
};


export const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
  return new Date(d.setDate(diff));
};

export const getWeekEnd = (date) => {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return weekEnd;
};

export const getMonthStart = (date) => {
  const d = new Date(date);
  d.setDate(1);
  return d;
};

export const getMonthEnd = (date) => {
  const monthStart = getMonthStart(date);
  const monthEnd = new Date(monthStart);
  monthEnd.setMonth(monthStart.getMonth() + 1);
  monthEnd.setDate(monthStart.getDate()-1);
  monthEnd.setUTCHours(23, 59, 59, 999);
  return monthEnd;
};

export const validateReportData = (reportData) => {
  const { type } = reportData;
  
  if (!type) {
    return { isValid: false, message: 'Vui lòng chọn loại báo cáo' };
  }

  switch (type) {
    case 'Tuần':
      if (!reportData.date) {
        return { isValid: false, message: 'Vui lòng chọn ngày cho báo cáo tuần' };
      }
      break;
    case 'Tháng':
      if (!reportData.month) {
        return { isValid: false, message: 'Vui lòng chọn tháng cho báo cáo' };
      }
      break;
    case 'Kì':
      if (!reportData.semester) {
        return { isValid: false, message: 'Vui lòng chọn học kỳ' };
      }
      break;
    case 'Năm':
      if (!reportData.year) {
        return { isValid: false, message: 'Vui lòng chọn năm học' };
      }
      break;
  }

  return { isValid: true, message: '' };
};

export const getReportPreview = (reportData) => {
  const { type, date, month, semester, year } = reportData;
  
  switch (type) {
    case 'Tuần':
      const weekStart = getWeekStart(date);
      const weekEnd = getWeekEnd(date);
      return `Báo cáo tuần từ ${formatDate(weekStart)} đến ${formatDate(weekEnd)}`;
    
    case 'Tháng':
      return `Báo cáo tháng ${formatMonth(month)}`;
    
    case 'Kì':
      return `Báo cáo ${semester}`;
    
    case 'Năm':
      return `Báo cáo ${year}`;
    
    default:
      return 'Báo cáo';
  }
}; 