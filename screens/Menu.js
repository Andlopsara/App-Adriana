import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// 1) Firestore para LEER "menu" y GUARDAR "carrito"
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Ajusta la ruta

export default function Menu() {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);

  // Efecto para LEER la colección "menu"
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuCol = collection(db, "menu");
        const snapshot = await getDocs(menuCol);

        // Mapeamos cada doc y establecemos quantity = 0 localmente
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          description: doc.data().description || "",
          quantity: 0,
        }));

        setMenuItems(items);
      } catch (error) {
        console.error("Error al obtener menú:", error);
      }
    };

    fetchMenu();
  }, []);

  // Actualizar la cantidad en el estado local
  const updateQuantity = (id, change) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  // Guardar en la colección "carrito" y navegar a "Carrito"
  const handleOrder = async () => {
    // 1) Filtrar productos con quantity > 0
    const selectedProducts = menuItems.filter((item) => item.quantity > 0);

    if (selectedProducts.length === 0) {
      alert("Por favor, selecciona productos para ordenar.");
      return;
    }

    try {
      // 2) Guardar cada producto en la colección "carrito"
      for (const product of selectedProducts) {
        await addDoc(collection(db, "carrito"), {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        });
      }

      // 3) Navegar a la pantalla Carrito
      navigation.navigate("Carrito");
    } catch (error) {
      console.error("Error guardando en 'carrito':", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con título y botón Home */}
      <View style={styles.header}>
        <Text style={styles.title}>MENÚ</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={30} color="#0D3B2E" />
        </TouchableOpacity>
      </View>

      {/* Lista de Menú */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItemCard}>
            <Text style={styles.menuLabel}>MENÚ</Text>
            <Text style={styles.menuName}>
              {item.name ? item.name.toUpperCase() : "SIN NOMBRE"}
            </Text>

            <View style={styles.priceAndSelector}>
              <Text style={styles.menuPrice}>${item.price?.toFixed(2)}</Text>

              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
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

// ----------- ESTILOS -----------
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
  menuItemCard: {
    backgroundColor: "#A3D9A5",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0D3B2E",
  },
  menuName: {
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
  menuPrice: {
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
  description: {
    fontSize: 14,
    color: "#0D3B2E",
    marginTop: 5,
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
