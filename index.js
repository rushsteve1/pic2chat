/* This code is ROUGH and half of it I stole of Stack Overflow */

/* Major Globaks */

var messages = [];
// I'm lazy so everyone just gets a number
const username =  Math.floor(Math.random() * 100);

/* DOM elements */
const messages_el = document.getElementById("messages");
const canvas_el = document.getElementById("draw");
const text_el = document.getElementById("text");
const send_el = document.getElementById("send");
const un_el = document.getElementById("un");

/* DOM Editing */

un_el.innerText = username;

function addMessage(msg) {
    const elm = document.createElement("div");
    elm.innerHTML = `
      <hr>
      <div>message by user number ${msg.username}</div>
      <div class="message">
          <pre>${msg.text}</pre>
          <img src="${msg.drawing}">
      </div>
    `;
    messages_el.appendChild(elm);
}

/* Websocket Code */

const socket = new WebSocket('ws://localhost:8081');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('joined');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
        messages = [...messages, ...data];
        messages.forEach(addMessage);
    } else {
        messages.push(data);
        addMessage(data);
    }
});

/* Canvas Drawing Code */

const ctx = canvas_el.getContext("2d");
// last known position
var pos = { x: 0, y: 0 };
var is_drawing = false;

ctx.canvas.height = canvas_el.height;
ctx.canvas.width = canvas_el.width;


canvas_el.addEventListener("mousemove", draw);
canvas_el.addEventListener("mousedown", (e) => {
    if (e.buttons === 1) {
        is_drawing = true;
        setPosition(e);
    } else {
        text_el.focus();
    }
});
canvas_el.addEventListener("mouseenter", setPosition);
canvas_el.addEventListener("mouseup", () => is_drawing = false);

// new position from mouse event
function setPosition(e) {
  var rect = canvas_el.getBoundingClientRect(), // abs. size of element
      scaleX = canvas_el.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas_el.height / rect.height;  // relationship bitmap vs. element for Y

  pos = {
    x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    if (is_drawing) {
        ctx.beginPath(); // begin

        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000000";

        ctx.moveTo(pos.x, pos.y); // from
        setPosition(e);
        ctx.lineTo(pos.x, pos.y); // to

        ctx.stroke(); // draw it!
    }
}

/* Message Sending Code */

send_el.addEventListener("click", () => {
    // Get the data together
    const data = {
        username: username,
        text: text_el.value,
        drawing: canvas_el.toDataURL(),
    };

    // Stringify and send message
    const msg = JSON.stringify(data);
    socket.send(msg);

    // Clear everything out
    text_el.value = "";
    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height);
});
