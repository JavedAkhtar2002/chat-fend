import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      {/* <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2> */}
      <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div>
    {
      users && users.length > 0 ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            {users.map((user) => (
              <div key={user.id} className="activeItem">
                <div><img alt="Online Icon" src={onlineIcon}/></div>
                <div>{user.name}</div>                
              </div>
            ))}
          </div>
        </div>
      ) : <h2>No users currently chatting</h2>
    }
  </div>
);

export default TextContainer;
