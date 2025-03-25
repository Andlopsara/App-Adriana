import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './Dashboard';
import External from './External';  // Verifica si esta es realmente la pantalla de bienvenida
import Welcome from '../screens/Welcome';  // Agregamos Welcome al Stack
import SignUp from '../screens/SignUp';
import Menu from '../screens/Menu';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="External">
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="External" component={External} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
