import { Content, Header, Wrapper, Title } from '../components/layout';
import Button from '../components/controls/Button';
import FormItem from '../components/controls/FormItem';

export default function Login({ navigation }) {
  const goToHome= () => {
    navigation.navigate('Dashboard');
  };

  return (
    <Wrapper>
      <Header showBack={true} showCart={false} />
      <Content>
        <Title title="¡INICIA SESIÓN!" />
        <FormItem label="Nombre de usuario"></FormItem>
        <FormItem label="Contraseña"></FormItem>

        <Button label={"INICIAR SESIÓN"} onPress={goToHome} />
      </Content>
    </Wrapper>
  );
};

