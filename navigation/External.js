import {createNativeStackNavigator}from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Ordenar from '../screens/Ordenar';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();
export default function Dashboard() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name='Ordenar'
        component={Ordenar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}