import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Header = ({ title, onMenuPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onMenuPress}>
      <Feather name="menu" size={28} color="#222" />
    </TouchableOpacity>
    <Text style={styles.heading}>{title}</Text>
    <Image source={require("../assets/user.png")} style={styles.avatar} />
  </View>
);

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
});

export default Header;
