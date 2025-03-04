import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Lexera Life</Text>
        </View>

        <Text style={styles.welcomeText}>Welcome to Lexera Life, a learning platform designed for dyslexic users!</Text>

        <View style={styles.gamesContainer}>
          <Text style={styles.sectionTitle}>Games</Text>

          <TouchableOpacity style={styles.gameCard} onPress={() => navigation.navigate("SpellingGame")}>
            <Image source={require("../../assets/images/spelling-game.png")} style={styles.gameImage} resizeMode="cover" />
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>Spelling Game</Text>
              <Text style={styles.gameDescription}>Improve your spelling skills with interactive exercises</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate("InitializeDb")}>
          <Text style={styles.adminButtonText}>Database Setup</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 10,
    fontFamily: "OpenDyslexic-Bold",
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "OpenDyslexic",
  },
  gamesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "OpenDyslexic-Bold",
  },
  gameCard: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gameImage: {
    width: "100%",
    height: 150,
  },
  gameInfo: {
    padding: 15,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "OpenDyslexic-Bold",
  },
  gameDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "OpenDyslexic",
  },
  adminButton: {
    backgroundColor: "#673AB7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  adminButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenDyslexic-Bold",
  },
})

export default HomeScreen

