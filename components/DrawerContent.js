// components/DrawerContent.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function DrawerContent({ navigation }) {
  return (
    <DrawerContentScrollView>
      <View style={styles.header}>
        <Feather name="book-open" size={24} color="#FFD600" />
        <Text style={styles.heading}>Your Notes</Text>
      </View>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Notes")}>
        <MaterialIcons name="notes" size={20} color="#333" />
        <Text style={styles.label}>Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("CreateNew")}>
        <Feather name="plus-square" size={20} color="#333" />
        <Text style={styles.label}>Create New</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Trash")}>
        <Feather name="trash-2" size={20} color="#333" />
        <Text style={styles.label}>Trash</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Setting")}>
        <Feather name="settings" size={20} color="#333" />
        <Text style={styles.label}>Setting</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Help")}>
        <Feather name="help-circle" size={20} color="#333" />
        <Text style={styles.label}>Help</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginLeft: 18, marginTop: 30, marginBottom: 25 },
  heading: { fontWeight: "bold", fontSize: 18, marginLeft: 8, color: "#222" },
  item: { flexDirection: "row", alignItems: "center", padding: 15, marginLeft: 8 },
  label: { marginLeft: 20, fontSize: 16 },
});
