import { Container } from "./styles";
import { Highlight } from '@components/Highlight';
import { Header } from "@components/Header";

export function Players(){
    return (
        <Container>
            <Header showBackButton/>

            <Highlight
                title='Nome da turma'
                subtitle='adicione a galera e separe os times'
            />

        </Container>   
    )    
}