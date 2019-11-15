import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Button, /*Icon, */ Body, Title, Right } from 'native-base';

import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = (props) => {
  const { plants, navigation } = props;
  
  const handlePlantItemPress = plant => () => {
    navigation.navigate('Single', { plant })
  }
  
  return (
    <Container>
      <Header>
          <Left/>
          <Body>
            <Title>Plants</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name='add' /> */}
            </Button>
          </Right>
        </Header>
      <Content>
        <List>
          {plants.map(plant => (
            <ListItem>
              <TouchableOpacity onPress={handlePlantItemPress(plant)}>
                <Text>
                  {plant.name}
                </Text>
              </TouchableOpacity>
            </ListItem>
          ))}
          </List>
      </Content>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const mapStateToProps = state => ({
  plants: state.plants.plants
})

export default connect(mapStateToProps)(HomeScreen)