import React from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Button, Icon, Body, Title, Right, Thumbnail } from 'native-base';

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
              <Icon name='add' style={{color: "blue"}} />
            </Button>
          </Right>
        </Header>
      <Content>
        <List>
          {plants.map(plant => (
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: 'https://www.ikea.com/PIAimages/0614197_PE686822_S5.JPG?f=s' }} small />
                </Left>
                <Body>
                  <Text>
                    {plant.name}
                  </Text>
                  <Text>
                    {plant.description}
                  </Text>
                </Body>
                <Right style={{ justifyContent: "center"}}>
                  <TouchableOpacity onPress={handlePlantItemPress(plant)}>
                    <Icon name="arrow-forward"/>
                  </TouchableOpacity>
                </Right>
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