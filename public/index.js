
const ulMenuDm = document.getElementById("users");
const ulMenuChannels = document.getElementById("channels")
const hEl=document.getElementById("recipient")
const chatBox = document.getElementById("chat")
const btnSubmit = document.getElementById("submitMsg")
const messageText = document.getElementById("message");
let activeChat = {}


async function getUsers() {
    const response = await fetch(`http://localhost:1337/api/clients?populate=avatar`);
    const result = await response.json();
    const users = result.data
    console.log(users)
    let liTag = "";
    users.forEach((obj => {
      const url = obj.attributes.avatar.data.attributes.formats.thumbnail.url;
      liTag =
        `<li onclick="openDM(event)"><span><img class="avatar" src="./${url}" alt=""></img></span> ${obj.attributes.name}</li>` +
        liTag;
    }))
    ulMenuDm.innerHTML=liTag
}
getUsers();

async function getChannels() {
  const response = await fetch(`http://localhost:1337/api/channels`);
  const result = await response.json();
  const channels = result.data;
  let liTag = "";
  channels.forEach((obj) => {
    liTag =
      `<li onclick="openChat(event)">${obj.attributes.name}</li>` +
      liTag;
  });
  ulMenuChannels.innerHTML = liTag;

}
getChannels();

   let coll = document.getElementsByClassName("collapsible");
    let i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }

function openChat(event) {
        hEl.innerHTML = `${event.target.innerText}`
    const chatName = event.target.innerText;
    getMessages(chatName)
}

async function getMessages(chatName){
    const response = await fetch(
      `http://localhost:1337/api/messages?populate=channel,sender&filters[channel][name][$eq]=${chatName}&sort[0]=timeStamp%3Aasc`
    );
    const result = await response.json();
    const data = result.data;
    console.log(data)
  let divTag = ""
  if(data.length===0) return
  data.forEach((obj => {
        const timeStamp = new Date(obj.attributes.timeStamp)
        const time = timeStamp.getHours() + ":" + timeStamp.getMinutes();
        divTag = divTag +`<div class="wrapper">
  <h3 id="sender">${obj.attributes.sender.data.attributes.name}</h3>
  <br>
  <p>${obj.attributes.Text}</p>
  <span class="time-right">${time}</span>
</div>`;
    }))
    chatBox.innerHTML = divTag
    activeChat = {
      id: `${data[0].attributes.channel.data.id}`,
     name: `${data[0].attributes.channel.data.attributes.name}`,
      type: "channel"
    };
}

async function sendMessage() {
  debugger;
  const userInput = messageText.value;
  const formattedTime = new Date();
  const body = {
    data: {
      Text: `${userInput}`,
      timeStamp:formattedTime,
      channel: {
        id: activeChat.id,
      },
      sender: {
        id: 1,
      },
    },
  };
  const url = `http://localhost:1337/api/messages`;
  const response = await fetch(url, {
    method: `POST`, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(()=>{getMessages(activeChat.name)})
  
  //     const response = await fetch(
  //         `http://localhost:1337/api/channels?filters[name][$eq]=All about API`
  //     );

  //     const timeMsg = new Date()
  //     const formatedTime= timeMsg. getHours() + ":" + timeMsg.getMinutes()
  //     const path = `messages`;
  //   const body = {
  //     data: {
  //       Text: `${userInput}`,
  //       timeStamp: `${formatedTime}`,
  //     },
  //   };
  //   const url = `http://localhost:1337/api/${path}`;
  //   const response = await fetch(url, {
  //     method: `POST`, // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   return response.json();
  // }
}

btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    sendMessage()
});