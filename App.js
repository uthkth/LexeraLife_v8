import React from "react"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"

// Import screens
import HomeScreen from "./src/screens/HomeScreen"
import SpellingGameScreen from "./src/screens/SpellingGameScreen"
import InitializeDbScreen from "./src/screens/InitializeDbScreen"
import AdminScreen from "./src/screens/AdminScreen"
import LoginScreen from "./src/screens/LoginScreen"
import RegisterScreen from "./src/screens/RegisterScreen"
import ProfileScreen from "./src/screens/ProfileScreen"

const Stack = createNativeStackNavigator()

// Keep the splash screen visible until we're ready
SplashScreen.preventAutoHideAsync()

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  }

  async loadFonts() {
    await Font.loadAsync({
      OpenDyslexic: require("./assets/fonts/OpenDyslexic3-Regular.ttf"),
      "OpenDyslexic-Bold": require("./assets/fonts/OpenDyslexic3-Bold.ttf"),
    })
    this.setState({ fontsLoaded: true })
  }

  async componentDidMount() {
    try {
      await this.loadFonts()
    } catch (e) {
      console.warn("Error loading fonts:", e)
    } finally {
      // Hide splash screen
      await SplashScreen.hideAsync()
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null // SplashScreen is still visible while fonts load
    }

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Lexera Life" }} />
            <Stack.Screen name="SpellingGame" component={SpellingGameScreen} options={{ title: "Spelling Game" }} />
            <Stack.Screen name="InitializeDb" component={InitializeDbScreen} options={{ title: "Database Setup" }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ title: "Admin Panel" }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Your Profile" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}

