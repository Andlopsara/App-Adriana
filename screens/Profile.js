import FormItem from '../components/controls/FormItem';
import {Content, Header , Wrapper} from '../components/layout';
export default function Profile(){
    return (
        <Wrapper>
          <Header title="" showBack={true}/>
            <Content> 
                     <FormItem label={"Correo electronico"}/>
                     <FormItem label={"Nombre completo"}/>
                     <FormItem label={"Telefono"}/>
            </Content>  
        </Wrapper>
    )
}