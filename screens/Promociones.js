import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importar Firestore
import { db } from '../firebase-config';  // Volver un nivel desde la carpeta 'screens' para acceder a 'firebase-config.js'
 // Importar la configuración de Firebase

export default function Promociones() {
    const navigation = useNavigation();
    
    const [promociones, setPromociones] = useState([]);

    useEffect(() => {
        // Función para obtener promociones de Firestore
        const fetchPromotions = async () => {
            const promotionsCol = collection(db, 'promotions');
            const promotionSnapshot = await getDocs(promotionsCol);
            const promotionsList = promotionSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPromociones(promotionsList);
        };

        fetchPromotions();
    }, []);

    // Función para actualizar la cantidad de un producto
    const updateQuantity = (id, change) => {
        setPromociones((prevPromos) =>
            prevPromos.map((promo) =>
                promo.id === id
                    ? { ...promo, quantity: Math.max(0, promo.quantity + change) } // Asegurarse de que la cantidad no sea negativa
                    : promo
            )
        );
    };

    // Función para agregar los productos al carrito y redirigir al carrito
    const addToCart = () => {
        const productsInCart = promociones.filter((promo) => promo.quantity > 0);
        
        // Si no hay productos en el carrito, no hacemos nada
        if (productsInCart.length === 0) {
            alert("Por favor, selecciona productos para ordenar.");
            return;
        }

        const db = getDatabase();
        const cartRef = ref(db, "carrito");  // 'carrito' es el nodo donde almacenaremos los productos

        // Agregar cada producto seleccionado al carrito en Firebase
        productsInCart.forEach((item) => {
            const newCartItemRef = push(cartRef);
            set(newCartItemRef, {
                product_name: item.name,
                product_price: item.price,
                quantity: item.quantity,
            });
        });

        // Redirigir al carrito después de agregar los productos
        navigation.navigate("carrito");
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
                        <Text style={styles.promoName}>{item.name.toUpperCase()}</Text>

                        {/* Contenedor con precio y selector en la misma línea */}
                        <View style={styles.priceAndSelector}>
                            <Text style={styles.promoPrice}>${item.price.toFixed(2)}</Text>

                            {/* Selector de Cantidad */}
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
            <TouchableOpacity style={styles.orderButton} onPress={addToCart}>
                <Text style={styles.orderButtonText}>ORDENAR</Text>
            </TouchableOpacity>
        </View>
    );
}

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
        flexDirection: "row", // Poner el precio y selector en la misma línea
        justifyContent: "space-between", // Separar elementos en los extremos
        alignItems: "center", // Alinear verticalmente
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
