import React from 'react';
import NewMessageForm from './NewMessageForm';
import { Typography, Paper } from '@material-ui/core'

const MessagesArea = ({
  conversation: { id, title, messages },
}) => {
  return (
    <div className="messagesArea">
    <Typography variant='display2' align='center' gutterBottom>
      {title}
      </Typography>
      <Paper>{orderedMessages(messages)}
      <NewMessageForm conversation_id={id} />
      </Paper>
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return (<div>
      <Typography key={message.id} variant='display1' align='right' gutterBottom>
        {message.text}
        </Typography>
        <Typography variant='p' align='right' gutterBottom color='primary'>
          -username
          </Typography>
        </div>
    );
  });
};
