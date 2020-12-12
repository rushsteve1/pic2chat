import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { supabase } from "./App.js";

// The Lobby component is what the user first sees when they open
// Pic2Chat. It displays all joinable rooms and direct messages
// with friends.
export default class Lobby extends React.Component {
  state = {
    rooms: [],
    // Friends have an id attribute, name, when they were last online
    // and whether or not they are currently online:
    friends: [
      { id: 1, name: "Vedant", lastonline: 1, online: true },
      { id: 1, name: "Steven", lastonline: 7, online: true },
      { id: 1, name: "Saketh", lastonline: 8, online: true },
      { id: 1, name: "Evan", lastonline: 13, online: true },
      { id: 1, name: "Mike", lastonline: 14, online: false },
      { id: 1, name: "Will", lastonline: 15, online: false },
      { id: 1, name: "Dustin", lastonline: 16, online: false },
      { id: 1, name: "El", lastonline: 20, online: false },
      { id: 1, name: "David", lastonline: 21, online: false },
      { id: 1, name: "Joyce", lastonline: 24, online: false },
      { id: 1, name: "Steve", lastonline: 48, online: false },
    ],
  };

  // When a room button is pressed, we console.log a debug message
  // and navigate to the room that corresponds to the button that
  // was pressed:
  roomPress = (roomId) => {
    console.log(roomId + " was pressed.");
    this.props.navigation.navigate('Room', {id: roomId})
  };

  // When this component loads, we fetch the general room data
  // from the supabase database:
  async componentDidMount() {
    var { data } = await supabase.from('rooms').select();
    this.setState({ rooms: data });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style = {{textAlign: "center",fontSize:20}}>Pic2Chat</Text>
        <Text style={styles.header}>Chats near you</Text>
        {/* Scrollable view of the difference rooms the user can select from: */}
        <ScrollView style={styles.rooms}>
          {this.state.rooms.map((room) => (
            <TouchableHighlight underlayColor="#7C4DFF" key={room.id} onPress={this.roomPress.bind(this, room.id)}>
              <View style={styles.room}>
                {/* When a room is pressed, navigate to that room: */}
                <View style={styles.roomInfo}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <View
                    key = {room.id}
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: "https://www.tuktukdesign.com/wp-content/uploads/2020/01/people-icon-vector.jpg",}}
                    />
                  </View>
                  <Text style={styles.join}>Join</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <Text style={styles.header}>Friends</Text>
        {/* Scrollable View of the user's direct message chats with friends: */}
        <ScrollView>
          {this.state.friends.map((friend) => (
            <TouchableHighlight key={friend.name} style={styles.friends} underlayColor="#d8c7ff" onPress={this.roomPress.bind(this, friend.key)}>
              {/* When a direct message is pressed, navigate to the chat: */}
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
  // General styling:
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
  // Room styling:
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
  // Friend styling:
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
