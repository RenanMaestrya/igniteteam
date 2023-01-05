import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";

export function NewGroup(){

    const navigation = useNavigation();

    function handleNew(){
        navigation.navigate('players', { group: 'LOL' })
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />
                <Highlight 
                    title='Nova turma'
                    subtitle='crie uma turma para adicionar as pessoas'
                />

                <Input
                
                />

                <Button
                    title='Criar'
                    style={{ marginTop: 20}}
                    onPress={handleNew}
                />

            </Content>
        </Container>
    )
}