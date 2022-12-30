import { Text, View, StyleSheet } from "react-native";

export function Groups(){
    return (
        <View style={styles.container}>
            <Text style={{color:'#000'}}>Groups</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})