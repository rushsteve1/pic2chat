import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";

export default class Picture extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.message.deviceId != this.props.deviceId ? (
          <View style={styles.picture}>
            <Text style={styles.sender}>{this.props.message.sender}</Text>
          </View>
        ) : (
          <View style={styles.myPicture}>
            <Text style={styles.me}>you</Text>
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
    paddingTop: 5,
    marginBottom: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  picture: {
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  sender: {
    backgroundColor: "#C4C4C4",
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  myPicture: {
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#7C4DFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  me: {
    backgroundColor: "#d8c7ff",
    color: "#7C4DFF",
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
