import React, { useState } from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Text,
  Radio,
  ListItem,
  Left,
  Right,
  Container,
  Header,
  Button,
  Icon,
  Body,
  Title,
  Content,
  Thumbnail,
  List,
  Input,
  Item
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  addReminder,
  deleteReminder,
  deletePlant
} from "../redux/reducers/plants";
import {
  reminderIntervalTypes,
  translations
} from "../constants/ReminderIntervalTypes";

const SingleScreen = props => {
  const { navigation, plants } = props;
  const { DAILY, WEEKLY, MONTHLY } = reminderIntervalTypes;

  const [isAddNewReminderInputShown, setIsAddNewReminderInputShown] = useState(
    false
  );
  const [newReminderName, setNewReminderName] = useState("");
  const [newReminderInterval, setNewReminderInterval] = useState(DAILY);

  const plant = navigation.getParam("plant");
  const plantId = plant.id;
  const selectedPlant = plants.find(plant => plant.id === plantId);

  const toggleIsAddNewReminderInputShown = () => {
    setIsAddNewReminderInputShown(!isAddNewReminderInputShown);
  };

  const handleAddReminderPress = () => {
    setIsAddNewReminderInputShown(!isAddNewReminderInputShown);
    props.addReminder(plantId, newReminderName, newReminderInterval);
  };

  const handleNewReminderNameChange = text => {
    setNewReminderName(text);
  };

  const handleNewReminderIntervalChange = reminderIntervalType => () => {
    setNewReminderInterval(reminderIntervalType);
  };

  const handleDeleteReminderPress = reminderId => () => {
    props.deleteReminder(plantId, reminderId);
  };

  const handleDeletePlantPress = () => {
    props.deletePlant(plantId);
    navigation.navigate("Home");
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (!selectedPlant) {
    return (
      <View style={styles.container}>
        <Text>No Plant</Text>
      </View>
    );
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button onPress={goBack} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{plant.name}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Row>
            <Col size={25}>
              <Thumbnail
                source={{
                  uri:
                    "https://www.ikea.com/PIAimages/0614197_PE686822_S5.JPG?f=s"
                }}
              />
            </Col>
            <Col size={58}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {selectedPlant.name}
              </Text>
              <Text>{selectedPlant.description}</Text>
            </Col>
            <Col size={17} style={{ alignContent: "right" }}>
              <Button
                danger
                onPress={handleDeletePlantPress}
                style={{ width: 42 }}
              >
                <Text>X</Text>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button light small onPress={toggleIsAddNewReminderInputShown}>
                <Text>
                  {!isAddNewReminderInputShown ? "Add New Reminder" : "Hide"}
                </Text>
              </Button>
              {isAddNewReminderInputShown && (
                <View style={{ margin: 20 }}>
                  <Item regular>
                    <Input
                      onChangeText={handleNewReminderNameChange}
                      value={newReminderName}
                      placeholder={"Name..."}
                    />
                  </Item>

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
                        selected={
                          newReminderInterval === reminderIntervalTypes.MONTHLY
                        }
                      />
                    </Right>
                  </ListItem>
                  <Row style={{ paddingTop: 20 }}>
                    <Left>
                      <Button success onPress={handleAddReminderPress}>
                        <Text>Add new</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button light onPress={toggleIsAddNewReminderInputShown}>
                        <Text>Cancel</Text>
                      </Button>
                    </Right>
                  </Row>
                </View>
              )}
            </Col>
          </Row>
          <List>
            {selectedPlant.reminders.map(reminder => (
              <ListItem>
                <Left>
                  <Text>
                    {reminder.name} - {reminder.interval}
                  </Text>
                </Left>
                <Right>
                  <Button
                    onPress={handleDeleteReminderPress(reminder.id)}
                    transparent
                  >
                    <Icon name="close" />
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        </ScrollView>
      </Content>
    </Container>
  );
};

SingleScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  }
});

const mapStateToProps = state => ({
  plants: state.plants.plants
});

const mapDispatchToProps = {
  addReminder,
  deleteReminder,
  deletePlant
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleScreen);
