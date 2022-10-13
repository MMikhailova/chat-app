import { useState, useEffect } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:1337/api/users`)
      .then((e) => e.json())
      .then((response) => {
        console.log(response);
        const userList = response;
        setUsers(userList);
      })
      .catch(console.warn);
  }, []);
  return { users };
};

export const useChannels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/channels`)
      .then((e) => e.json())
      .then((response) => {
        const channelList = response.data;
        setChannels(channelList);
      })
      .catch(console.warn);
  }, []);
   
  return { channels};
};
 
// export const signUp = ({ person }) => {
//   const [newUser,setNewUser]=useState([])
//   useEffect(() => {
//             fetch("http://localhost:1337/api/auth/local/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     // 'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: JSON.stringify({
//                     username: person.username,
//                     email: person.email,
//                     password: person.password
//                 }),
//             })
//                 .then((e) => e.json())
//                 .then((response) => {
//                     console.log(response);
//                     const data = response;
//                     setNewUser(data);
//                 })
//   }, [person])
//   return {newUser}
//     }