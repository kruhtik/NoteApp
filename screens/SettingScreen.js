import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function SettingScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
      setUser(users[0] || {});
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Logout feature is a demo!");
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#222" : "#fff" }]}>
      <Text style={[styles.heading, { color: dark ? "#FFD600" : "#222" }]}>Settings</Text>
      <View style={styles.infoBlock}>
        <Feather name="user" size={20} color={dark ? "#FFD600" : "#222"} />
        <Text style={[styles.infoText, { color: dark ? "#FFD600" : "#222" }]}>
          Name: {user.name || "User"}
        </Text>
      </View>
      <View style={styles.infoBlock}>
        <Feather name="mail" size={20} color={dark ? "#FFD600" : "#222"} />
        <Text style={[styles.infoText, { color: dark ? "#FFD600" : "#222" }]}>
          Email: {user.email || "your@email.com"}
        </Text>
      </View>
      <View style={styles.infoBlock}>
        <Feather name="moon" size={20} color={dark ? "#FFD600" : "#222"} />
        <Text style={[styles.infoText, { color: dark ? "#FFD600" : "#222" }]}>Dark Theme</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Feather name="log-out" size={18} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  heading: { fontSize: 25, fontWeight: "bold", marginBottom: 28 },
  infoBlock: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  infoText: { marginLeft: 12, fontSize: 17 },
  logoutBtn: {
    marginTop: 28,
    backgroundColor: "#FFD600",
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 22
  },
  logoutText: { color: "#fff", marginLeft: 8, fontWeight: "bold", fontSize: 16 }
});
