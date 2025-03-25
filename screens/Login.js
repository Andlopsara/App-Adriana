import { useState } from "react";
import { Alert } from "react-native";

import { Content, Header, Wrapper, Title } from "../components/layout";
import Button from "../components/controls/Button";
import FormItem from "../components/controls/FormItem";

import { loginWithEmailPass } from "../services/firebase";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!user || !pass) {
      Alert.alert("Error", "Por favor, ingrese su correo y contraseña.");
      return;
    }

    setLoading(true);
    const success = await loginWithEmailPass(user, pass);
    setLoading(false);

    if (success) {
      navigation.replace("Dashboard"); 
    }
  };

  return (
    <Wrapper>
      <Header showBack={true} showCart={false} />
      <Content>
        <Title title="Estoy listo para comprar" />
        <FormItem
          value={user}
          label="Correo electrónico"
          keyboardType="email-address"
          onChange={(value) => setUser(value)}
        />
        <FormItem
          value={pass}
          secure={true}
          label="Contraseña"
          onChange={(value) => setPass(value)}
        />
        <Button label="ACCEDER" onPress={login} isLoading={loading} />
      </Content>
    </Wrapper>
  );
}
