import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  ContainerNote,
  Header,
  HeaderTitle,
  Title,
  SectionTitle,
  Tag,
  SubmitButton,
  SubmitButtonText,
  TagText,
  TagContainer,
  Textarea,
} from "../../constant/styleNote";
import { Colors } from "../../constant/color";

const { primary, brand, black } = Colors;

const homeworkTags = [
  "Hoàn thành bài tốt",
  "Có chuẩn bị bài",
  "Cần cải thiện thêm",
  "Chưa chuẩn bị bài",
];

const focusTags = [
  "Rất tốt",
  "Tốt",
  "Trung bình",
  "Kém",
];

const AttendanceDetail = ({route, navigation}) => {
  const {studentId, studentName, noteExist, homeworkExist, focusExist, onSave} = route.params;
  const [selectedHomework, setSelectedHomework] = useState(homeworkExist);
  const [note, setNote] = useState(noteExist || "");
  const [selectedFocus, setSelectedFocus] = useState(focusExist);

  const toggleTag = (tag, selected, setSelected) => {
    if (selected === tag) {
      setSelected("");
    } else {
      setSelected(tag);
    }
  };

  return (
    <ContainerNote>
      {/* Header */}
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={brand} />
        </TouchableOpacity>
        <HeaderTitle>Nhận xét học tập</HeaderTitle>
      </Header>

      {/* Title */}
      <Title>{studentName}</Title>

      {/* Focus */}
      <SectionTitle>Thái độ học tập của học sinh</SectionTitle>
      <TagContainer>
        {focusTags.map((tag) => (
          <Tag key={tag} style={selectedFocus === tag && styles.tagSelected} onPress={() => toggleTag(tag, selectedFocus, setSelectedFocus)}>
            <TagText style={selectedFocus === tag && styles.tagTextSelected}>
              {tag}
            </TagText>
          </Tag>
        ))}
      </TagContainer>

      {/* Homework */}
      <SectionTitle>Chuẩn bị bài học trước khi đến lớp</SectionTitle>
      <TagContainer>
        {homeworkTags.map((tag) => (
          <Tag key={tag} style={selectedHomework === tag && styles.tagSelected} onPress={() => toggleTag(tag, selectedHomework, setSelectedHomework)}>
            <TagText style={selectedHomework === tag && styles.tagTextSelected}>
              {tag}
            </TagText>
          </Tag>
        ))}
      </TagContainer>

      {/* Textarea */}
      <SectionTitle>Ghi chú</SectionTitle>
      <Textarea placeholderTextColor={black} placeholder="Nhận xét việc học trên lớp của học sinh." value={note} onChangeText={setNote} multiline/>

      {/* Submit button */}
      <SubmitButton style={styles.submitButton} onPress={() => {
        if (onSave) {
          onSave({
            studentId: studentId,
            note: note,
            homework: selectedHomework,
            focus: selectedFocus
          });
        }
        navigation.goBack();
      }}>
        <SubmitButtonText>Lưu</SubmitButtonText>
      </SubmitButton>
    </ContainerNote>
  );
};

const styles = StyleSheet.create({
  tagTextSelected: {
    color: primary,
  },
  tagSelected: {
    backgroundColor: brand,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default AttendanceDetail;