import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { Text, Radio, ListItem, Left, Right, Container, Header, Button, Icon, Body, Title, Content } from 'native-base';

import { addPlant } from "../redux/reducers/plants"

const AddNewPlantScreen = (props) => {
    const { navigation } = props;

    const [newPlantName, setNewPlantName] = useState('')
    const [newPlantDescription, setNewPlantDescription] = useState('')


    const handleAddPlantPress = () => {
        props.addPlant(newPlantName, newPlantDescription)
        navigation.navigate('Home')
    }

    const handleNewPlantNameChange = (text) => {
        setNewPlantName(text)
    }

    const handleNewPlantDescriptionChange = (text) => {
        setNewPlantDescription(text)
    }

    const goBack = () => { navigation.goBack() }

  return (
    <Container>
<Header>
          <Left>
            <Button onPress={goBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add new plant</Title>
          </Body>
        </Header>
      <Content>
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
    >
        <TextInput
            onChangeText={handleNewPlantNameChange}
            value={newPlantName}
            placeholder={"Name..."}
          />
        <TextInput
            onChangeText={handleNewPlantDescriptionChange}
            value={newPlantDescription}
            placeholder={"Description..."}
          />
          <Text onPress={handleAddPlantPress}>Add new</Text>
      </ScrollView>
    </View>
      </Content>
    </Container>
  );
}

AddNewPlantScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});



const mapStateToProps = state => ({
  plants: state.plants.plants
})

const mapDispatchToProps = {
    addPlant
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddNewPlantScreen)