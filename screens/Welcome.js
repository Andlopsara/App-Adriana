import { ImageBackground, StyleSheet } from 'react-native';
import { Content, Wrapper, Title, Logo } from '../components/layout';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';

export default function Welcome({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('Login');
  }
  const goToRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <Wrapper backgroundColor="#e9fff9">
      <Content>
        <ImageBackground
          style={styles.background}
          source={require('../assets/fondo.png')}
         >
          <Logo type="white" />
        </ImageBackground>
        <Title color="#013424" title="BIENVENIDO (A)" />
        <Button onPress={goToLogin} label={"Iniciar Sesión"} type="white" />
        <Button onPress={goToRegister} label={"Registrarse"} type="white" />
      </Content>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    marginTop: 10,
    padding:10,
    width: '100%',
    marginEnd:30,
  }
})