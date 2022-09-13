
const ulMenuDm = document.getElementById("users");
const ulMenuChannels = document.getElementById("channels")
const hEl=document.getElementById("recipient")
const chatBox=document.getElementById("chat")
async function getUsers() {
    const response = await fetch(`http://localhost:1337/api/clients?populate=avatar`);
    const result = await response.json();
    const users = result.data
    let liTag = "";
    users.forEach((obj => {
          debugger;
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

    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }

async function openChat(event) {
   hEl.innerHTML=`to ${event.target.innerText}:`
    const response = await fetch(
        `http://localhost:1337/api/messages?populate=channel,sender&filters[channel][name][$eq]=${event.target.innerText}`
    );
    const result = await response.json();
    const data = result.data;
    console.log(data)
    let divTag=""
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
    chatBox.innerHTML=divTag
}