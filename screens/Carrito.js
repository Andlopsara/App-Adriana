import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home'); 
  };

  const goToOrdenar = () => {
    navigation.navigate('Ordenar');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>HOME</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/cartIcon.png')} 
          style={styles.cartImage}
        />
        <Text style={styles.noOrdersText}>NO HAY ORDENES</Text>
      </View>
      <TouchableOpacity onPress={goToOrdenar} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>ORDENAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAF8EE',
    paddingVertical: 50,
  },
  homeButton: {
    position: 'absolute',
    top: 100,
    right: 170,
    backgroundColor: '#1B4332',
    padding: 10,
    borderRadius: 30,
  },
  homeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EAF8EE',
  },
  imageContainer: {
    alignItems: 'center',
  },
  cartImage: {
    top:150,
    width: 1000, 
    height: 300,
    resizeMode: 'contain',
  },
  noOrdersText: {
    marginTop: 190,
    fontSize: 30,
    fontWeight: 'bold',
    color: ' #1B4332',
  },
  orderButton: {
    backgroundColor: '#1B4332',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    top: -60,
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EAF8EE',
  },
});
