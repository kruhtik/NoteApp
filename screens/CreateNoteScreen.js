import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function CreateNoteScreen({ route, navigation }) {
  const editingNote = route.params?.note;
  const [title, setTitle] = useState(editingNote?.title || "");
  const [content, setContent] = useState(editingNote?.content || "");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Both title and content are required.");
      return;
    }
    let notes = JSON.parse(await AsyncStorage.getItem("notes")) || [];
    if (editingNote) {
      // Update existing note
      notes = notes.map(n =>
        n.id === editingNote.id ? { ...n, title, content } : n
      );
    } else {
      // Create new note
      const id = Date.now().toString();
      notes.push({ id, title, content });
    }
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    navigation.navigate("Notes");
  };

  const deleteNote = async () => {
    if (!editingNote) return;
    let notes = JSON.parse(await AsyncStorage.getItem("notes")) || [];
    let trash = JSON.parse(await AsyncStorage.getItem("trash")) || [];
  
    // Remove from notes and add to trash
    notes = notes.filter(n => n.id !== editingNote.id);
    trash.push({ ...editingNote, deletedAt: Date.now() });
  
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    await AsyncStorage.setItem("trash", JSON.stringify(trash));
    navigation.navigate("Trash");
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#bbb"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
          <Feather name="save" size={20} color="#fff" />
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
        {editingNote && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() =>
              Alert.alert("Delete", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: deleteNote }
              ])
            }
          >
            <Feather name="trash-2" size={20} color="#fff" />
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD600",
    marginBottom: 15,
    padding: 6,
    color: "#222",
  },
  contentInput: {
    flex: 1,
    fontSize: 17,
    color: "#222",
    backgroundColor: "#FFF9C4",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    minHeight: 200,
    maxHeight: 350,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#FFD600",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteBtn: {
    flexDirection: "row",
    backgroundColor: "#f55",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});
