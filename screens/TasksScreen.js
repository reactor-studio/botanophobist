import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, CheckBox } from 'native-base';
export default class Tasks extends Component {
  state = {
    dates: [
      {
        date: "16.11.2019",
        items: [
          {
            id: 1,
            name:"Kopriva",
            action: "voda",
            checked: true
          },
          {
            id: 2,
            name:"Kaktus",
            action: "zemlja",
            checked: false
          }
        ]
      }
    ]
  }
  checkItem(item) {
    const { state } = this;
  }
  renderItem = (item) => {
    return (
      <ListItem>
        <CheckBox checked={item.checked} color="green"/>
        <Text> {item.name} - {item.action}</Text>
      </ListItem>
    )
  }
  renderDate(date) {
    return date.items.map( (item, i) => {
      if(i === 0) {
        return (
          <Content>
            <ListItem itemHeader>
              <Text>{date.date}</Text>
            </ListItem>
            <ListItem>
              <CheckBox checked={item.checked} color="green"/>
              <Text> {item.name} - {item.action}</Text>
            </ListItem>
          </Content>
        )
      } else {
        return (    
          <ListItem>
            <CheckBox checked={item.checked} color="green"/>
            <Text> {item.name} - {item.action}</Text>
          </ListItem>
        )
      }
    })
  }
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.dates.map(this.renderDate)}
          </List>
        </Content>
      </Container>
    );
  }
}