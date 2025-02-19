import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Content, Header, Wrapper, Title } from '../components/layout';
import { useState } from 'react';

export default function Ordenar() {
  // Datos de ejemplo para los productos
  const productos = [
    { id: '1', nombre: 'Ensalada BUFFALO TENDER', precio: 174.0 },
    { id: '2', nombre: 'Ensalada de atun', precio: 150.0 },
    { id: '3', nombre: 'Ensalada de frutas', precio: 150.0 },
  ];

  // Estado para los productos en el carrito
  const [carrito, setCarrito] = useState([]);

  // Función para agregar o quitar productos del carrito
  const toggleProductoEnCarrito = (producto, operacion) => {
    let nuevoCarrito = [...carrito];
    const productoEnCarrito = nuevoCarrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
      if (operacion === 'agregar') {
        productoEnCarrito.cantidad += 1; // Aumentar la cantidad
      } else if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad -= 1; // Disminuir la cantidad (no permitir cantidad 0)
      } else {
        nuevoCarrito = nuevoCarrito.filter((item) => item.id !== producto.id); // Eliminar si la cantidad es 0
      }
    } else if (operacion === 'agregar') {
      nuevoCarrito.push({ ...producto, cantidad: 1 }); // Agregar el producto con cantidad 1
    }

    setCarrito(nuevoCarrito);
  };

  // Renderiza un producto
  const renderProducto = ({ item }) => {
    const productoEnCarrito = carrito.find((producto) => producto.id === item.id);
    const cantidad = productoEnCarrito ? productoEnCarrito.cantidad : 0;

    return (
      <View style={styles.producto}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>

        <View style={styles.cantidadContainer}>
          <TouchableOpacity
            style={styles.botonCantidad}
            onPress={() => toggleProductoEnCarrito(item, 'restar')}
            disabled={cantidad === 0}
          >
            <Text style={styles.textoBoton}>-</Text>
          </TouchableOpacity>

          <Text style={styles.cantidad}>{cantidad}</Text>

          <TouchableOpacity
            style={styles.botonCantidad}
            onPress={() => toggleProductoEnCarrito(item, 'agregar')}
          >
            <Text style={styles.textoBoton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      <Header showBack={false} showCart={true} />
      <Content>
        <Title title="Nuestro Menú" />

        {}
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={renderProducto}
          style={styles.listaProductos}
        />

        {}
        <TouchableOpacity
          style={styles.botonIrAlCarrito}
          onPress={() => {} /* Navegar al carrito */}
        >
          <Text style={styles.textoBoton}>Ir al carrito</Text>
        </TouchableOpacity>
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  listaProductos: {
    marginTop: 20,
  },
  producto: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  precio: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  botonCantidad: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#1B4332',
    marginHorizontal: 5,
  },
  cantidad: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botonIrAlCarrito: {
    marginTop: 45,
    padding: 15,
    backgroundColor: '#1B4332',
    alignItems: 'center',
    borderRadius: 30,
  },
});
