import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});

  function loadProfile() {
    const request = require('request');
    const options = {
      method: 'GET',
      url: 'https://coding-challenge-api.aerolab.co/user/me',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${props.token}`
      }
    };
    request(options, function (error, response, body) {
      !error ?
      setUser(JSON.parse(body)) :
      console.log(error);
    });
  }

  useEffect(() => {
    loadProfile();
  });

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}