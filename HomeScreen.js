import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Kliknite na gumb za začetek</Text>
        <Text></Text>
        <Button title="Začni" onPress={() => navigation.navigate("Tutorial", {
          tutorialId: 1,
          pageNumber: 1
        })} />
        <Button title="Form" onPress={() => navigation.navigate("Form")} />
        <Button title="Edges" onPress={() => navigation.navigate("Edge")} />
      </View>
    );
};

export default HomeScreen;