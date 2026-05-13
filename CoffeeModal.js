import React, { useState } from 'react';

import {
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as Clipboard from 'expo-clipboard';

import QRCode from 'react-native-qrcode-svg';

export default function CoffeeModal({
  visible,
  onClose,
}) {

  const [copied, setCopied] = useState(false);

  const copyPix = async () => {

    await Clipboard.setStringAsync(
      '0e80eb79-6201-477c-9430-d72ee7082483'
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (

    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >

      <ImageBackground
        source={require('../assets/images/vintage-paper.jpg')}
        style={styles.background}
        resizeMode="cover"
      >

        <ScrollView contentContainerStyle={styles.container}>

          <Text style={styles.title}>
            ⋆☕︎♡ Buy Me a Coffee
          </Text>

          <Text style={styles.text}>
            Apoie os criadores e ajude a manter o
            Vintage Notes gratuito para todos.
          </Text>

          <View style={styles.qrContainer}>
            <View style={styles.qrFrame}>

            <QRCode
              value="0e80eb79-6201-477c-9430-d72ee7082483"
              size={220}
            />

            </View>
          </View>

          <Text style={styles.pixLabel}>
            PIX copia e cola! ☕𐙚˚⋆｡ᡣ𐭩
          </Text>

          <TouchableOpacity
            style={styles.pixBox}
            onPress={copyPix}
            activeOpacity={0.8}
          >

            <Text style={styles.pixText}>
              0e80eb79-6201-477c-9430-d72ee7082483
            </Text>

            <Text style={styles.copyText}>
              {
                copied
                  ? 'Copiado ♡'
                  : 'Toque para copiar'
              }
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >

            <Text style={styles.closeText}>
              Fechar
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </ImageBackground>

    </Modal>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    color: '#4b3824',
    marginBottom: 20,
    fontFamily: 'CutiveMono',
  },

  text: {
    textAlign: 'center',
    color: '#5c4631',
    lineHeight: 28,
    marginBottom: 30,
    fontSize: 16,
    fontFamily: 'CutiveMono',
  },

  qrContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

qrFrame: {
  backgroundColor: '#8b6b4f',
  padding: 14,
  borderRadius: 24,
  borderWidth: 3,
  borderColor: '#5c4631',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 5,
},

  pixLabel: {
    color: '#4b3824',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'CutiveMono',
  },

  pixBox: {
    backgroundColor: '#f5e7c8',
    padding: 18,
    borderRadius: 14,
    marginBottom: 30,
  },

  pixText: {
    color: '#3a2b1c',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'CutiveMono',
  },

  copyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#8b6b4f',
    fontSize: 12,
    fontFamily: 'CutiveMono',
  },

  closeButton: {
    backgroundColor: '#6d4c41',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontFamily: 'CutiveMono',
  },

});