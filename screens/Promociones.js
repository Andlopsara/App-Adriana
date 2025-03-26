import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// Firestore: leer las promociones y guardar el carrito
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Ajusta la ruta según tu carpeta

export default function Promociones() {
  const navigation = useNavigation();
  const [promociones, setPromociones] = useState([]);

  // 1) Obtener las promociones de la colección "promotions"
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promotionsCol = collection(db, "promotions");
        const promotionSnapshot = await getDocs(promotionsCol);

        // Inicializamos la cantidad en 0 localmente
        const promotionsList = promotionSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          quantity: 0,
        }));

        setPromociones(promotionsList);
      } catch (error) {
        console.error("Error al obtener promociones:", error);
      }
    };

    fetchPromotions();
  }, []);

  // 2) Actualizar la cantidad en el estado local
  const updateQuantity = (id, change) => {
    setPromociones((prevPromos) =>
      prevPromos.map((promo) =>
        promo.id === id
          ? { ...promo, quantity: Math.max(0, promo.quantity + change) }
          : promo
      )
    );
  };

  // 3) Guardar los productos seleccionados en la colección "carrito"
  //    y redirigir al screen "Carrito"
  const handleOrder = async () => {
    const selectedProducts = promociones.filter((promo) => promo.quantity > 0);

    if (selectedProducts.length === 0) {
      alert("Por favor, selecciona productos para ordenar.");
      return;
    }

    try {
      // Agregamos cada producto como un documento individual en "carrito"
      const carritoRef = collection(db, "carrito");

      for (const product of selectedProducts) {
        await addDoc(carritoRef, {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        });
      }

      // IMPORTANTE: Redirigimos al carrito después
      navigation.navigate("Carrito");

    } catch (error) {
      console.error("Error guardando en la colección 'carrito':", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con título y botón de Home */}
      <View style={styles.header}>
        <Text style={styles.title}>PROMOCIONES</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={30} color="#0D3B2E" />
        </TouchableOpacity>
      </View>

      {/* Lista de Promociones */}
      <FlatList
        data={promociones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.promoCard}>
            <Text style={styles.promoLabel}>PROMOCIÓN</Text>
            <Text style={styles.promoName}>{item.name?.toUpperCase()}</Text>

            <View style={styles.priceAndSelector}>
              <Text style={styles.promoPrice}>${item.price?.toFixed(2)}</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Botón de Ordenar */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>ORDENAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// --------- Estilos ---------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF8F2",
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 100,
    fontWeight: "bold",
    color: "#0D3B2E",
  },
  promoCard: {
    backgroundColor: "#A3D9A5",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  promoLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0D3B2E",
  },
  promoName: {
    fontSize: 18,
    marginRight: 20,
    fontWeight: "bold",
    color: "#0D3B2E",
    marginVertical: 5,
  },
  priceAndSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  promoPrice: {
    fontSize: 16,
    color: "#0D3B2E",
    fontWeight: "bold",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 100,
  },
  quantityButton: {
    fontSize: 20,
    marginTop: 10,
    color: "#0D3B2E",
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3B2E",
  },
  orderButton: {
    backgroundColor: "#0D3B2E",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
