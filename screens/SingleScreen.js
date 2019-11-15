import * as WebBrowser from 'expo-web-browser';
import React from 'react';
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

import plants from "../constants/plants";

export default function SingleScreen(props) {
    const { navigation } = props;

    const goBack = () => {
        navigation.goBack()
    }

    const plantId = navigation.getParam('plantId')
    const selectedPlant = plants.find(plant => plant.id === plantId)

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
              {}
            </Text>
            <Text>
              {selectedPlant.name}
            </Text>
            <Text>
              {selectedPlant.description}
            </Text>
        </View>
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


