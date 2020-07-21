import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


function ContributionTable(props) {

  const { classes, contribs } = props;
  let id = 0;

  const createData = (name, amount) => {
    
    id += 1;
    return { id, name, amount };
  }

  const rows = contribs.map((contrib) =>
    createData(
      contrib['@attributes'].org_name,
      `$${contrib['@attributes'].total}`
    )
  );

  return (
    <Paper className={classes.root} style={{ opacity: '.7', boxShadow: 'none'}}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Contributor</TableCell>
            <TableCell align='right'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ContributionTable.propTypes = {
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

export default withStyles(styles)(ContributionTable);
