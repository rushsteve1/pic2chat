import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
// import r from 'rethinkdb';

export default class Lobby extends React.Component {
  state = {
    rooms: [
      { key: 1, id: 1, name: "Rory's room", occupants: 4, capacity: 10 },
      { key: 2, id: 2, name: "Steven's room", occupants: 5, capacity: 10 },
    ],
    friends: [
      { key: 1, name: "Rory", lastonline: 4, online: true },
      { key: 2, name: "Steven", lastonline: 5, online: false },
      { key: 3, name: "Saketh", lastonline: 13, online: false  },
      { key: 4, name: "Evan", lastonline: 5, online: false  },
      { key: 5, name: "Vedant", lastonline: 5, online: false  },
    ],
  };

  constructor() {
    super();
    // TODO get the rooms and friends lists
  }

  roomPress = (roomId) => {
    console.log(roomId + " was pressed.");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Chats near you</Text>
        <View style={styles.rooms}>
          {this.state.rooms.map((room) => (
            <TouchableHighlight onPress={this.roomPress.bind(this, room.id)}>
              <View style={styles.room}>
                <View style={styles.roomInfo}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <View
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
        </View>
        <Text style={styles.header}>Chats</Text>
        <View style={styles.friends}>
          {this.state.friends.map((friend) => (
            <View style={styles.friend}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <View style ={{flexDirection:"row"}}>
                <Text style={styles.lastonline}>{friend.lastonline}hr</Text>
                {friend.online && <View style = {styles.circle}></View>}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginBottom: 20
  },
  lastonline:{
    opacity: 0.5,
  },
  circle:{
    width: 15,
    height: 15,
    marginLeft: 5,
    marginTop: 2.5,
    backgroundColor: "#7C4DFF",
    borderRadius: 100,
  },
});
