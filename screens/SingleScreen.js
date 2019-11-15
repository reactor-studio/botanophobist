import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { Text } from 'native-base';

import { addReminder } from "../redux/reducers/plants"
import reminderIntervalTypes from "../constants/ReminderIntervalTypes";

const SingleScreen = (props) => {
    const [isAddNewReminderInputShown, setIsAddNewReminderInputShown] = useState(false)
    const [newReminderName, setNewReminderName] = useState('')
    const [newReminderInterval, setNewReminderInterval] = useState(reminderIntervalTypes.DAILY)

    const { navigation, plants } = props;
    const plant = navigation.getParam('plant')
    const plantId = plant.id
    const selectedPlant = plants.find(plant => plant.id === plantId)

    const toggleIsAddNewReminderInputShown = () => {
        setIsAddNewReminderInputShown(!isAddNewReminderInputShown)
    }

    const handleAddReminderPress = () => {
        props.addReminder(plant.id, newReminderName, newReminderInterval)
    }

    handleNewReminderNameChange = (e) => {
        setNewReminderName(e.target.value)
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
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
    >
        <TouchableOpacity onPress={goBack}>
            <Text>
              {"<"}
            </Text>
          </TouchableOpacity>

        <View>
            <Text>
              {selectedPlant.name}
            </Text>
            <Text>
              {selectedPlant.description}
            </Text>
        </View>
        <View>
            {selectedPlant.reminders.map(reminder => (
                <Text key={reminder.id}>{reminder.name} - {reminder.interval}</Text>
            ))}
        </View>
        {isAddNewReminderInputShown ?
           <View>
               <TextInput
            onChangeText={this.handleNewReminderNameChange}
            value={newReminderName}
            placeholder={"Name..."}
          />
               <Text onPress={handleAddReminderPress}>Add new</Text>
            <Text onPress={toggleIsAddNewReminderInputShown}>Cancel</Text>
            </View>
     : 
     <Text onPress={toggleIsAddNewReminderInputShown}>Add New Reminder</Text>
    }
      </ScrollView>
    </View>
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
    addReminder
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SingleScreen)