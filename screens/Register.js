import { useState } from "react";
import { Alert } from "react-native";

import { Content, Wrapper, Title, Logo } from "../components/layout";
import FormItem from "../components/controls/FormItem";
import Button from "../components/controls/Button";

import { registerEmailPass } from "../services/firebase";

export default function Register({ navigation }) {
    const [user, setUser] = useState({
        email: "",
        full_name: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const goToLogin = () => {
        navigation.dispatch({
            type: 'NAVIGATE',
            payload: { name: "Login" }
        });
    };

    const registerUser = async () => {
        if (!user.email || !user.full_name || !user.password) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        if (user.password.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        const result = await registerEmailPass(user);
        setLoading(false);

        if (result) {
            Alert.alert("Éxito", "Usuario registrado correctamente.");
            setUser({ email: "", full_name: "", password: "" });

            navigation.replace("Login");
        }
    };

    return (
        <Wrapper>
            <Content>
                <Logo />
                <Title title="Registrar una nueva cuenta" />
                <FormItem
                    value={user.full_name}
                    label="Nombre completo"
                    onChange={(value) =>
                        setUser((prev) => ({ ...prev, full_name: value }))
                    }
                />
                <FormItem
                    value={user.email}
                    label="Correo electrónico"
                    keyboardType="email-address"
                    onChange={(value) =>
                        setUser((prev) => ({ ...prev, email: value.trim() }))
                    }
                />
                <FormItem
                    secure={true}
                    label="Contraseña"
                    value={user.password}
                    onChange={(value) =>
                        setUser((prev) => ({ ...prev, password: value.trim() }))
                    }
                />
                <Button onPress={registerUser} label="REGISTRARME" isLoading={loading} />
                <Button onPress={goToLogin} label="INICIAR SESIÓN" />
            </Content>
        </Wrapper>
    );
}
