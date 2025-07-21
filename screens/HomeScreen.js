// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      const notesData = JSON.parse(await AsyncStorage.getItem("notes")) || [];
      setNotes(notesData);
    };
    const focus = navigation.addListener("focus", loadNotes);
    return focus;
  }, [navigation]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.heading}>Notes</Text>
        <Image source={require("../assets/user.png")} style={styles.avatar} />
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={22} color="#888" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 18 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteCard}
            onPress={() => navigation.navigate("CreateNew", { note: item })}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.noteContent}>{item.content}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", color: "#888", marginTop: 50 }}>No notes found.</Text>}
      />
      {/* Add Note Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateNew")}
      >
        <Feather name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "#FFD600",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 5,
  },
  heading: { fontSize: 22, fontWeight: "bold", color: "#222" },
  avatar: { width: 35, height: 35, borderRadius: 18, backgroundColor: "#eee" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
    height: 45,
  },
  searchInput: { flex: 1, fontSize: 16, marginLeft: 10 },
  noteCard: {
    backgroundColor: "#FFF9C4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  noteTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 6 },
  noteContent: { fontSize: 15, color: "#666" },
  addButton: {
    position: "absolute", right: 25, bottom: 40, width: 60, height: 60,
    backgroundColor: "#FFD600", borderRadius: 30, justifyContent: "center", alignItems: "center",
    elevation: 7,
  }
});
