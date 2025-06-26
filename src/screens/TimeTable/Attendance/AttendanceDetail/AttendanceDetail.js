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

const students = { id: 1, name: "Nguyen Van A" };

const AttendanceDetail = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4);
  const [selectedLikes, setSelectedLikes] = useState("Có chuẩn bị bài");
  const [feedback, setFeedback] = useState("");

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
      <Title>{students.name}</Title>
      <Subtitle>Thái độ học tập của học sinh</Subtitle>

      {/* Rating */}
      <Star style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
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
            style={selectedLikes.includes(tag) && styles.tagSelected}
            onPress={() => toggleTag(tag, selectedLikes, setSelectedLikes)}
          >
            <TagText
              style={selectedLikes.includes(tag) && styles.tagTextSelected}
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
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Submit button */}
      <SubmitButton style={styles.submitButton}>
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