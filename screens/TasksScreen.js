import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Text, CheckBox } from 'native-base';

const renderDate = (plant) => {
  console.log(plant);
  return plant.reminders.map( (item, i) => {
    console.log(item);
    // if(i === 0) {
    //   return (
    //     <Content>
    //       <ListItem itemHeader firstItem>
    //         <Text>15.11.2019</Text>
    //       </ListItem>
    //       <ListItem>
    //         <CheckBox color="green"/>
    //         <Text> {plant.name} - {item.name}</Text>
    //       </ListItem>
    //     </Content>
    //   )
    // } else {
      return (    
        <ListItem>
          <CheckBox checked={item.checked} color="green"/>
          <Text> {plant.name} - {item.name}</Text>
        </ListItem>
      )
  })
} 

const Tasks = ({plants}) => {
  return (
    <Container>
      <Content>
        <List>
          <ListItem itemHeader>
          <Text>15.11.2019</Text>
          </ListItem>
          {plants.map(renderDate)}
        </List>
      </Content>
    </Container>
  )
}

const mapStateToProps = state => ({
  plants: state.plants.plants
})

const mapDispatchToProps = {
    
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)