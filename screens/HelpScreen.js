import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Help & Support</Text>
      <Text style={styles.text}>Welcome to the Notes app!{'\n'}
        - Tap the "+" button to create a new note.{'\n'}
        - Swipe left in Trash to delete notes forever or restore.{'\n'}
        - Access Settings for theme & logout.
      </Text>
      <TouchableOpacity
        style={styles.supportBtn}
        onPress={() => Alert.alert("Support", "Contact us at: support@notesapp.com")}
      >
        <Feather name="help-circle" size={20} color="#fff" />
        <Text style={styles.btnText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  heading: { fontSize: 25, fontWeight: "bold", color: "#222", marginBottom: 15 },
  text: { fontSize: 16, color: "#444", marginBottom: 35 },
  supportBtn: {
    backgroundColor: "#FFD600", flexDirection: "row", alignItems: "center",
    paddingVertical: 10, paddingHorizontal: 22, borderRadius: 8, alignSelf: "center"
  },
  btnText: { color: "#fff", marginLeft: 10, fontWeight: "bold", fontSize: 16 }
});
