import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import {
  ReportContainer,
  ReportHeader,
  ReportTitle,
  ReportSubtitle,
  ReportTypeContainer,
  ReportTypeTitle,
  ReportTypeGrid,
  ReportTypeCard,
  ReportTypeIcon,
  ReportTypeText,
  DatePickerContainer,
  DatePickerTitle,
  DatePickerButton,
  DatePickerText,
  TimeContainer,
  TimeTitle,
  TimePicker,
  TimeText,
  GenerateButton,
  GenerateButtonText,
  InfoText,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalItem,
  ModalItemText,
  ModalItemSubText,
  ModalCloseButton,
  ModalCloseButtonText,
} from "../../constant/styleReport";
import {
  getReportTypes,
  getSemesters,
  getAcademicYears,
  generateReport,
} from "./CreateReportFunction";
import { Colors } from "../../constant/color";
import { formatDate, formatMonth } from "../../constant/formatTime";
const CreateReport = ({ navigation }) => {
  const {
    primary,
    secondary,
    tertiary,
    brand,
    darkLight,
    background,
    active,
    black,
    backgroundBrand,
  } = Colors;
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showSemesterPicker, setShowSemesterPicker] = useState(false);

  const reportTypes = getReportTypes();
  const semesters = getSemesters();

  async function years() {
    const year = await getAcademicYears();
    console.log(year);
    
    setAcademicYears(year);
  }

  useEffect(() => {
    years();
    const currentYear = academicYears.find((s) => s.isCurrent === "Actived");
    const currentSemester = semesters.find((s) => s.isCurrent);
    if (currentSemester) {
      setSelectedSemester(currentSemester.name);
    }
    if (currentYear) {
      setSelectedYear(currentYear.value);
    }
  }, []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleMonthChange = (event, date) => {
    setShowMonthPicker(false);
    if (date) {
      setSelectedMonth(date);
    }
  };

  const handleReportTypeSelect = (type) => {
    setSelectedReportType(type);
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    setShowSemesterPicker(false);
  };

  const handleAcademicYearSelect = (academicYear) => {
    setSelectedYear(academicYear.value);
    setShowYearPicker(false);
  };

  const handleGenerateReport = async () => {
    if(selectedReportType === "Năm"){
      const currentYear = academicYears.find((s) => s.value === selectedYear);
      if(currentYear){
        const result = generateReport(
          { startDate: currentYear.startDate, 
            endDate: currentYear.endDate,
            mode: selectedReportType
          })
        console.log(result);
      }
    try{
      Alert.alert("Thành công", "Báo cáo đã được tạo thành công");
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo báo cáo");
    }
  };
};

  const renderDatePicker = () => {
    if (selectedReportType !== "Tuần") return null;

    return (
      <DatePickerContainer>
        <DatePickerTitle>Chọn tuần báo cáo</DatePickerTitle>
        <DatePickerButton onPress={() => setShowDatePicker(true)}>
          <DatePickerText>{formatDate(selectedDate)}</DatePickerText>
          <Ionicons name="calendar-outline" size={24} color="#6D28D9" />
        </DatePickerButton>
      </DatePickerContainer>
    );
  };

  const renderMonthPicker = () => {
    if (selectedReportType !== "Tháng") return null;
    return (
      <DatePickerContainer>
        <DatePickerTitle>Chọn tháng báo cáo</DatePickerTitle>
        <DatePickerButton onPress={() => setShowMonthPicker(true)}>
          <DatePickerText>{formatMonth(selectedMonth)}</DatePickerText>
          <Ionicons name="calendar" size={24} color="#6D28D9" />
        </DatePickerButton>
      </DatePickerContainer>
    );
  };

  const renderSemesterPicker = () => {
    if (selectedReportType !== "Kì") return null;
    return (
      <TimeContainer>
        <TimeTitle>Chọn học kỳ</TimeTitle>
        <TimePicker onPress={() => setShowSemesterPicker(true)}>
          <TimeText>
            {selectedSemester ? selectedSemester : "Chọn học kỳ"}
          </TimeText>
          <Ionicons name="chevron-down" size={24} color={brand} />
        </TimePicker>
      </TimeContainer>
    );
  };

  const renderYearPicker = () => {
    if (selectedReportType !== "Năm") return null;
    return (
      <TimeContainer>
        <TimeTitle>Chọn năm học</TimeTitle>
        <TimePicker onPress={() => setShowYearPicker(true)}>
          <TimeText>{selectedYear ? selectedYear : "Chọn năm học"}</TimeText>
          <Ionicons name="chevron-down" size={24} color={brand} />
        </TimePicker>
      </TimeContainer>
    );
  };

  return (
    <ReportContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ReportHeader>
        <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 12, padding: 8, backgroundColor: brand, borderRadius: 6 }}
          onPress={() => navigation.navigate('ReportHistory')}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Lịch sử báo cáo</Text>
        </TouchableOpacity>
          <ReportTitle>Tạo Báo Cáo Tự Động</ReportTitle>
          <ReportSubtitle>
            Chọn loại báo cáo và thời gian để tạo báo cáo tự động
          </ReportSubtitle>
        </ReportHeader>

        <ReportTypeContainer>
          <ReportTypeTitle>Loại Báo Cáo</ReportTypeTitle>
          <ReportTypeGrid>
            {reportTypes.map((type) => (
              <ReportTypeCard
                key={type.id}
                selected={selectedReportType === type.id}
                onPress={() => handleReportTypeSelect(type.id)}
              >
                <ReportTypeIcon selected={selectedReportType === type.id}>
                  <Ionicons
                    name={type.icon}
                    size={24}
                    color={selectedReportType === type.id ? brand : primary}
                  />
                </ReportTypeIcon>
                <ReportTypeText selected={selectedReportType === type.id}>
                  {type.title}
                </ReportTypeText>
              </ReportTypeCard>
            ))}
          </ReportTypeGrid>
        </ReportTypeContainer>
        {renderDatePicker()}
        {renderMonthPicker()}
        {renderSemesterPicker()}
        {renderYearPicker()}
        <GenerateButton onPress={handleGenerateReport}>
          <GenerateButtonText>Tạo Báo Cáo</GenerateButtonText>
        </GenerateButton>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Month Picker Modal */}
      {showMonthPicker && (
        <DateTimePicker
          value={selectedMonth}
          mode="date"
          display="default"
          onChange={handleMonthChange}
        />
      )}

      {/* Semester Picker Modal */} 
      {showSemesterPicker && (
       <Modal visible={showSemesterPicker} transparent={true} animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Chọn Học Kỳ</ModalTitle>
            <ScrollView>
              {semesters.map((semester) => (
              <ModalItem key={semester.id} onPress={() => handleSemesterSelect(semester.name)}>
                <ModalItemText>{semester.name}</ModalItemText>
                {semester.isCurrent && (
                <ModalItemSubText>(Kỳ hiện tại)</ModalItemSubText>
                )}
              </ModalItem>
              ))}
            </ScrollView>
            <ModalCloseButton onPress={() => setShowSemesterPicker(false)}>
              <ModalCloseButtonText>Hủy</ModalCloseButtonText>
            </ModalCloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal> 
      )}

      {/* Year Picker Modal */}
        {showYearPicker && (
        <Modal visible={showYearPicker} transparent={true} animationType="slide">
          <ModalContainer>
            <ModalContent>
              <ModalTitle>Chọn Năm Học</ModalTitle>
              <ScrollView>
                {academicYears.map((academicYear) => (
                  <ModalItem
                    key={academicYear.value}
                    onPress={() => handleAcademicYearSelect(academicYear)}
                  >
                    <ModalItemText>{academicYear.label}</ModalItemText>
                    {academicYear.isCurrent && (
                      <ModalItemSubText>(Năm học hiện tại)</ModalItemSubText>
                    )}
                  </ModalItem>
                ))}
              </ScrollView>
              <ModalCloseButton onPress={() => setShowYearPicker(false)}>
                <ModalCloseButtonText>Hủy</ModalCloseButtonText>
              </ModalCloseButton>
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
    </ReportContainer>
  );
};

export default CreateReport;
