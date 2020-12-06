import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
// import r from 'rethinkdb';


export default class Lobby extends React.Component {
  state = {
    rooms: [
      { id: 1, name: "Rory's room", occupants: 4, capacity: 10 },
      { id: 2, name: "Steven's room", occupants: 3, capacity: 5 },
      { id: 3, name: "Evan's room", occupants: 9, capacity: 10 },
      { id: 4, name: "Saketh's room", occupants: 10, capacity: 20 },
      { id: 5, name: "Vedant's room", occupants: 3, capacity: 6 },
    ],
    friends: [
      { name: "Vedant", lastonline: 1, online: true },
      { name: "Steven", lastonline: 7, online: true },
      { name: "Saketh", lastonline: 8, online: true },
      { name: "Evan", lastonline: 13, online: true },
      { name: "Mike", lastonline: 14, online: false },
      { name: "Will", lastonline: 15, online: false },
      { name: "Dustin", lastonline: 16, online: false },
      { name: "El", lastonline: 20, online: false },
      { name: "David", lastonline: 21, online: false },
      { name: "Joyce", lastonline: 24, online: false },
      { name: "Steve", lastonline: 48, online: false },
    ],
  };

  constructor() {
    super();
    // TODO get the rooms and friends lists
  }

  roomPress = (roomId) => {
    console.log(roomId + " was pressed.");
    this.props.navigation.navigate('Room', {})
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style = {{textAlign: "center",fontSize:20}}>Pic2Chat</Text>
        <Text style={styles.header}>Chats near you</Text>
        <ScrollView style={styles.rooms}>
          {this.state.rooms.map((room) => (
            <TouchableHighlight underlayColor = "#7C4DFF" key = {room.id} onPress={this.roomPress.bind(this, room.id)}>
              <View style={styles.room}>
                <View style={styles.roomInfo}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <View
                    key = {room.id}
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri:
                          "https://www.tuktukdesign.com/wp-content/uploads/2020/01/people-icon-vector.jpg",
                      }}
                    />
                    <Text style={styles.occupancy}>
                      {room.occupants}/{room.capacity}
                    </Text>
                  </View>
                  <Text style={styles.join}>Join</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <Text style={styles.header}>Chats</Text>
        <ScrollView>
          {this.state.friends.map((friend) => (
            <TouchableHighlight style={styles.friends} underlayColor = "#d8c7ff" onPress={this.roomPress.bind(this, friend.key)}>
              <View style={styles.friend}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  {friend.online === false && <Text style={styles.lastonline}>{friend.lastonline}hr</Text>}
                  {friend.online && <View style={styles.circle}></View>}
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rooms: {
    height: 200
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  room: {
    height: 70,
    marginBottom: 10,
    backgroundColor: "#C4C4C4",
    elevation: 5,
  },
  roomInfo: {
    bottom: 0,
    marginTop: "auto",
    backgroundColor: "#fff",
    paddingBottom: 10,
    paddingTop: 10,
  },
  roomName: {
    color: "#7C4DFF",
    textAlign: "center",
  },
  occupancy: {
    textAlign: "center",
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "stretch",
  },
  join: {
    color: "#7C4DFF",
    textAlign: "right",
    paddingRight: 20,
    fontSize: 15,
  },
  friends: {
    paddingLeft: 20,
    paddingRight: 25,
  },
  friend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },
  lastonline: {
    opacity: 0.5,
  },
  circle: {
    width: 15,
    height: 15,
    marginLeft: 5,
    marginTop: 2.5,
    backgroundColor: "#7C4DFF",
    borderRadius: 100,
  },
});
