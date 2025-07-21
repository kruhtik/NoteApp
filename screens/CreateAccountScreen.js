// screens/CreateAccountScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateAccountScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const onRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !mobile) {
      Alert.alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    // Save user
    const user = { name, email, password, mobile };
    let users = JSON.parse(await AsyncStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
      Alert.alert("Email already exists");
      return;
    }
    users.push(user);
    await AsyncStorage.setItem("users", JSON.stringify(users));
    Alert.alert("Success", "Account created. Please log in.", [
      { text: "OK", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mobile" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <TouchableOpacity style={styles.createBtn} onPress={onRegister}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 40, paddingBottom: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginVertical: 20 },
  input: {
    width: "80%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 12, marginVertical: 7,
  },
  createBtn: {
    width: "80%", backgroundColor: "#FFD600", borderRadius: 8, padding: 13, alignItems: "center", marginTop: 20
  }
});
