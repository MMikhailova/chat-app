import React from 'react'
import './SideBar.css'
import UserList from './UserList';
export default function SideBar({ users,channels }) {
  return (
    <div className="col-2 min-vh-100" style={{backgroundColor:"lightGray"}}>
      <UserList items={users} label={"Direct messages"} />
      <UserList items={channels} label={"Channels"} />
    </div>
  );
}
