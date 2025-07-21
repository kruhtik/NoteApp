// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        navigation.replace("Main");
      } else {
        Alert.alert("Login failed", "Invalid email or password");
      }
    } catch {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/login.png")} style={styles.image} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input} placeholder="Email" value={email}
        onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"
      />
      <TextInput
        style={styles.input} placeholder="Password" value={password}
        onChangeText={setPassword} secureTextEntry
      />
      <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate("CreateAccount")}>
        <Text style={{ color: "#222" }}>Create a New account?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Login account</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 40 },
  image: { width: 220, height: 120, marginBottom: 10, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  input: {
    width: "80%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 12, marginVertical: 7,
  },
  createBtn: {
    marginTop: 5,
    marginBottom: 15,
  },
  loginBtn: {
    width: "80%", backgroundColor: "#FFD600", borderRadius: 8, padding: 13, alignItems: "center"
  }
});
