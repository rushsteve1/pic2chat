import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

export default class Picture extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.message.sent_by != this.props.id ? (
          <View style={styles.sentPicture}>
            <Text style={styles.senderTag}>{this.props.message.sender}</Text>
            <Image style = {styles.image} source = {{uri: `data:image/png;base64,${this.props.uri}`,}}></Image>
          </View>
        ) : (
          <View style={styles.myPicture}>
            <Text style={styles.meTag}>you</Text>
            <Image style = {styles.image} source = {{uri: `data:image/png;base64,${this.props.uri}`,}}></Image>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 5,
    marginTop: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  senderTag: {
    position: "absolute",
    backgroundColor: "#C4C4C4",
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    zIndex: 1,
  },
  meTag: {
    position: "absolute",
    backgroundColor: "#d8c7ff",
    color: "#7C4DFF",
    right: 0,
    marginLeft: "auto",
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 1,
  },
  sentPicture: {
    height: 150,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
  },
  myPicture: {
    right: 10,
    marginLeft: "auto",
    height: 150,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#7C4DFF",
  },
  image : {
    height: 148,
    width: 298,
    borderRadius: 5,
  }
});
