import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const NoteCard = ({ note, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.title}>{note.title}</Text>
    <Text numberOfLines={2} style={styles.content}>{note.content}</Text>
    <Feather name="chevron-right" size={20} color="#888" style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF9C4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    position: "relative",
  },
  title: { fontSize: 17, fontWeight: "bold", marginBottom: 6, color: "#222" },
  content: { fontSize: 15, color: "#666" },
  icon: { position: "absolute", right: 10, top: 14 }
});

export default NoteCard;

