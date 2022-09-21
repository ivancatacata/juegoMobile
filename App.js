import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import Header from "./components/header";
import GameScreen from "./screens/game";
import StartGameScreen from "./screens/start-game";
import { colors } from "./constants/colors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [loaded] = useFonts({
    "Rajdhani-Regular": require("./assets/fonts/Rajdhani-Regular.ttf"),
    "Rajdhani-Bold": require("./assets/fonts/Rajdhani-Bold.ttf"),
    "Rajdhani-Light": require("./assets/fonts/Rajdhani-Light.ttf"),
    "Rajdhani-Italic": require("./assets/fonts/Rajdhani-Italic.ttf"),
    "Rajdhani-SemiBold": require("./assets/fonts/Rajdhani-SemiBold.ttf"),
  });
  const title = !userNumber ? "Adivina un numero" : "Comienza el juego";

  const onStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  if (!loaded) {
    return (
      <View style={styles.containerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  let content = <StartGameScreen onStartGame={onStartGame} />;

  if (userNumber) {
    content = <GameScreen selectedNumber={userNumber} />;
  }

  return (
    <View style={styles.container}>
      <Header title={title} />
      {content}
    </View>
  );
}
