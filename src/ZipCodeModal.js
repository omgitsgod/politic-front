import React from 'react';
import { Typography, Modal, Backdrop, Fade, FormControl, InputLabel, Input, IconButton, Button, Divider } from '@material-ui/core';
import  { GpsFixedTwoTone as LocationIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';


function ZipCodeModal(props) {

    const { classes, open, setOpen, setZip } = props;

    const handleClose = () => {

        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const zipCode = e.target.zipcode.value;
        zipCode.match(/^\d{5}(-\d{4})?$/) ? setZip(zipCode) : console.log('nope')
    };

    const handleLocation = async (position) => {

        const { latitude, longitude } = position.coords;
        const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/zip/${latitude}/${longitude}`).then(r => r.json());
        const location = json.Response.View[0].Result[0].Location.Address;
        const addy = `${location.HouseNumber}%20${location.Street}%20${location.PostalCode}`.split(' ').join('%20');

        console.log(location.PostalCode);
        setZip(location.PostalCode);
    }

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant='h5'>
                        Enter Zip Code
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormControl margin='normal' required fullWidth>
                        <InputLabel htmlFor='zipcode'>Zip Code</InputLabel>
                        <Input
                            id='zipcode'
                            name='zipcode'
                            autoFocus
                            autoComplete='off'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.submit}
                            style={{ background: 'transparent', boxShadow: 'none' }}
                        >
                            Submit
                        </Button>
                        </FormControl>
                    </form>
                    <Divider />
                    <Typography variant='h5'>
                        Allow Access To Location
                    </Typography>
                    <IconButton
                        aria-haspopup='true'
                        color='primary'
                        onClick={() =>
                        navigator.geolocation.getCurrentPosition(handleLocation)
                        }
                    >
                        <LocationIcon />
                        Find Me
                    </IconButton>
                </div>
            </Fade>
        </Modal>
    );
}

const styles = (theme) => ({

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

export default withStyles(styles)(ZipCodeModal);
