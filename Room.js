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

// sketch-related imports:
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import ExpoPixi from "expo-pixi";
// custom components:
import Message from "./Message.js";
import Picture from "./Picture.js";
import { supabase } from "./App.js";
import Constants from 'expo-constants';
// values for sketch component:
const color = 0x0000ff;
const width = 5;
const alpha = 0.5;
// Sleep function, pauses for <ms> miliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// The room component is what is displayed when a user clicks on a
// room or a direct message. It displays all messages that correspond
// to the given room and allows the user to send messages:
export default class Room extends React.Component {
  state = {
    // room info:
    name: "Rory's room",
    // input types/data
    type: "text",
    uri: "",
    text: "",
    sketchMounted: true,
    // array of messages
    messages: [],
  };

  // When the image is changed, update the state with the most recent
  // uri:
  onChangeImage = async ({ width, height }) => {
    // Setting up options for sketch component:
    const options = {
      format: "png", // PNG because the view has a clear background
      quality: 0.1, // Low quality works because it's just a line
      result: "base64", // Images are stored in base64
      height: height,
      width: width,
    };
    // Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
    const uri = await takeSnapshotAsync(this.sketch, options);
    // update state:
    this.setState({ uri });
  }

  // When text is changed, update state:
  onChangeText = (text) => {
    this.setState({ text: text });
  }

  // On submission of input, update messages list:
  onSubmit = async () => {
    let newMsg = {
      room_id: this.props.route.params.id,
      sent_by: Constants.installationId,
      type: this.state.type,
    };
    // submitting sketch, send uri:
    if (this.state.type === 'sketch') {
      newMsg.image_uri = this.state.uri;
    } else {
      // otherwise, send text:
      newMsg.text = this.state.text;
    }
    // Insert into database:
    await supabase
      .from('messages')
      .insert(newMsg);
    // reset uri and text state:
    this.setState({ text: "", uri: "" });
  }
  // To erase sketch, unmount and remount the sketch component:
  onErase = () => {
    this.setState({type:"text"});
    sleep(1).then(() => { this.setState({type:"sketch"}); });
  }
  // Switch from text to sketch or vice versa:
  switch = () => {
    this.setState({ type: (this.state.type == "text") ? "sketch" : "text" });
  }
  // When component loads, fetch data from database:
  async componentDidMount() {
    console.log(Constants.installationId);
    // Fetch room data:
    var { data } = await supabase.from('rooms').select('name').eq('id', this.props.route.params.id).single();
    this.setState({ name: data.name });
    // Fetch messages:
    var { data } = await supabase.from('messages').select().eq('room_id', this.props.route.params.id).order('time');
    this.setState({ messages: data });
    // Subscribe to messages to keep messages constantly updated:
    supabase
      .from('messages:room_id=eq.' + this.props.route.params.id)
      .on('INSERT', (evt) => this.setState({ messages: [...this.state.messages, evt.new]}))
      .subscribe()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {this.state.name}
        </Text>

        <View style={styles.messages} >
          {/* Scroll view of messages: */}
          <ScrollView>
            {this.state.messages.map((message) =>
              message.type == "text" ? (
                // Render message component if message is text:
                <Message
                  key={message.id}
                  id={Constants.installationId}
                  message={message}
                />
              ) : (
                // Otherwise, render image component:
                <Picture
                  key={message.id}
                  id={Constants.installationId}
                  message={message}
                  uri={message.image_uri}
                />
              )
            )}
          </ScrollView>
        </View>

        {/* Input section: */}
        <View style={[styles.input, {maxHeight: (this.state.type === "text") ? 50 : 180}]}>
          {/* Switch contexts (text vs sketch): */}
          <TouchableHighlight style={styles.switch} onPress={this.switch}
            underlayColor="#fff">
            {this.state.type == "sketch" ? (
              // Switch to text button:
              <Text>Aa</Text>
            ) : (
              // Switch to drawing button:
              <Image style = {styles.switch} source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/pen-1994819-1699863.png" }}></Image>
            )}
          </TouchableHighlight>
          {/* Text input: */}
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
          {/* Sketch input: */}
          {this.state.type == "sketch" && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* Sketch component: */}
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
          {/* erase button: */}
          {this.state.type == "sketch" && (
            <TouchableHighlight
            onPress= {this.onErase}
            underlayColor="#fff"
          >
            <Image
              style={styles.erase}
              source={{uri:  "https://cdn2.iconfinder.com/data/icons/business-1-58/48/69-512.png",}}
            ></Image>
          </TouchableHighlight>
          )}
          {/* Send button: */}
          <TouchableHighlight
            style={styles.submit}
            onPress={this.onSubmit}
            underlayColor="#fff"
          >
            <Image
              style={styles.submit}
              source={{ uri:"https://cdn2.iconfinder.com/data/icons/dark-action-bar-2/96/send-512.png",}}
            ></Image>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // general styles:
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
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  // input section styles:
  sketchInput: {
    height: 140,
    width: 300,
    backgroundColor: "#fff",
  },
  textInput: {
    backgroundColor: "#E5E5E5",
    flexGrow: 1,
    fontSize: 14,
    padding: 3,
    marginHorizontal: 10
  },
  input: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    marginTop: "auto",
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  // button styles:
  switch: {
    height: 20,
    width: 20,
  },
  submit: {
    height: 25,
    width: 25,
  },
  erase: {
    height: 20,
    width: 20,
  }
});
