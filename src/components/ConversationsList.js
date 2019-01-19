import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import { Typography, Paper, Grid, Button } from '@material-ui/core'

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
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
        <Typography variant='display2' align='center' gutterBottom>
          Conversations
          </Typography>
            <Grid container spacing={16}>
        {mapConversations(conversations, this.handleClick)}
        </Grid>
        <NewConversationForm user={this.props.user} />
        {activeConversation ? (
          <MessagesArea
          user={this.props.user}
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
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
      <Grid item xs={5}>
      <Paper>
      <Button key={conversation.id}   gutterBottom onClick={() => handleClick(conversation.id)}>
        {conversation.title}
        </Button>
        </Paper>
        </Grid>
    );
  });
};
