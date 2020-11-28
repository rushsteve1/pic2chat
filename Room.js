import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
// import r from 'rethinkdb';

export default class Room extends React.Component {
  state = {
    title: "Rory's room",
    occupants: 5,
    capacity: 10,
    deviceId: "Rory's phone",
    messages: [
      {
        sender: "Steven",
        deviceId: "Steven's phone",
        type: "text",
        text: "Hey guys.",
      },
      {
        sender: "Rory",
        deviceId: "Rory's phone",
        type: "text",
        text: "Yo.",
      },
      {
          sender:"Evan",
          deviceId: "Evan's phone",
          type:"image",
      }
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
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {this.state.title}
        </Text>

        <View>
          {this.state.messages.map((message) => (
            <View>
              {message.deviceId != this.state.deviceId ? (
                <View style={styles.messageWrapper}>
                  <View>
                    <Text>{message.sender}</Text>
                    <Text style={styles.message}>{message.text}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.myMessageWrapper}>
                  <View>
                    <Text style = {{color:"#7C4DFF",fontSize: 12,textAlign:"right"}}>you</Text>
                    <Text style={styles.myMessage}>{message.text}</Text>
                  </View>
                </View>
              )}
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
  messageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  message: {
    backgroundColor: "#F2F2F2",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop:2,
    paddingBottom:5,
    marginTop: 5,
    borderRadius: 10,
    borderRadius: 10,
  },
  myMessageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  myMessage: {
    backgroundColor: "#7C4DFF",
    color: "#fff",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop:2,
    paddingBottom:5,
    marginTop: 5,
    borderRadius: 10,
  },
});
