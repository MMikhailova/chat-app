import React from 'react'
import './SideBar.css'
import UserList from './UserList';
export default function SideBar({ users,channels }) {
  return (
    <>
      <UserList items={users} label={"Direct messages"} />
      <UserList items={channels} label={"Channels"} />
    </>
  );
}
