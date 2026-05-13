import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import CoffeeModal from '../../components/CoffeeModal';
import NoteCard from '../../components/NoteCard';

const { width } = Dimensions.get('window');

interface Note {
  id: string;
  text: string;
  type: 'texto' | 'frase' | 'lista';
  date: string;
}

export default function HomeScreen() {

  const [text, setText] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [type, setType] = useState<'texto' | 'frase' | 'lista'>('texto');

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showCoffee, setShowCoffee] = useState(false);

  const [loaded] = useFonts({
    CutiveMono: require('../../assets/fonts/CutiveMono-Regular.ttf'),
  });

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const saveNotes = async () => {
    try {

      await AsyncStorage.setItem(
        'notes',
        JSON.stringify(notes)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const loadNotes = async () => {

    try {

      const saved = await AsyncStorage.getItem('notes');

      if (saved !== null) {
        setNotes(JSON.parse(saved));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const addNote = () => {

    if (text.trim() === '') return;

    const now = new Date();

    const formattedDate = now.toLocaleDateString('pt-BR');

    const formattedTime = now.toLocaleTimeString(
      'pt-BR',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );

    if (editingId) {

      const updated = notes.map((note) => {

        if (note.id === editingId) {

          return {
            ...note,
            text,
            type,
            date: `${formattedDate} • ${formattedTime}`,
          };
        }

        return note;
      });

      setNotes(updated);

      setEditingId(null);

    } else {

      const newNote: Note = {
        id: Date.now().toString(),
        text,
        type,
        date: `${formattedDate} • ${formattedTime}`,
      };

      setNotes([newNote, ...notes]);
    }

    setText('');
  };

  const deleteNote = (id: string) => {

    const filtered = notes.filter(
      (note) => note.id !== id
    );

    setNotes(filtered);
  };

  const editNote = (note: Note) => {

    setText(note.text);

    setType(note.type);

    setEditingId(note.id);
  };

  if (!loaded) {
    return null;
  }

  return (

    <ImageBackground
      source={require('../../assets/images/vintage-paper.jpg')}
      style={styles.background}
      resizeMode="cover"
    >

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={{ flex: 1 }}
      >

        <SafeAreaView style={styles.container}>

          <Text style={styles.title}>
            Vintage Notes
          </Text>

          <View style={styles.tabs}>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => setType('texto')}
            >
              <Text style={styles.tabText}>
                Texto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => setType('frase')}
            >
              <Text style={styles.tabText}>
                Frase
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => setType('lista')}
            >
              <Text style={styles.tabText}>
                Lista
              </Text>
            </TouchableOpacity>

          </View>

          <TextInput
            style={styles.input}
            multiline
            scrollEnabled={true}
            placeholder="Escreva algo..."
            placeholderTextColor="#7a6650"
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={addNote}
          >

            <Text style={styles.buttonText}>
              {
                editingId
                  ? 'Salvar Edição'
                  : 'Salvar Nota'
              }
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.coffeeButton}
            onPress={() => setShowCoffee(true)}
          >

            <Text style={styles.coffeeButtonText}>
              ⋆☕︎♡ Buy Me a Coffee
            </Text>

          </TouchableOpacity>

          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
            renderItem={({ item }) => (

              <NoteCard
                item={item}
                onDelete={deleteNote}
                onEdit={editNote}
              />

            )}
          />

          <CoffeeModal
            visible={showCoffee}
            onClose={() => setShowCoffee(false)}
          />

        </SafeAreaView>

      </KeyboardAvoidingView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 34,
    color: '#4b3824',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'CutiveMono',
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  tab: {
    backgroundColor: '#8b5e3c',
    width: width * 0.28,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  tabText: {
    color: '#fff8e7',
    fontFamily: 'CutiveMono',
  },

  input: {
    backgroundColor: '#f5e7c8',
    minHeight: 130,
    maxHeight: 220,
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    textAlignVertical: 'top',
    color: '#3a2b1c',
    fontFamily: 'CutiveMono',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#6d4c41',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'CutiveMono',
    fontSize: 16,
  },

  coffeeButton: {
    backgroundColor: '#a67c52',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  coffeeButtonText: {
    color: '#fff',
    fontFamily: 'CutiveMono',
    fontSize: 15,
  },

});