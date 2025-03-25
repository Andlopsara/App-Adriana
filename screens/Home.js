import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../components/modals/Base'; // Importando el Modal
import FormItem from '../components/controls/FormItem'; // Importando el FormItem

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon name="bars" size={28} color="#0D3B2E" />
                </TouchableOpacity>
                <Image 
                    source={require('../assets/logoIcon.png')} 
                    style={styles.logo} 
                />
                <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
                    <Icon name="shopping-cart" size={28} color="#0D3B2E" />
                </TouchableOpacity>
            </View>

            {/* Título */}
            <Text style={styles.title}>BIENVENIDO</Text>

            {/* Botones de opciones */}
            <TouchableOpacity 
                style={styles.option} 
                onPress={() => navigation.navigate('Promociones')}
            >
                <Text style={styles.optionText}>PROMOCIONES</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.option} 
                onPress={() => navigation.navigate('Menu')}
            >
                <Text style={styles.optionText}>MENÚ</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.iconContainer}>
                    <Icon name="facebook" size={24} color="#FFFFFF" />
                    <Icon name="tiktok" size={24} color="#FFFFFF" />
                    <Icon name="instagram" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.footerText}>
                    Derechos reservados Super Salads SA de CV 2024
                </Text>
            </View>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF8F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        position: 'absolute',
        top: 40,
    },
    logo: {
        width: 150,
        height: 120,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0D3B2E',
        marginBottom: 20,
        marginTop: 60,
    },
    option: {
        backgroundColor: '#A3D9A5',
        paddingVertical: 80,
        paddingHorizontal: 100,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0D3B2E',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#0D3B2E',
        width: '100%',
        padding: 25,
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 5,
    },
    footerText: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
    },
});
