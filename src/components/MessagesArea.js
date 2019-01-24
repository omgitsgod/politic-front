import React from 'react';
import NewMessageForm from './NewMessageForm';
import { Typography, Paper, Tabs, Tab } from '@material-ui/core'
import { KeyboardBackspace } from '@material-ui/icons'


const MessagesArea = (props) => {
  console.log(props)
  return (
    <div className="messagesArea" style={{ background: 'transparent', boxShadow: 'none'}}>
    <Tabs
    //  value={this.state.tab}
    // onChange={this.handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<KeyboardBackspace />} value={"Back"} label="Back"  onClick={props.onBack}/>


    </Tabs>
    <Typography variant='display2' align='center' gutterBottom>
      {props.conversation.title}
      </Typography>
      <Paper>{orderedMessages(props.conversation.messages)}
      <NewMessageForm user={props.user} conversation_id={props.conversation.id} />
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
    return (<Paper style={{ background: 'transparent', boxShadow: 'none'}}>
      <Typography key={message.id} variant='display1' align='right' gutterBottom>
        {message.text}
        </Typography>
        <Typography variant='p' align='right' gutterBottom color='primary'>
          -{message.user}
          </Typography>
        </Paper>
    );
  });
};
