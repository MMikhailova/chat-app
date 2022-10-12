import React, { useState } from 'react'

export default function UserList({ items, label }) {
  const [expanded, setExpanded]=useState('false')
    return (
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle w-100"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded={expanded}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {label}
        </button>
        <ul
          className="dropdown-menu w-100 text-center"
          aria-labelledby="dropdownMenuButton1"
        >
          {items.map((item) => (
            <li className="dropdown-item" key={item.id}
            >
              {item.username ? item.username : item.attributes.name}
            </li>
          ))}
        </ul>
      </div>
    );
}
