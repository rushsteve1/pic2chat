import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import r from 'rethinkdb';

export default class Lobby extends React.Component {
  state = {
    rooms: [],
    friends: [],
  }

  constructor() {
    super();
    // TODO get the rooms and friends lists
  }

  roomPress = (roomId) => {
    // Do a thing
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.rooms.map((room) => {
        <TouchableHighlight
        onPress={roomPress(room.id)}>
        <TouchableHighlight/>
      })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
