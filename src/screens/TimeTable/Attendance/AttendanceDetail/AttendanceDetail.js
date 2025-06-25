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

const likeTags = [
  "EASY TO USE",
  "COMPLETE",
  "HELPFUL",
  "CONVENIENT",
  "LOOKS GOOD",
];
const improveTags = [
  "COULD HAVE MORE COMPONENTS",
  "COMPLEX",
  "NOT INTERACTIVE",
  "ONLY ENGLISH",
];

export default function AttendanceDetail() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4);
  const [selectedLikes, setSelectedLikes] = useState(["CONVENIENT", "HELPFUL"]);
  const [selectedImproves, setSelectedImproves] = useState(["ONLY ENGLISH"]);
  const [feedback, setFeedback] = useState("");

  const toggleTag = (tag, selected, setSelected) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={{ width: 28 }} /> {/* Placeholder for centering */}
      </View>

      {/* Title */}
      <Text style={styles.title}>Your project is finished.</Text>
      <Text style={styles.subtitle}>
        How would you rate the prototyping kit?
      </Text>

      {/* Rating */}
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
              size={36}
              color="#007AFF"
              style={{ marginHorizontal: 2 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Like tags */}
      <Text style={styles.sectionTitle}>What did you like about it?</Text>
      <View style={styles.tagsContainer}>
        {likeTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedLikes.includes(tag) && styles.tagSelected,
            ]}
            onPress={() => toggleTag(tag, selectedLikes, setSelectedLikes)}
          >
            <Text
              style={[
                styles.tagText,
                selectedLikes.includes(tag) && styles.tagTextSelected,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Improve tags */}
      <Text style={styles.sectionTitle}>What could be improved?</Text>
      <View style={styles.tagsContainer}>
        {improveTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedImproves.includes(tag) && styles.tagSelected,
            ]}
            onPress={() =>
              toggleTag(tag, selectedImproves, setSelectedImproves)
            }
          >
            <Text
              style={[
                styles.tagText,
                selectedImproves.includes(tag) && styles.tagTextSelected,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Textarea */}
      <Text style={styles.sectionTitle}>Anything else?</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Tell us everything."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#222" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#222" },
  subtitle: { fontSize: 16, color: "#888", marginBottom: 16 },
  stars: { flexDirection: "row", marginBottom: 24 },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: "#222",
  },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 },
  tag: {
    backgroundColor: "#EAF1FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
  },
  tagSelected: {
    backgroundColor: "#007AFF",
  },
  tagText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  tagTextSelected: {
    color: "#fff",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    fontSize: 16,
    marginBottom: 24,
    marginTop: 4,
    color: "#222",
  },
  submitBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
