import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { Text, Radio, ListItem, Left, Right, Container, Header, Button, Icon, Body, Title, Content } from 'native-base';

import { addReminder, deleteReminder, deletePlant } from "../redux/reducers/plants"
import {reminderIntervalTypes, translations} from "../constants/ReminderIntervalTypes";

const SingleScreen = (props) => {
    const { navigation, plants } = props;
    const { DAILY, WEEKLY, MONTHLY} = reminderIntervalTypes;

    const [isAddNewReminderInputShown, setIsAddNewReminderInputShown] = useState(false)
    const [newReminderName, setNewReminderName] = useState('')
    const [newReminderInterval, setNewReminderInterval] = useState(DAILY)

    const plant = navigation.getParam('plant')
    const plantId = plant.id
    const selectedPlant = plants.find(plant => plant.id === plantId)

    const toggleIsAddNewReminderInputShown = () => {
        setIsAddNewReminderInputShown(!isAddNewReminderInputShown)
    }

    const handleAddReminderPress = () => {
        props.addReminder(plantId, newReminderName, newReminderInterval)
    }

    const handleNewReminderNameChange = (text) => {
        setNewReminderName(text)
    }

    const handleNewReminderIntervalChange = reminderIntervalType => () => {
        setNewReminderInterval(reminderIntervalType)
    }
    
    const handleDeleteReminderPress = reminderId => () => {
        props.deleteReminder(plantId, reminderId)
    }
    
    const handleDeletePlantPress = () => {
        console.log("-------------------------")
        console.log("-------------------------")
        console.log(plantId)
        console.log("-------------------------")
        props.deletePlant(plantId)
        navigation.navigate('Home')
    }

    const goBack = () => { navigation.goBack() }

    if (!selectedPlant) {
        return (
            <View style={styles.container}>
                <Text>No Plant</Text>
            </View>
        )
    }

  return (
    <Container>
<Header>
          <Left>
            <Button onPress={goBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{plant.name}</Title>
          </Body>
        </Header>
      <Content>
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
    >
        <View>
            <Text>
              {selectedPlant.description}
            </Text>
        </View>
        <View>
            {selectedPlant.reminders.map(reminder => (
                <View key={reminder.id}>
                    <Text>{reminder.name} - {reminder.interval}</Text>
                    <Button onPress={handleDeleteReminderPress(reminder.id)} transparent>
                        <Icon name='icon-trash' />
                    </Button>
                </View>
            ))}
        </View>
        <Button onPress={handleDeletePlantPress} transparent>
            <Text>Delete Plant</Text>
                        <Icon name='icon-trash' />
                    </Button>
        {isAddNewReminderInputShown ?
           <View>
               <TextInput
            onChangeText={handleNewReminderNameChange}
            value={newReminderName}
            placeholder={"Name..."}
          />

    <ListItem
        onPress={handleNewReminderIntervalChange(DAILY)}
        selected={newReminderInterval === DAILY}
    >

            <Left>
              <Text>{translations[DAILY]}</Text>
            </Left>
            <Right>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={newReminderInterval === DAILY}
                />
            </Right>
          </ListItem>
        <ListItem
            onPress={handleNewReminderIntervalChange(WEEKLY)}
            selected={newReminderInterval === WEEKLY}
        >
            <Left>
              <Text>{translations[WEEKLY]}</Text>
            </Left>
            <Right>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={newReminderInterval === WEEKLY}
                />
            </Right>
          </ListItem>
        <ListItem
            onPress={handleNewReminderIntervalChange(MONTHLY)}
            selected={newReminderInterval === MONTHLY}
        >
            <Left>
              <Text>{translations[MONTHLY]}</Text>
            </Left>
            <Right>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={newReminderInterval === reminderIntervalTypes.MONTHLY}
                />
            </Right>
          </ListItem>

               <Text onPress={handleAddReminderPress}>Add new</Text>
            <Text onPress={toggleIsAddNewReminderInputShown}>Cancel</Text>
            </View>
     : 
     <Text onPress={toggleIsAddNewReminderInputShown}>Add New Reminder</Text>
    }
      </ScrollView>
    </View>
      </Content>
    </Container>
  );
}

SingleScreen.navigationOptions = {
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
    addReminder,
    deleteReminder,
    deletePlant
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SingleScreen)