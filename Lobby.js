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
      { id: 1, name: "Rory's room", occupants: 4, capacity: 10 },
      { id: 2, name: "Steven's room", occupants: 5, capacity: 10 },
    ],
    friends: [],
  };

  constructor() {
    super();
    // TODO get the rooms and friends lists
  }

  roomPress = (roomId) => {
    console.log(roomId + " was pressed.");
    alert("you pressed the button");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10 }}>Chats near you</Text>
        <View style = {styles.rooms}>
          {this.state.rooms.map((room) => (
            <TouchableHighlight onPress={this.roomPress.bind(room.id)}>
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
  rooms: {
  },
  room: {
    height: 200,
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
});
