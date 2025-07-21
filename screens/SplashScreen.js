// screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Login"), 1000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome{"\n"}To{"\n"}Notes</Text>
      <Image source={require("../assets/note.png")} style={styles.icon} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  icon: {
    width: 70,
    height: 70,
  },
});
