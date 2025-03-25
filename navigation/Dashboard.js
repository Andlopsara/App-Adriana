import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Alert } from "react-native";
import { auth } from "../firebase-config";
import { logoutAuth } from "../services/firebase"; 

import Home from '../screens/Home';
import Promociones from '../screens/Promociones';
import Carrito from '../screens/Carrito';
import Welcome from '../screens/Welcome';
import Menu from '../screens/Menu';

const Drawer = createDrawerNavigator();

export default function Dashboard({ navigation }) {
  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => navigation.navigate("Home"), // Regresa al Home si cancela
        },
        {
          text: "Sí, cerrar sesión",
          onPress: async () => {
            try {
              await logoutAuth(); 
              navigation.replace("Welcome");
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al cerrar sesión.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          {props.state?.routes?.length > 0 && <DrawerItemList {...props} />}
          <DrawerItem label="Cerrar Sesión" onPress={handleLogout} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Menú" component={Menu} options={{ headerShown: false }} />
      <Drawer.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
      <Drawer.Screen name="Promociones" component={Promociones} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
