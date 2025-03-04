"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { initializeSpellingWords } from "../firebase/firebaseSpellingWords"

const InitializeDbScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleInitializeDatabase = async () => {
    setLoading(true)
    try {
      const success = await initializeSpellingWords()
      setResult({
        success: true,
        message: success ? "Database initialized successfully!" : "Database already exists. No changes made.",
      })
    } catch (error) {
      console.error("Error initializing database:", error)
      setResult({
        success: false,
        message: `Error: ${error.message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Database Initialization</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Initialize Spelling Words</Text>
          <Text style={styles.description}>
            This will add a collection of spelling words to your Firebase database for use in the Spelling Game. This
            operation is only needed once. If the database already contains words, no changes will be made.
          </Text>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleInitializeDatabase}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.buttonText}>Initializing...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Initialize Database</Text>
            )}
          </TouchableOpacity>

          {result && (
            <View style={[styles.resultContainer, result.success ? styles.successResult : styles.errorResult]}>
              <Text style={styles.resultText}>{result.message}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.description}>
            1. Press the "Initialize Database" button above to add spelling words to your Firebase database.
          </Text>
          <Text style={styles.description}>2. This operation will only add data if the database is empty.</Text>
          <Text style={styles.description}>
            3. Once the database is initialized, you can start using the Spelling Game.
          </Text>
          <Text style={styles.description}>
            4. To add more words or modify existing ones, edit the spellingWords array in the firebaseSpellingWords.js
            file.
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Game</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "OpenDyslexic-Bold",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "OpenDyslexic-Bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: "OpenDyslexic",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenDyslexic-Bold",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    borderLeftWidth: 4,
  },
  successResult: {
    backgroundColor: "#e8f5e9",
    borderLeftColor: "#4CAF50",
  },
  errorResult: {
    backgroundColor: "#ffebee",
    borderLeftColor: "#f44336",
  },
  resultText: {
    fontSize: 14,
    fontFamily: "OpenDyslexic",
  },
  backButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenDyslexic-Bold",
  },
})

export default InitializeDbScreen

