import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
// import r from 'rethinkdb';

export default class Message extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View>
        {this.props.message.deviceId != this.props.deviceId ? (
          <View style={styles.messageWrapper}>
            <View>
              <Text>{this.props.message.sender}</Text>
              <Text style={styles.message}>{this.props.message.text}</Text>
            </View>
          </View>
        ) : (
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
    paddingTop: 2,
    paddingBottom: 5,
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
    paddingTop: 2,
    paddingBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
});
