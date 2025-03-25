import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Pago() {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');

    return (
        <View style={styles.container}>
            {/* Botón Home */}
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/homeIcon.png')} style={styles.homeIcon} />
            </TouchableOpacity>

            {/* Título */}
            <Text style={styles.title}>PAGO</Text>

            {/* Campos del formulario */}
            <TextInput 
                style={styles.input} 
                placeholder="NOMBRE(S)" 
                placeholderTextColor="#0D3B2E"
                value={nombre} 
                onChangeText={setNombre} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="APELLIDO(S)" 
                placeholderTextColor="#0D3B2E"
                value={apellido} 
                onChangeText={setApellido} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="TELEFONO MOVIL" 
                placeholderTextColor="#0D3B2E"
                keyboardType="phone-pad"
                value={telefono} 
                onChangeText={setTelefono} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="EMAIL" 
                placeholderTextColor="#0D3B2E"
                keyboardType="email-address"
                value={email} 
                onChangeText={setEmail} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="DIRECCIÓN" 
                placeholderTextColor="#0D3B2E"
                value={direccion} 
                onChangeText={setDireccion} 
            />

            {/* Línea divisoria */}
            <View style={styles.separator} />

            {/* Resumen de pago */}
            <Text style={styles.subtitle}>Resumen de pago</Text>
            <View style={styles.paymentSummary}>
                <Text style={styles.item}>Ensalada BUFFALO TENDER  x1</Text>
                <Text style={styles.price}>174.00</Text>
            </View>

            {/* Botón de compra */}
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>COMPRAR</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF8F2',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    homeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    homeIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0D3B2E',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#CDEFE0',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
        color: '#0D3B2E',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#0D3B2E',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D3B2E',
        marginBottom: 10,
    },
    paymentSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    item: {
        fontSize: 16,
        color: '#0D3B2E',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0D3B2E',
    },
    buyButton: {
        backgroundColor: '#0D3B2E',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    buyText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

