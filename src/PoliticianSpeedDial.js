import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { HowToVote as HowToVoteIcon, AttachMoney as AttachMoneyIcon, Extension as ExtensionIcon, CreditCard as CreditCardIcon, Event as EventIcon, Apartment as ApartmentIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function SpeedDialTooltipOpen(props) {
  const { onClickActions } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const actions = [
    { icon: <ApartmentIcon />, name: 'Industries', action: onClickActions.handleIndustry },
    { icon: <EventIcon />, name: 'Events', action: onClickActions.handleEvents },
    { icon: <CreditCardIcon />, name: 'Bills', action: onClickActions.handleBills },
    { icon: <ExtensionIcon />, name: 'Contributors', action: onClickActions.handleContribs},
    { icon: <HowToVoteIcon />, name: 'Votes', action: onClickActions.handleVotes },
    { icon: <AttachMoneyIcon />, name: 'Finances', action: onClickActions.handleFinances },
  ];

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
    props.handleBackdrop(true)
  };

  const handleClose = () => {
    setOpen(false);
    props.handleBackdrop(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
        mr={-5}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose();
              action.action()}}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
