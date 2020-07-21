import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


function FinanceTable(props) {

  const { classes, assets } = props;
  let id = 0;

  const createData = (name, holdings_low, holdings_high) => {
  
  id += 1;
  return { id, name, holdings_low, holdings_high };
  }

  const rows = assets.map((asset) =>
    createData(
      asset['@attributes'].name,
      `$${asset['@attributes'].holdings_low}`,
      `$${asset['@attributes'].holdings_high}`
    )
  );

  return (
    <Paper className={classes.root} style={{ opacity: '.7', boxShadow: 'none'}}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Investment</TableCell>
            <TableCell align='right'>Holdings Low End</TableCell>
            <TableCell align='right'>Holdings High End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.holdings_low}</TableCell>
              <TableCell align='right'>{row.holdings_high}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

FinanceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({

  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

export default withStyles(styles)(FinanceTable);

