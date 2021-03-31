import { createContext, useEffect, useState } from "react"

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
      // console.log('Status:', response.statusCode);
      // console.log('Headers:', JSON.stringify(response.headers));
      // console.log('Response:', body);
      const userData = JSON.parse(body);
      setUser(userData);
    });
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}