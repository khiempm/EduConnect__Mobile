// Report generation functions and utilities

import { formatDate, formatMonth } from "../../constant/formatTime";

export const generateReport = async (reportData) => {
  try {
    // This would be your actual API call to generate the report
    const response = await fetch('YOUR_API_ENDPOINT/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
      },
      body: JSON.stringify(reportData)
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

export const getReportTypes = () => {
  return [
    { id: 'weekly', title: 'Theo Tuần', icon: 'calendar-outline', description: 'Báo cáo theo tuần học' },
    { id: 'monthly', title: 'Theo Tháng', icon: 'calendar', description: 'Báo cáo theo tháng' },
    { id: 'semester', title: 'Theo Kỳ', icon: 'school-outline', description: 'Báo cáo theo học kỳ' },
    { id: 'yearly', title: 'Theo Năm', icon: 'calendar-clear-outline', description: 'Báo cáo theo năm học' }
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

export const getAcademicYears = () => {
  return [
    {
      value: '2024-2025',
      label: 'Năm học 2024-2025',
      isCurrent: true
    },
    {
      value: '2023-2024',
      label: 'Năm học 2023-2024',
      isCurrent: false
    },
  ];
};

export const formatReportData = (reportData) => {
  const { type, date, month, semester, year } = reportData;
  
  let formattedData = {
    reportType: type,
    generatedAt: new Date().toISOString(),
    teacherId: 'CURRENT_TEACHER_ID', // This should come from your auth context
  };

  switch (type) {
    case 'weekly':
      formattedData.weekStart = getWeekStart(date);
      formattedData.weekEnd = getWeekEnd(date);
      break;
    case 'monthly':
      formattedData.month = month.getMonth() + 1;
      formattedData.year = month.getFullYear();
      break;
    case 'semester':
      formattedData.semester = semester;
      break;
    case 'yearly':
      formattedData.academicYear = year;
      break;
  }

  return formattedData;
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

export const validateReportData = (reportData) => {
  const { type } = reportData;
  
  if (!type) {
    return { isValid: false, message: 'Vui lòng chọn loại báo cáo' };
  }

  switch (type) {
    case 'weekly':
      if (!reportData.date) {
        return { isValid: false, message: 'Vui lòng chọn ngày cho báo cáo tuần' };
      }
      break;
    case 'monthly':
      if (!reportData.month) {
        return { isValid: false, message: 'Vui lòng chọn tháng cho báo cáo' };
      }
      break;
    case 'semester':
      if (!reportData.semester) {
        return { isValid: false, message: 'Vui lòng chọn học kỳ' };
      }
      break;
    case 'yearly':
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
    case 'weekly':
      const weekStart = getWeekStart(date);
      const weekEnd = getWeekEnd(date);
      return `Báo cáo tuần từ ${formatDate(weekStart)} đến ${formatDate(weekEnd)}`;
    
    case 'monthly':
      return `Báo cáo tháng ${formatMonth(month)}`;
    
    case 'semester':
      return `Báo cáo ${semester}`;
    
    case 'yearly':
      return `Báo cáo ${year}`;
    
    default:
      return 'Báo cáo';
  }
}; 