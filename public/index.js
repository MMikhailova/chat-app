
const ulMenuDm = document.getElementById("users");
const ulMenuChannels = document.getElementById("channels")
const hEl=document.getElementById("recipient")
const chatBox = document.getElementById("chat")
const btnSubmit = document.getElementById("submitMsg")
const messageText = document.getElementById("message");
const regForm = document.getElementById("regForm");
const logForm = document.getElementById("logForm");
let activeChat = {}
let activeUser = {}
let jwt = ''

//either form or btn is displayed 
function displayForm(str) {
 document.querySelector(".authentication").style.display = "none";
  str === "registration"?document.getElementById("registration").style.display = "flex" : document.getElementById("logInForm").style.display = "flex";
}
function closeForm(str) {
 document.querySelector(".authentication").style.display = "flex";
str === "registration"
  ? (document.getElementById("registration").style.display = "none")
  : (document.getElementById("logInForm").style.display = "none");
}
   
//loading data about channels and users
async function loadPage() {
  //fetch users
  const responseU = await fetch(
    `http://localhost:1337/api/users?populate=avatar`
  );
  const users= await responseU.json();
  console.log(users);
  ulMenuDm.innerHTML = createList(users);
  //fetch channels
  const responseC = await fetch(`http://localhost:1337/api/channels`)
  const resultC = await responseC.json();
  const channels = resultC.data;
  ulMenuChannels.innerHTML = createChannelList(channels);
}
loadPage();


function createList(users) {
  let liTag = "";
  users.forEach((user) => {
    // const url = user.avatar.formats.thumbnail.url;
    liTag =
      `<li onclick="openDM(event)"><span><img class="avatar" src="./" alt=""></img></span> ${user.username}</li>` +
      liTag;
  })
  return liTag;
}

function createChannelList(channels) {
   let liTag = "";
    channels.forEach((channel) => {
      liTag =
        `<li onclick="openChat(event)">${channel.attributes.name}</li>` +
        liTag;
    });
  return liTag;
}

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

async function registration(e) {
  e.preventDefault();
  closeForm('registration');
  const response = await fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      username: e.target.elements.uname.value,
      email: e.target.elements.eml.value,
      password: e.target.elements.psw.value
    })
  });
  const data = await response.json();
  const newUser = data.user
  console.log(newUser);
  
}

async function authentication(e) {
  e.preventDefault();
  closeForm('login');
  const result = await fetch("http://localhost:1337/api/auth/local", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({ identifier: e.target.elements.uname.value, password: e.target.elements.psw.value})
    });
    const body = await result.json();
  console.log('the JWT token:', body.jwt);
  activeUser=body.user
    jwt = body.jwt;
    console.log(activeUser);
}



function openChat(event) {
  debugger;
        hEl.innerHTML = `${event.target.innerText}`
    const chatName = event.target.innerText;
    getMessages(chatName)
}

async function getMessages(chatName){
    const response = await fetch(
      `http://localhost:1337/api/messages?populate=channel,sender&filters[channel][name][$eq]=${chatName}&sort[0]=timeStamp%3Aasc`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
    const result = await response.json();
    const data = result.data;
  console.log(data)
  let divTag = ""
  // if(data.length===0) return
  data.forEach((obj => {
        const timeStamp = new Date(obj.attributes.timeStamp)
        const time = timeStamp.getHours() + ":" + timeStamp.getMinutes();
        divTag = divTag +`<div class="wrapper">
  <h3 id="sender">${obj.attributes.sender.data.attributes.username}</h3>
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

// async function sendMessage(e) {
//   debugger;
//   const userInput = messageText.value;
//   const formattedTime = new Date();
//   const body = {
//     data: {
//       Text: `${userInput}`,
//       timeStamp:formattedTime,
//       channel: {
//         id: activeChat.id,
//       },
//       sender: {
//         id: activeUser.id ,
//       },
//     },
//   };
//   const url = `http://localhost:1337/api/messages`;
//   const response = await fetch(url, {
//     method: `POST`, 
//     headers: {
//       "Authorization": `Bearer ${jwt}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   })
//     .then(() => { getMessages(activeChat.name) })
//   .catch(()=>alert('Please log in!'))
// }

// btnSubmit.addEventListener("click", function (e) {
//     e.preventDefault();
//     sendMessage()
// });

// async function authentic() {
//     const username = prompt("username");
//   const password = prompt("password");
//    const email = prompt("email");
//     const result = await fetch("http://localhost:1337/api/auth/local/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: JSON.stringify({ username: username, password: password, email:email }),
//     });
//     const body = await result.json();
//     console.log('the JWT token:', body.jwt);
//     jwt = body.jwt
//   await getUsers();
//   await getChannels();

// }
// authentic();