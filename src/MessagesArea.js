import React from 'react';
import { Typography, Paper, Tabs, Tab } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import NewMessageForm from './NewMessageForm';


function MessagesArea(props) {

  const { conversation , user, onBack } = props;

  const orderedMessages = messages => {

    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    return sortedMessages.map(message => (
      <Paper style={{background: 'transparent', boxShadow: 'none'}}>
        <Typography key={message.id} variant='title' align='right' gutterBottom>
          {message.text}
        </Typography>
        <Typography variant='p' align='right' gutterBottom color='primary'>
          -{message.user}
        </Typography>
      </Paper>
    ));
  };

  return (
    <div className='messagesArea' style={{ background: 'transparent', boxShadow: 'none'}}>
      <Tabs
        variant='fullWidth'
        indicatorColor='secondary'
        textColor='secondary'
      >
        <Tab icon={<KeyboardBackspace />} value={'Back'} label='Back'  onClick={onBack}/>
      </Tabs>
      <Typography variant='display2' align='center' gutterBottom color='secondary'>
        {props.conversation.title}
      </Typography>
      <br />
      <br />
      <Paper align='right' style={{background: 'transparent', boxShadow: 'none'}}>
        {orderedMessages(conversation.messages)}
        <NewMessageForm user={user} conversation_id={conversation.id} />
      </Paper>
    </div>
  );
}

export default MessagesArea;
