import { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Content, Header, Wrapper } from '../components/layout';
import State from '../components/controls/State';
import Base from '../components/modals/Base';
import FormItem from '../components/controls/FormItem';
import Button from '../components/controls/Button';

export default function Home({ navigation }) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState();
    const [status, setStatus] = useState("Activo"); 
    const data = [
        { id: 1, name: 'Ensalada de pollo', code: '179.00', status: true },
        { id: 2, name: 'Ensalada de atun', code: '150.00', status: true },
        { id: 3, name: 'Promoción del mes', code: '200.00', status: false },
        { id: 4, name: 'Ensalada de frutas', code: '150.00', status: true },
    ];

    const toggleModal = () => {
        setVisible(!visible);
    };

    return (
        <Wrapper>
            <Header title="" />
            <Content>
                {visible && (
                    <Base
                        id="modal-state"
                        visible={visible}
                        title={"Editar datos del producto"}
                        onClose={toggleModal}
                    >
                        <FormItem label="Nombre" />
                        <FormItem label="Precio" />
                        <FormItem label="Estatus" />
                        <Picker
                            selectedValue={status}
                            onValueChange={(itemValue) => setStatus(itemValue)}
                        >
                            <Picker.Item label="Activo" value="Activo" />
                            <Picker.Item label="Inactivo" value="Inactivo" />
                        </Picker>
                    </Base>
                )}
                <Button label="Abrir" onPress={toggleModal} />
                <ScrollView horizontal={true}>
                    <FlatList
                        data={data}
                        renderItem={State}
                        keyExtractor={item => item.id.toString()}
                    />
                </ScrollView>
                {}
                <Button 
                    label="Ordenar" 
                    onPress={() => navigation.navigate('Ordenar')} 
                    style={{ marginTop: 20 }} 
                />
            </Content>
        </Wrapper>
    );
};
