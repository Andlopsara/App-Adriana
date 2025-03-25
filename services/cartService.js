import { getDatabase, ref, set, push } from 'firebase/database';
import { db } from './firebase'; // Importar configuración de Firebase

// Función para agregar productos al carrito
export const addToCart = async (productsInCart, userUid) => {
    const cartRef = ref(db, `carrito/${userUid}`); // Carrito asociado al UID del usuario

    try {
        productsInCart.forEach((item) => {
            const newCartItemRef = push(cartRef);  // Crear un nuevo item en el carrito
            set(newCartItemRef, {
                product_name: item.name,
                product_price: item.price,
                quantify: item.quantity,
            });
        });
        console.log("Productos agregados al carrito");
    } catch (error) {
        console.error("Error al agregar productos al carrito: ", error);
    }
};
