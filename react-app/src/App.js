
import { useState } from "react";
import Form from "./components/Form.js";
import SideBar from "./components/SideBar.js";
import { useChannels, useUsers } from "./hooks/useUsers";
const App = () => {
    const { users } = useUsers();
    const { channels } = useChannels()
    const [openForm, setOpenForm] = useState(false)
    const [activeForm, setActiveForm]=useState(null)
    const formDetails = (e) => {
        setOpenForm(true)
        setActiveForm(e.target.id);
        
    }
    const onSubmit = (entrance) => {
        const username = entrance.target.exampleInputText1.value;
        console.log(username)
     }
    
    return (
      <div className="container-fluid">
        <div className="row">
          <SideBar users={users} channels={channels} />
          <div className="col-10 min-vh-100">
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
                    <Form open={openForm} activeForm={activeForm} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    );
}
export default App;