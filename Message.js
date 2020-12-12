import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

// The message component renders a text message to be displayed in a room:
// Usage: 
// <Message
// key= "random_id"
// id= "Rory's_id"
// message= message_object
// />
export default class Message extends React.Component {
  render() {
    return (
      <View>
        {/* If message sent by other user, render it on the left side of screen: */}
        {this.props.message.sent_by != this.props.id ? (
          <View style={styles.messageWrapper}>
            <View>
              <Text>{this.props.message.sender}</Text>
              <Text style={styles.message}>{this.props.message.text}</Text>
            </View>
          </View>
        ) : (
          // Otherwise, render own message on right side of the screen:
          <View style={styles.myMessageWrapper}>
            <View>
              <Text
                style={{ color: "#7C4DFF", fontSize: 12, textAlign: "right" }}
              >
                you
              </Text>
              <Text style={styles.myMessage}>{this.props.message.text}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // General styles:
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
  // Message styles:
  // Message from other user:
  messageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  message: {
    backgroundColor: "#F2F2F2",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    borderRadius: 10,
  },
  // Message from current user:
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
    paddingTop: 2,
    paddingBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
});
