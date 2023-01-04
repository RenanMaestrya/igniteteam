import { useState } from 'react';

import { FlatList } from 'react-native';

import { Filter } from "@components/Filter";
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Input } from "@components/Input";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

export function Players(){
    const [team, setTeam] = useState('Time A');
    const [player, setPlayer] = useState([]);

    return (
        <Container>
            <Header showBackButton/>

            <Highlight
                title='Nome da turma'
                subtitle='adicione a galera e separe os times'
            />

            <Form>
                <Input 
                    placeholder='Nome da pessoa'
                    autoCorrect={false}
                />
                <ButtonIcon 
                    icon='add'
                />
            </Form>
            <HeaderList>
                <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}  
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {Players.length}
                </NumberOfPlayers>
                
            </HeaderList>

        </Container>   
    )    
}