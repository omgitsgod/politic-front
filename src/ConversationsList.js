import React, { useState, useEffect } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Typography, Tab, Tabs } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';


function ConversationsList(props) {

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [topic, setTopic] = useState('');
  const { user } = props;

  const handleClick = (id) => {
    
    setActiveConversation(id);
  }

  const handleReceivedConversation = (response) => {

    const { conversation } = response;

    setConversations([...conversations, conversation]);
  };

    const handleChange = async (event, change) => {

      setTopic(change);
    }

  const onBack = () => {

    setActiveConversation(null);
  }

  const handleReceivedMessage = (response) => {

    const { message } = response;
    const tempConversations = [...conversations];
    const conversation = tempConversations.find(convo => convo.id === message.conversation_id);

    conversation.messages = [...conversation.messages, message];
    setConversations(tempConversations);
  };

  const fetchConversations = async () => {

    const json = await fetch(`${process.env.REACT_APP_API_ROOT}/conversations`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.props.user.jwt}`
        }
      }).then(r => r.json());

    setConversations(json);
  }

  const findActiveConversation = (conversations, activeConversation) => {
    
    return conversations.find(conversation => conversation.id === activeConversation);
  }

  const mapConversations = (conversations  = [], handleClick) => {
    
    return conversations.map(conversation => (
      <Tab 
        key={conversation.id} 
        icon={<Chat />} 
        value={conversation.title} 
        label={conversation.title} 
        onClick={() => handleClick(conversation.id)} 
      />
    ));
  }

  useEffect(() => {

    fetchConversations();
  }, [])

  return (
    <div className='conversationsList'>
      <ActionCable
        channel={{channel: 'ConversationsChannel'}}
        onReceived={handleReceivedConversation}
      />
      {conversations.length ? (
        <Cable
          conversations={conversations}
          handleReceivedMessage={handleReceivedMessage}
        />
      ) 
      : 
        null
      }
      {!activeConversation ?
        <div>
          <Tabs
            value={topic}
            onChange={handleChange}
            indicatorColor='secondary'
            textColor='secondary'
            variant='scrollable'
            scrollButtons='auto'
          >
            {mapConversations(conversations, handleClick)}
          </Tabs>
          <Typography variant='display2' align='center' gutterBottom>
            Conversations
          </Typography>
          <NewConversationForm user={user} />
        </div>
      :
        <MessagesArea
          user={user}
          conversation={findActiveConversation(conversations, activeConversation)}
          style={{background: 'transparent', boxShadow: 'none'}}
          onBack={onBack}
        />
      }
    </div>
  );
}

export default ConversationsList;
