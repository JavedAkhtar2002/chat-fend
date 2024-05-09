import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket

const Chat = () => {
 
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'https://chat-application-rodd.onrender.com'

  const location = useLocation()

  useEffect(() => {    
     const { name, room } = queryString.parse(location.search)

     socket = io(ENDPOINT)
     setName(name)
     setRoom(room)

     socket.emit('join', { name, room }, ()=>{
      
     })

     return () => {      
      socket.disconnect()
      socket.off()
    }
    

  }, [location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  
    socket.on('roomData', ({ user }) => {
      if (user) {
        // Update the users state with the received user information
        setUsers(user)
      }
    });
  }, [messages, name]);  


  const sendMessage = (event) => {
    event.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)

  return (
    <div className='outerContainer'>
      <div className='container'>
      <InfoBar room={room}/>
      <Messages messages={messages} name={name}/>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat
