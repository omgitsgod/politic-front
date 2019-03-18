import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = theme => ({
form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing.unit,
},
submit: {
  height: 0,
  width: 0
},
});

class NewConversationForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    HEADERS.Authorization = `Bearer ${this.props.user.jwt}`
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' });
  };

  render = () => {
        const { classes } = this.props;
    return (
      <div className="newConversationForm">
      <form
       className={classes.form}
       onSubmit={this.handleSubmit}
       autoComplete="off"
       >
        <FormControl margin="normal" required fullWidth >
          <InputLabel htmlFor="conversation">New Conversation</InputLabel>
          <Input id="conversation" name="conversation" value={this.state.title}  autoFocus onChange={this.handleChange} />
        </FormControl>

      </form>
      </div>
    );
  };
}


NewConversationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewConversationForm);
