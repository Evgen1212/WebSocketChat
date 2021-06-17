import './App.css';
import React, { useRef, useState } from 'react';


const App = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);

  //тут будем хранить наш веб сокет
  const socet = useRef();

  function connect() {

    //что бы не потерять его при перерендеренге 
    socet.current = new WebSocket('ws://localhost:5000')

    socet.current.onopen = () => {
      console.log("Socket открыт")
      setConnected(true);
      const message = {
        event: 'connection',
        username,
        id: Date.now()
      }
      socet.current.send(JSON.stringify(message))
    }
    socet.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [message, ...prev])
    }
    socet.current.onclose = () => {
      console.log("Socket закрыт")
    }
    socet.current.onerror = () => {
      console.log("Socket произошла ошибка")
    }
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message'
    }
    socet.current.send(JSON.stringify(message));
    setValue('');
  };




  const getRegist =
    <div className="App">
      <div className="form">
        <input type="text" value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Введите имя" />
      </div>
      <button onClick={connect}>Войти</button>
    </div >;

  const getMesage =
    <div className="App">
      <div className="form">
        <input type="text" value={value}
          onChange={e => setValue(e.target.value)} />
        <button onClick={sendMessage}>Отправить</button>
      </div>
      <div className="messages ">
        {messages.map(mess =>
          <div key={mess.id}>
            {mess.event === 'connection'
              ? <div> Пользователь {mess.username} подключился</div>
              :
              <div>{mess.username}: {mess.message}</div>
            }
          </div>)}
      </div>
    </div>;

  return (!connected) ? getRegist : getMesage


}




export default App;
