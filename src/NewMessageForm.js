import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';


function NewMessageForm(props) {

  const [text, setText] = useState('');
  const [conversation_id, setConversation_id] = useState(props.conversation_id);
  const { classes, user } = props;

  const handleChange = (e) => {

    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      body: JSON.stringify({text, conversation_id})
    });
    setText('');
  }

  useEffect(() => {

    setConversation_id(props.conversation_id);
  }, [props.conversation_id])

  return (
    <div className='newMessageForm'>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        autoComplete='off'
        style={{ background: 'transparent', boxShadow: 'none'}}
      >
        <FormControl margin='normal' required fullWidth >
          <InputLabel htmlFor='message'>New Message</InputLabel>
          <Input id='message' name='message' value={text}  autoFocus onChange={handleChange} />
        </FormControl>
      </form>
    </div>
  );
}

NewMessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({

  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

export default withStyles(styles)(NewMessageForm);
