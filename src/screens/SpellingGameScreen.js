import { SafeAreaView, StatusBar, StyleSheet } from "react-native"
import SpellingGame from "../components/SpellingGame"

const SpellingGameScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SpellingGame navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
})

export default SpellingGameScreen

