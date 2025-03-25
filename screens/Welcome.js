import { ImageBackground, StyleSheet, View } from 'react-native';
import { Content, Wrapper, Title, Logo } from '../components/layout';
import Button from '../components/controls/Button';

export default function Welcome({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const goToRegister = () => {
    navigation.navigate('SignUp');
  };

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
        
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button onPress={goToLogin} label="Iniciar Sesión" type="white" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button onPress={goToRegister} label="Registrarse" type="white" />
          </View>
        </View>
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    marginTop: 10,
    padding: 10,
    width: '100%',
    marginEnd: 30,
  },
  buttonContainer: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginTop: 20,
    gap: 15, 
    width: '100%',
    marginLeft: 80, 
  },
  buttonWrapper: {
    width: '80%', 
  },
});
