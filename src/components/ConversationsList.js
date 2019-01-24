import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import { Typography, Paper, Grid, Button, Tab, Tabs } from '@material-ui/core'
import { AccessTime } from '@material-ui/icons'

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
    chat: ''
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.user.jwt}`
      }
    })
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  onBack = () => {
    this.setState({activeConversation: null})
  }

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        { !activeConversation ?
          <div>
          <Tabs
            value={this.state.topic}
           onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
          scrollButtons="auto"
          >
        {mapConversations(conversations, this.handleClick)}
        </Tabs>
        <Typography variant='display2' align='center' gutterBottom>
          Conversations
          </Typography>
        <NewConversationForm user={this.props.user} />

        </div>
        :
        <MessagesArea
        user={this.props.user}
          conversation={findActiveConversation(
            conversations,
            activeConversation

          )}
          style={{ background: 'transparent', boxShadow: 'none'}}
          onBack={this.onBack}
        />
      }
      </div>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations  = [], handleClick) => {
  return conversations.map(conversation => {
    return (

<Tab key={conversation.id} icon={<AccessTime />} value={conversation.title} label={conversation.title} onClick={() => handleClick(conversation.id)} />



    );
  });
};
