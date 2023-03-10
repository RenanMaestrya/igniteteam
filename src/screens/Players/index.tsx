import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { useRoute } from "@react-navigation/native";

import { PlayerCard } from "@components/PlayerCard";
import { ButtonIcon } from "@components/ButtonIcon";
import { ListEmpty } from "@components/ListEmpty";
import { Highlight } from "@components/Highlight";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayerByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.error(error);
        Alert.alert("Nova pessoa", "Não foi possivel adicionar.");
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possivel carregar as pessoas.");
    }

    useEffect(() => {
      fetchPlayerByTeam();
    }, [team]);

    return (
      <Container>
        <Header showBackButton />

        <Highlight
          title={group}
          subtitle="adicione a galera e separe os times."
        />

        <Form>
          <Input
            inputRef={newPlayerNameInputRef}
            onChangeText={setNewPlayerName}
            value={newPlayerName}
            placeholder="Nome da pessoa"
            autoCorrect={false}
            onSubmitEditing={handleAddPlayer}
            returnKeyType='done'
          />
          <ButtonIcon icon="add" onPress={handleAddPlayer} />
        </Form>
        <HeaderList>
          <FlatList
            data={["time a", "time b"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )}
            horizontal
          />
          <NumberOfPlayers>{Players.length}</NumberOfPlayers>
        </HeaderList>

        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => {}} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time. " />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />

        <Button title="Remover Turma" type="SECONDARY" />
      </Container>
    );
  }
}
