import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Container, Text } from 'native-base';

import { MonoText } from '../components/StyledText';

import plants from "../mocks/plants";

export default function SingleScreen(props) {
    const [isAddNewReminderInputShown, setIsAddNewReminderInputShown] = useState(false)
    
    const toggleIsAddNewReminderInputShown = () => { setIsAddNewReminderInputShown(!isAddNewReminderInputShown) }

    const { navigation } = props;

    const goBack = () => { navigation.goBack() }

    const plant = navigation.getParam('plant')
    const plantId = plant.id
    const selectedPlant = plants.find(plant => plant.id === plantId)

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
            <Text onPress={toggleIsAddNewReminderInputShown}>Cancel</Text>
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


