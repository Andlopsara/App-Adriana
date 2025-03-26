import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Importar funciones de Firestore
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  writeBatch, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "../firebase-config"; // Ajusta la ruta

export default function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  // 1) Suscripción a la colección "carrito"
  useEffect(() => {
    const carritoRef = collection(db, "carrito");

    const unsubscribe = onSnapshot(carritoRef, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, []);

  // 2) Incrementar la cantidad en Firestore
  const incrementQuantity = async (itemId, currentQuantity) => {
    try {
      const docRef = doc(db, "carrito", itemId);
      await updateDoc(docRef, {
        quantity: currentQuantity + 1,
      });
    } catch (error) {
      console.error("Error al incrementar la cantidad:", error);
    }
  };

  // 3) Disminuir la cantidad. Si llega a 0, se elimina el producto de Firestore
  const decrementQuantity = async (itemId, currentQuantity) => {
    try {
      if (currentQuantity <= 1) {
        // Si al restar se quedaría en 0 (o menos), borramos el doc
        const docRef = doc(db, "carrito", itemId);
        await deleteDoc(docRef);
      } else {
        // Si es mayor a 1, simplemente restamos 1 a la cantidad
        const docRef = doc(db, "carrito", itemId);
        await updateDoc(docRef, {
          quantity: currentQuantity - 1,
        });
      }
    } catch (error) {
      console.error("Error al disminuir la cantidad:", error);
    }
  };

  // 4) Manejo de "ORDENAR": muestra pop-up con ID, vacía el carrito y redirige a Home
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrito vacío", "No hay productos para ordenar");
      return;
    }

    // Genera un ID de pedido (por ejemplo usando Date.now)
    const orderId = Date.now();

    // Limpia la colección "carrito"
    try {
      const batch = writeBatch(db);
      cartItems.forEach((item) => {
        const itemRef = doc(db, "carrito", item.id);
        batch.delete(itemRef);
      });
      await batch.commit();
    } catch (error) {
      console.error("Error al limpiar la colección 'carrito':", error);
    }

    // Alerta con el ID de pedido y volver a Home
    Alert.alert(
      "Pedido Recibido",
      `Su pedido se entregará en 30 min. ID: ${orderId}`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón Home en la esquina superior izquierda */}
      <TouchableOpacity 
        style={styles.homeButton} 
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.homeButtonText}>HOME</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CARRITO</Text>

      {/* Lista de productos o aviso de carrito vacío */}
      {cartItems.length === 0 ? (
        <Text style={styles.noItems}>No hay productos en el carrito</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Nombre: {item.name}</Text>
              <Text style={styles.itemText}>Precio: ${item.price}</Text>

              {/* Sección para incrementar/disminuir la cantidad */}
              <View style={styles.quantityRow}>
                <TouchableOpacity 
                  onPress={() => decrementQuantity(item.id, item.quantity)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.itemText}>{item.quantity}</Text>

                <TouchableOpacity 
                  onPress={() => incrementQuantity(item.id, item.quantity)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Botón para finalizar pedido */}
      <TouchableOpacity style={styles.orderButton} onPress={handleCheckout}>
        <Text style={styles.orderButtonText}>ORDENAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----------- ESTILOS -----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#EAF8EE",
    alignItems: "center",
  },
  // Botón HOME con posición absoluta (esquina superior izquierda)
  homeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#1B4332",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  homeButtonText: {
    color: "#EAF8EE",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#0D3B2E",
  },
  noItems: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
  },
  itemContainer: {
    backgroundColor: "#A3D9A5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#0D3B2E",
    marginVertical: 2,
    textAlign: "center",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#0D3B2E",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#EAF8EE",
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#1B4332",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  orderButtonText: {
    color: "#EAF8EE",
    fontSize: 16,
    fontWeight: "bold",
  },
});
