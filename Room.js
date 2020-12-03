import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import nextId from "react-id-generator";

// sketch-related imports:
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import ExpoPixi from "expo-pixi";
// custom components:
import Message from "./Message.js";
import Picture from "./Picture.js";
// values for sketch component:
const color = 0x0000ff;
const width = 5;
const alpha = 0.5;

export default class Room extends React.Component {
  state = {
    // room info:
    title: "Rory's room",
    occupants: 5,
    capacity: 10,
    username: "Rory",
    deviceId: "Rory's phone",
    // input types/data:
    type: "text",
    uri: "",
    text: "",
    sketchMounted: true,
    // array of messages:
    messages: [
      {
        id: 0,
        sender: "Steven",
        deviceId: "Steven's phone",
        type: "text",
        text: "Hey guys.",
      },
      {
        id: 1,
        sender: "Rory",
        deviceId: "Rory's phone",
        type: "text",
        text: "Yo.",
      },
      {
        id: 2,
        sender: "Evan",
        deviceId: "Evan's phone",
        type: "image",
        uri: "",
      },
    ],
  };

  onChangeImage = async ({ width, height }) => {
    // Setting up options for sketch component:
    const options = {
      format: "png", /// PNG because the view has a clear background
      quality: 0.1, /// Low quality works because it's just a line
      result: "base64",
      height: height,
      width: width,
    };
    /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
    const uri = await takeSnapshotAsync(this.sketch, options);
    this.setState({ uri: uri });
  };
  // When text is changed, update state:
  onChangeText = (text) => {
    this.setState({ text: text });
  };
  // on submission of input, update messages list:
  onSubmit = () => {
    // If submitting sketch:
    if (this.state.type == "sketch") {
      // Create new image object:
      let newImage = {
        // get random id:
        id: nextId(),
        sender: this.state.username,
        deviceId: this.state.deviceId,
        type: "image",
        uri: this.state.uri,
      };
      let updatedMessages = this.state.messages;
      updatedMessages.push(newImage);
      // TODO: will need to update the server with this message:
      this.setState({ messages: updatedMessages });
    } else {
      // Send text message if not blank:
      if (this.state.text != "") {
        // Create new text object:
        let newText = {
          id: nextId(),
          sender: this.state.username,
          deviceId: this.state.deviceId,
          type: "text",
          text: this.state.text,
        };
        // TODO: will need to update the server with this message:
        let updatedMessages = this.state.messages;
        updatedMessages.push(newText);
        // Reset text state
        this.setState({ messages: updatedMessages });
        this.setState({ text: "" });
      }
    }
  };

  // Switch from text to sketch or vice versa:
  switch = () => {
    this.setState({ type: this.state.type == "text" ? "sketch" : "text" });
  };

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {this.state.title}
        </Text>
        <View
          style={
            this.state.type == "text" ? styles.messages : styles.messagesActive
          }
        >
          {/* Scroll view of messages: */}
          <ScrollView>
            {/* TODO: get these messages from database: */}
            {this.state.messages.map((message) =>
              message.type == "text" ? (
                <Message
                  key={message.id}
                  deviceId={this.state.deviceId}
                  message={message}
                />
              ) : (
                <Picture
                  key={message.id}
                  deviceId={this.state.deviceId}
                  message={message}
                  uri={message.uri}
                />
              )
            )}
          </ScrollView>
        </View>
        {/* Input section: */}
        <View style={styles.input}>
          {/* Display sketch component: */}
          {this.state.type == "sketch" && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              (
                <ExpoPixi.Sketch
                  style={styles.sketchInput}
                  strokeColor={color}
                  strokeWidth={width}
                  strokeAlpha={alpha}
                  ref={(ref) => (this.sketch = ref)}
                  onChange={this.onChangeImage}
                />
            </View>
          )}
          {/* Display text input: */}
          <View style={styles.inputWrapper}>
            <TouchableHighlight style={styles.switch} onPress={this.switch}>
              {this.state.type == "sketch" ? (
                <Text>Aa</Text>
              ) : (
                <Image style = {styles.switch} source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/pen-1994819-1699863.png" }}></Image>
              )}
            </TouchableHighlight>
            {this.state.type == "text" && (
              <TextInput
                style={styles.textInput}
                editable
                maxLength={40}
                placeholder="Text Message"
                onChangeText={(text) => this.onChangeText(text)}
                value={this.state.text}
              />
            )}
            <TouchableHighlight
              style={styles.submit}
              onPress={this.onSubmit}
              underlayColor="#fff"
            >
              <Image
                style={styles.submit}
                source={{
                  uri:
                    "https://cdn2.iconfinder.com/data/icons/dark-action-bar-2/96/send-512.png",
                }}
              ></Image>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  messages: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 100,
  },
  messagesActive: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 250,
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    bottom: 0,
    marginTop: "auto",
    width: Dimensions.get("window").width,
  },
  sketchInput: {
    height: 140,
    width: 300,
    bottom: 0,
    backgroundColor: "#fff",
    margin: "auto",
  },
  textInput: {
    backgroundColor: "#E5E5E5",
    width: 250,
    height: 20,
    fontSize: 10,
    padding: 3,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    width: 340,
  },
  switch: {
    height: 20,
    width: 20,
  },
  submit: {
    height: 25,
    width: 25,
  },
});
