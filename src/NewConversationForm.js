import React, { useState } from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';


function NewConversationForm(props) {

  const [title, setTitle] = useState('');
  const { classes, user } = props;

  const handleChange = (e) => {

    setTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    fetch(`${process.env.REACT_APP_API_ROOT}/conversations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      body: JSON.stringify({title})
    });
    setTitle('')
  }

  return (
    <div className='newConversationForm'>
      <form
      className={classes.form}
      onSubmit={handleSubmit}
      autoComplete='off'
      >
        <FormControl margin='normal' required fullWidth >
          <InputLabel htmlFor='conversation'>New Conversation</InputLabel>
          <Input id='conversation' name='conversation' value={title}  autoFocus onChange={handleChange} />
        </FormControl>
      </form>
    </div>
  );
}

NewConversationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    height: 0,
    width: 0
  },
});

export default withStyles(styles)(NewConversationForm);
