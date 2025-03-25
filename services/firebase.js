import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

import { auth, db } from '../firebase-config';

/**
 * Cierra sesión del usuario
 */
export const logoutAuth = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    Alert.alert("Error", "No se pudo cerrar sesión.");
  }
};

/**
 * Inicia sesión solo si el usuario está en Firestore
 */
export const loginWithEmailPass = async (email, password) => {
  try {
    // Autenticar usuario en Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Consultar Firestore para verificar si el usuario está registrado en "users"
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      Alert.alert("Error", "Usuario no registrado en la base de datos.");
      return false;
    }

    return true; // Usuario válido
  } catch (error) {
    Alert.alert("Error", "Correo o contraseña incorrectos.");
    return false;
  }
};

/**
 * Registra un usuario nuevo en Firebase Authentication y Firestore
 */
export const registerEmailPass = async (user) => {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const uid = userCredential.user.uid;

    // Guardar información en Firestore
    await setDoc(doc(db, 'users', uid), {
      full_name: user.full_name,
      email: user.email
    });

    Alert.alert("Éxito", "Usuario registrado correctamente.");
    return true; // Usuario registrado correctamente

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert("Error", "Este correo ya está registrado. Intenta con otro.");
    } else if (error.code === 'auth/weak-password') {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
    } else {
      Alert.alert("Error", "Hubo un problema con el registro.");
    }
    return false; // Fallo en el registro
  }
};
