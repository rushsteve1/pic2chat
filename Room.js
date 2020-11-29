import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";

import Message from "./Message.js";
import Picture from "./Picture.js";

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
        sender:"Rory",
        deviceId:"Rory's phone",
        type:"image",
      },
    ],
  };

  constructor() {
    super();
    // TODO get the rooms and friends lists
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {this.state.title}
        </Text>

        <View>
          {this.state.messages.map((message) =>
            message.type == "text" ? (
              <Message
                deviceId={this.state.deviceId}
                message={message}
              />
            ) : (
              <Picture deviceId = {this.state.deviceId} message = {message}/>
            )
          )}
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
});
