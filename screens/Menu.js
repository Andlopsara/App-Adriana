import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, set, push } from 'firebase/database'; // Importar Firebase

export default function Menu() {
    const navigation = useNavigation();
    const [menuItems, setMenuItems] = useState([
        { 
            id: "1", 
            name: "Ensalada César", 
            price: 150, 
            quantity: 0,
            description: "Ensalada clásica con lechuga romana, crutones, queso parmesano y aderezo César."
        },
        { 
            id: "2", 
            name: "Combo Ensalada + Jugo", 
            price: 180, 
            quantity: 0,
            description: "Incluye una ensalada fresca con pollo y un jugo natural a elegir."
        },
        { 
            id: "3", 
            name: "Descuento 15% en Santa Fe", 
            price: 130, 
            quantity: 0,
            description: "Ensalada Santa Fe con pollo a la parrilla, aguacate, frijoles negros y aderezo ranch."
        },
        { 
            id: "4", 
            name: "Ensalada Capri con Agua Gratis", 
            price: 179, 
            quantity: 0,
            description: "Ensalada con jitomates cherry, mozzarella fresca, albahaca y reducción de balsámico."
        },
    ]);

    const [expandedItem, setExpandedItem] = useState(null);

    const toggleDescription = (id) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    const updateMenuItemQuantity = (id, change) => {
        setMenuItems((prevMenuItems) =>
            prevMenuItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + change) } // Evitar cantidades negativas
                    : item
            )
        );
    };

    // Función para agregar los productos al carrito y redirigir al carrito
    const addToCart = () => {
        const productsInCart = menuItems.filter(item => item.quantity > 0);
        
        // Si no hay productos en el carrito, no hacemos nada
        if (productsInCart.length === 0) {
            alert("Por favor, selecciona productos para ordenar.");
            return;
        }

        const db = getDatabase();
        const cartRef = ref(db, 'carrito');  // 'cart' es el nodo donde almacenaremos los productos

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
        navigation.navigate('Carrito');
    };

    return (
        <View style={styles.container}>
            {/* Header con título y botón de Home */}
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
                        <Text style={styles.menuName}>{item.name.toUpperCase()}</Text>

                        {/* Contenedor con precio y selector en la misma línea */}
                        <View style={styles.priceAndSelector}>
                            <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>

                            {/* Selector de Cantidad */}
                            <View style={styles.quantitySelector}>
                                <TouchableOpacity onPress={() => updateMenuItemQuantity(item.id, -1)}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => updateMenuItemQuantity(item.id, 1)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Botón para mostrar información */}
                        <TouchableOpacity onPress={() => toggleDescription(item.id)}>
                            <Text style={styles.moreInfoButton}>
                                {expandedItem === item.id ? "Ocultar Información" : "Más Información"}
                            </Text>
                        </TouchableOpacity>

                        {/* Descripción del platillo */}
                        {expandedItem === item.id && (
                            <Text style={styles.description}>{item.description}</Text>
                        )}
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* Botón de Ordenar */}
            <TouchableOpacity style={styles.placeOrderButton} onPress={addToCart}>
                <Text style={styles.placeOrderButtonText}>ORDENAR</Text>
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
    moreInfoButton: {
        fontSize: 14,
        color: "#0D3B2E",
        fontWeight: "bold",
        marginTop: 10,
        textDecorationLine: "underline",
    },
    description: {
        fontSize: 14,
        color: "#0D3B2E",
        marginTop: 5,
    },
    placeOrderButton: {
        backgroundColor: "#0D3B2E",
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    placeOrderButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});
