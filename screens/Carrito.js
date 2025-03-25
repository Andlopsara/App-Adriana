import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database'; // Importar Firebase

export default function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const cartRef = ref(db, 'carrito'); // Referencia al nodo 'cart'
    
    // Escuchar cambios en la base de datos y obtener los productos del carrito
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      const loadedCartItems = data ? Object.values(data) : [];
      setCartItems(loadedCartItems);
    });
  }, []);

  const goToHome = () => {
    navigation.navigate('Home'); 
  };

  const goToOrdenar = () => {
    navigation.navigate('Home');
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
        
        {/* Mostrar mensaje si no hay productos en el carrito */}
        {cartItems.length === 0 ? (
          <Text style={styles.noOrdersText}>NO HAY ORDENES</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text>{item.product_name}</Text>
                <Text>Precio: ${item.product_price}</Text>
                <Text>Cantidad: {item.quantity}</Text>
              </View>
            )}
          />
        )}
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
    top: 150,
    width: 1000, 
    height: 300,
    resizeMode: 'contain',
  },
  noOrdersText: {
    marginTop: 190,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  cartItem: {
    backgroundColor: '#A3D9A5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
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
