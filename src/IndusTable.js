import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, total, individual, pac) {
  id += 1;
  return { id, name, total, individual, pac};
}





function SimpleTable(props) {
  const { classes } = props;
  const rows = props.industry.map(industry => createData(industry["@attributes"].industry_name, `$${industry["@attributes"].total}`, `$${industry["@attributes"].indivs}`, `$${industry["@attributes"].pacs}` ))
  return (
    <Paper className={classes.root} style={{ opacity: '.7', boxShadow: 'none'}}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Industry</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Individuals</TableCell>
            <TableCell align="right">PACS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.individual}</TableCell>
              <TableCell align="right">{row.pac}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
