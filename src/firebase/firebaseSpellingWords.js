import { collection, getDocs, doc, setDoc, writeBatch } from "firebase/firestore"
import { db } from "./firebaseConfig"

// Spelling words data structure
const spellingWords = [
  {
    id: "word1",
    word: "cat",
    options: ["cat", "kat", "cet", "caat"],
    image: "https://source.unsplash.com/featured/?cat",
    sound: null, // We'll use speech synthesis instead of audio files
    difficulty: "easy",
  },
  {
    id: "word2",
    word: "dog",
    options: ["dog", "dogg", "doog", "dag"],
    image: "https://source.unsplash.com/featured/?dog",
    difficulty: "easy",
  },
  {
    id: "word3",
    word: "run",
    options: ["run", "runn", "roon", "rann"],
    image: "https://source.unsplash.com/featured/?running",
    difficulty: "easy",
  },
  {
    id: "word4",
    word: "jump",
    options: ["jump", "jamp", "jomp", "jumb"],
    image: "https://source.unsplash.com/featured/?jumping",
    difficulty: "easy",
  },
  {
    id: "word5",
    word: "play",
    options: ["play", "plai", "pley", "pllay"],
    image: "https://source.unsplash.com/featured/?playing",
    difficulty: "easy",
  },
  {
    id: "word6",
    word: "apple",
    options: ["apple", "aple", "appel", "apel"],
    image: "https://source.unsplash.com/featured/?apple",
    difficulty: "medium",
  },
  {
    id: "word7",
    word: "banana",
    options: ["banana", "bananna", "banena", "bananaa"],
    image: "https://source.unsplash.com/featured/?banana",
    difficulty: "medium",
  },
  {
    id: "word8",
    word: "orange",
    options: ["orange", "orenge", "orang", "oranj"],
    image: "https://source.unsplash.com/featured/?orange",
    difficulty: "medium",
  },
  {
    id: "word9",
    word: "school",
    options: ["school", "scool", "skool", "schol"],
    image: "https://source.unsplash.com/featured/?school",
    difficulty: "medium",
  },
  {
    id: "word10",
    word: "friend",
    options: ["friend", "freind", "frend", "frind"],
    image: "https://source.unsplash.com/featured/?friends",
    difficulty: "medium",
  },
  {
    id: "word11",
    word: "beautiful",
    options: ["beautiful", "beutiful", "beautifull", "beautful"],
    image: "https://source.unsplash.com/featured/?beautiful",
    difficulty: "hard",
  },
  {
    id: "word12",
    word: "elephant",
    options: ["elephant", "elefant", "elephent", "elefent"],
    image: "https://source.unsplash.com/featured/?elephant",
    difficulty: "hard",
  },
  {
    id: "word13",
    word: "dinosaur",
    options: ["dinosaur", "dinasaur", "dinasour", "dinosar"],
    image: "https://source.unsplash.com/featured/?dinosaur",
    difficulty: "hard",
  },
  {
    id: "word14",
    word: "computer",
    options: ["computer", "computter", "computor", "compuder"],
    image: "https://source.unsplash.com/featured/?computer",
    difficulty: "hard",
  },
  {
    id: "word15",
    word: "chocolate",
    options: ["chocolate", "choclate", "chocolat", "choclet"],
    image: "https://source.unsplash.com/featured/?chocolate",
    difficulty: "hard",
  },
  {
    id: "word16",
    word: "extraordinary",
    options: ["extraordinary", "extrordinary", "extraodinary", "extrordnary"],
    image: "https://source.unsplash.com/featured/?extraordinary",
    difficulty: "expert",
  },
  {
    id: "word17",
    word: "necessary",
    options: ["necessary", "necesary", "neccesary", "neccessary"],
    image: "https://source.unsplash.com/featured/?necessary",
    difficulty: "expert",
  },
  {
    id: "word18",
    word: "definitely",
    options: ["definitely", "definately", "definetly", "defenetly"],
    image: "https://source.unsplash.com/featured/?definitely",
    difficulty: "expert",
  },
  {
    id: "word19",
    word: "restaurant",
    options: ["restaurant", "restarant", "resturant", "restaraunt"],
    image: "https://source.unsplash.com/featured/?restaurant",
    difficulty: "expert",
  },
  {
    id: "word20",
    word: "pronunciation",
    options: ["pronunciation", "pronounciation", "pronuciation", "prononciation"],
    image: "https://source.unsplash.com/featured/?pronunciation",
    difficulty: "expert",
  },
]

// Function to initialize the database with spelling words
export const initializeSpellingWords = async () => {
  try {
    // First check if words already exist
    const wordsCollection = collection(db, "words")
    const snapshot = await getDocs(wordsCollection)

    if (!snapshot.empty) {
      console.log("Words collection already exists. Skipping initialization.")
      return false
    }

    console.log("Initializing spelling words database...")

    // Use batch write for better performance
    const batch = writeBatch(db)

    // Add each word to the batch
    for (const word of spellingWords) {
      const docRef = doc(wordsCollection, word.id)
      batch.set(docRef, word)
    }

    // Commit the batch
    await batch.commit()

    console.log("Database initialization complete!")
    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
  }
}

// Function to fetch spelling words from Firebase
export const fetchSpellingWords = async () => {
  try {
    const wordsCollection = collection(db, "words")
    const snapshot = await getDocs(wordsCollection)

    if (snapshot.empty) {
      console.log("No words found in Firebase. Initializing database...")
      await initializeSpellingWords()

      // Try fetching again after initialization
      const newSnapshot = await getDocs(wordsCollection)
      if (newSnapshot.empty) {
        throw new Error("Failed to initialize and fetch words")
      }

      return newSnapshot.docs.map((doc) => doc.data())
    }

    return snapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.error("Error fetching spelling words:", error)
    throw error
  }
}

// Function to add a new spelling word to Firebase
export const addSpellingWord = async (word) => {
  try {
    if (!word.id || !word.word || !word.options || !word.difficulty) {
      throw new Error("Invalid word data. Required fields: id, word, options, difficulty")
    }

    const wordRef = doc(db, "words", word.id)
    await setDoc(wordRef, word)
    console.log(`Added word: ${word.word}`)
    return true
  } catch (error) {
    console.error("Error adding spelling word:", error)
    throw error
  }
}

