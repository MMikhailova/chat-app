import React from 'react'

export default function Form({ open, activeForm, onSubmit }) {
    return (
      <>
        {open && (
          <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }} className="w-25" style={{ margin: "auto" }}>
            <div className="mb-3 mt-3">
              <label htmlFor="exampleInputText1" className="form-label">
                Username
              </label>
              <input
                            type="text"
                className="form-control"
                id="exampleInputText1"
                aria-describedby="emailHelp"
                required
              ></input>
            </div>
            <div
              style={{
                display: `${activeForm === "signUp" ? "block" : "none"}`,
              }}
              className="mb-3"
            >
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              ></input>
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              ></input>
            </div>
            <button
              type="submit"
              style={{
                display: `${activeForm === "signUp" ? "block" : "none"}`,
              }}
              className="btn btn-outline-primary"
            >
              Sign up
            </button>
            <button
              style={{
                display: `${activeForm === "login" ? "block" : "none"}`,
              }}
              type="submit"
              className="btn btn-primary me-1"
             
            >
              Login
            </button>
          </form>
        )}
      </>
    );
};