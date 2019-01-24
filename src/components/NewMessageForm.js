import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = theme => ({
form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing.unit,
},
submit: {
  marginTop: theme.spacing.unit * 3,
},
});

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id,
    user: this.props.user.user.username
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    HEADERS.Authorization = `Bearer ${this.props.user.jwt}`
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' });
  };

  render = () => {
    const { classes } = this.props;
    return (
      <div className="newMessageForm">
      <form
       className={classes.form}
       onSubmit={this.handleSubmit}
       autoComplete="off"
       style={{ background: 'transparent', boxShadow: 'none'}}
       >
        <FormControl margin="normal" required fullWidth >
          <InputLabel htmlFor="message">New Message</InputLabel>
          <Input id="message" name="message" value={this.state.text}  autoFocus onChange={this.handleChange} />
        </FormControl>

      </form>
      </div>

    );
  };
}
NewMessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewMessageForm);
