
import {  useEffect, useState } from "react";

import Form from "./components/Form.js";
import SideBar from "./components/SideBar.js";
import { useChannels, useUsers} from "./hooks/useUsers";

const App = () => {
    const { users } = useUsers();
    const { channels } = useChannels()
    const [openForm, setOpenForm] = useState(false)
    const [activeForm, setActiveForm] = useState(null)
    const [account, setAccount] = useState({})
    const [newUser, setNewUser] = useState([])
    const formDetails = (e) => {
        setOpenForm(true)
        setActiveForm(e.target.id);
        
    }
    const handleSubmit = (person) => {
        setAccount(person)
    }
    useEffect(() => {
        fetch("http://localhost:1337/api/auth/local/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username: account.username,
                email: account.email,
                password:account.password
            }),
        })
            .then((e) => e.json())
            .then((response) => {
                console.log(response);
                const data = response;
                setNewUser(data);
            })
    }, [account])
  

    
    return (
      <div
        className="d-flex text-white"
        style={{ height: "100vh", backgroundColor: "#133d44" }}
      >
        <div className="p-2 text-white" style={{ maxWidth: "200px" }}>
          <SideBar users={users} channels={channels} />
        </div>
        <div className="p-2 w-100" style={{ backgroundColor: "#22d1f8" }}>
          <button
            className="btn btn-outline-primary me-1"
            id="login"
            style={{ float: "right" }}
            onClick={(e) => formDetails(e)}
          >
            Login
          </button>
          <button
            className="btn btn-outline-primary me-1"
            id="signUp"
            style={{ float: "right" }}
            onClick={(e) => formDetails(e)}
          >
            Sign up
          </button>
          <Form
            open={openForm}
            activeForm={activeForm}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    );
}
export default App;