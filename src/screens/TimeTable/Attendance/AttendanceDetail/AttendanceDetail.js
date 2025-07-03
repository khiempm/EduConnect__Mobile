import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  ContainerNote,
  Header,
  HeaderTitle,
  Title,
  Subtitle,
  SectionTitle,
  Tag,
  TagSelected,
  SubmitButton,
  SubmitButtonText,
  Star,
  TagText,
  TagContainer,
  Textarea,
} from "../../../../constant/styleNote";
import { Colors } from "../../../../constant/color";

const { primary, brand, black } = Colors;

const likeTags = [
  "Hoàn thành bài tốt",
  "Có chuẩn bị bài",
  "Cần cải thiện thêm",
  "Chưa chuẩn bị bài",
];

const AttendanceDetail = ({route}) => {
  const {studentId, studentName} = route.params;
  const navigation = useNavigation();
  const [focus, setFocus] = useState(0 );
  const [selectedHomework, setSelectedHomework] = useState("Có chuẩn bị bài");
  const [note, setNote] = useState("");

  const toggleTag = (tag, selected, setSelected) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
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
      <Subtitle>Thái độ học tập của học sinh</Subtitle>

      {/* Rating */}
      <Star style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setFocus(i)}>
            <Ionicons
              name={i <= focus ? "star" : "star-outline"}
              size={36}
              color={brand}
              style={{ marginHorizontal: 2 }}
            />
          </TouchableOpacity>
        ))}
      </Star>

      {/* Like tags */}
      <SectionTitle>Chuẩn bị bài học trước khi đến lớp</SectionTitle>
      <TagContainer>
        {likeTags.map((tag) => (
          <Tag
            key={tag}
            style={selectedHomework.includes(tag) && styles.tagSelected}
            onPress={() => toggleTag(tag, selectedHomework, setSelectedHomework)}
          >
            <TagText
              style={selectedHomework.includes(tag) && styles.tagTextSelected}
            >
              {tag}
            </TagText>
          </Tag>
        ))}
      </TagContainer>

      {/* Textarea */}
      <SectionTitle>Ghi chú</SectionTitle>
      <Textarea
        placeholderTextColor={black}
        placeholder="Nhận xét việc học trên lớp của học sinh."
        value={note}
        onChangeText={setNote}
        multiline
      />

      {/* Submit button */}
      <SubmitButton style={styles.submitButton} onPress={() => {
        navigation.navigate('Attendance', {
          detailStudentId: studentId,
          detailFocus: focus,
          detailNote: note,
          detailHomework: focus.toString(),
          studentName: studentName,
        });
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