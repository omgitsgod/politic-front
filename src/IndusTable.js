import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


function IndusTable(props) {

  const { classes, industry } = props;
  const rows = industry.map(industry => createData(industry['@attributes'].industry_name, `$${industry['@attributes'].total}`, `$${industry['@attributes'].indivs}`, `$${industry['@attributes'].pacs}` ));
  let id = 0;

  const createData = (name, total, individual, pac) => {

    id += 1;
    return { id, name, total, individual, pac };
  }
  
  return (
    <Paper className={classes.root} style={{ opacity: '.7', boxShadow: 'none'}}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Industry</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Individuals</TableCell>
            <TableCell align='right'>PACS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.total}</TableCell>
              <TableCell align='right'>{row.individual}</TableCell>
              <TableCell align='right'>{row.pac}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

IndusTable.propTypes = {
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

export default withStyles(styles)(IndusTable);
