import { useState } from "react";

import { groupCreate } from '../../storage/group/groupCreate';

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";

export function NewGroup(){
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew(){
        try{
            groupCreate(group)
            navigation.navigate('players', { group })
        }catch(error){  
            console.log(error);
        }
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
                    placeholder='Nome da Turma'
                    onChangeText={setGroup}
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