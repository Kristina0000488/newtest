import React  , { useState}          from 'react';

import axios from "axios";

import './App.css';

let api = axios.create( { } );

api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
api.defaults.headers.common['Accept']     = 'application/json';

function App() {
  const [ name, setName ] = useState('alex');
  const [ email, setEmail ] = useState('alex2020@gmail.com');
  const [ message, setMessage ] = useState('');

  const onSubmit = (e) => {
      e.preventDefault();
      
      if ( !validateEmail() || !validateName() ) {
          setMessage('error');
      } else {
          setMessage('posting');
          sendData();
      }
  }

  const sendData = async () => {
      const data = {
          name, email
      };

      try {
          const resp = await api.post("http://localhost:8000/add", data);
          setMessage('successfully');
      } catch (error) {
          setMessage('bad request');
      }
  }

  const validateName = () => { 
      return !!name;
  }

  const validateEmail = () => { 
      return /^[\w-\.]+@\w+.(\w{2,5})$/ig.test( email );
  }
  
  return (
      <div className='app'>
          <form onSubmit={onSubmit}>
              <input type="text" value={ name } minLength={1} onChange={ (e) => setName(e.target.value) } />
              <input type='text' value={ email } minLength={1} onChange={ (e) => setEmail(e.target.value) } />
              <button>Submit</button>
          </form>
          <p>{ message }</p>
      </div>
  )
}

export default App;
