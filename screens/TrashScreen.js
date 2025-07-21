import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function TrashScreen({ navigation }) {
  const [trash, setTrash] = useState([]);

  useEffect(() => {
    const loadTrash = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("trash")) || [];
      setTrash(data);
    };
    const focus = navigation.addListener("focus", loadTrash);
    return focus;
  }, [navigation]);

  const restoreNote = async (note) => {
    let notes = JSON.parse(await AsyncStorage.getItem("notes")) || [];
    let trashNotes = trash.filter(n => n.id !== note.id);

    notes.push({ id: note.id, title: note.title, content: note.content });
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    await AsyncStorage.setItem("trash", JSON.stringify(trashNotes));
    setTrash(trashNotes);
    Alert.alert("Restored!", "Note moved back to notes.");
  };

  const deleteForever = async (note) => {
    let trashNotes = trash.filter(n => n.id !== note.id);
    await AsyncStorage.setItem("trash", JSON.stringify(trashNotes));
    setTrash(trashNotes);
    Alert.alert("Deleted", "Note deleted forever.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trash</Text>
      <FlatList
        data={trash}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.trashCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.restoreBtn} onPress={() => restoreNote(item)}>
                <Feather name="rotate-ccw" size={18} color="#fff" />
                <Text style={styles.btnText}>Restore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() =>
                Alert.alert("Delete forever?", "Are you sure?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => deleteForever(item) }
                ])}>
                <Feather name="trash-2" size={18} color="#fff" />
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign: "center", color: "#888", marginTop: 40}}>Trash is empty.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#222" },
  trashCard: { backgroundColor: "#FFE082", borderRadius: 10, padding: 14, marginBottom: 15 },
  title: { fontWeight: "bold", fontSize: 17 },
  content: { fontSize: 15, color: "#555", marginVertical: 6 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end" },
  restoreBtn: { backgroundColor: "#FFD600", borderRadius: 8, padding: 8, marginRight: 10, flexDirection: "row", alignItems: "center" },
  deleteBtn: { backgroundColor: "#f55", borderRadius: 8, padding: 8, flexDirection: "row", alignItems: "center" },
  btnText: { color: "#fff", marginLeft: 5, fontWeight: "bold" }
});
