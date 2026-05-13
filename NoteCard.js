import React, { useState } from 'react';

import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NoteCard({
  item,
  onDelete,
  onEdit,
}) {

  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (index) => {

    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderChecklist = () => {

    const lines = item.text.split('\n');

    return lines.map((line, index) => {

      if (line.trim() === '') return null;

      const checked = checkedItems[index];

      return (

        <TouchableOpacity
          key={index}
          style={styles.checkItem}
          onPress={() => toggleCheck(index)}
        >

          <Text style={styles.checkbox}>
            {checked ? '☑' : '☐'}
          </Text>

          <Text
            style={[
              styles.noteText,
              checked && styles.checkedText,
            ]}
          >
            {line}
          </Text>

        </TouchableOpacity>
      );
    });
  };

  return (

    <ImageBackground
      source={
        item.type === 'texto'
          ? require('../assets/images/vintage-paper.jpg')
          : require('../assets/images/paper-texture.jpg')
      }
      style={styles.noteCard}
      imageStyle={{
        borderRadius: 18,
      }}
    >

      <Text style={styles.noteType}>
        {item.type.toUpperCase()}
      </Text>

      {
        item.type === 'lista'
          ? renderChecklist()
          : (
            <Text style={styles.noteText}>
              {item.text}
            </Text>
          )
      }

      <Text style={styles.date}>
        {item.date}
      </Text>

      <View style={styles.buttons}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.buttonText}>
            Apagar
          </Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  noteCard: {
    padding: 18,
    marginBottom: 15,
    borderRadius: 18,
    overflow: 'hidden',
  },

  noteType: {
    color: '#7b5e3d',
    marginBottom: 10,
    fontFamily: 'CutiveMono',
  },

  noteText: {
    color: '#3a2b1c',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
    fontFamily: 'CutiveMono',
    flex: 1,
  },

  checkedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  date: {
    color: '#6d5a40',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'CutiveMono',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },

  editButton: {
    backgroundColor: '#8b6b4f',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  deleteButton: {
    backgroundColor: '#5d4037',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'CutiveMono',
  },

  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  checkbox: {
    marginRight: 8,
    fontSize: 18,
    color: '#4b3824',
    marginTop: 2,
  },

});