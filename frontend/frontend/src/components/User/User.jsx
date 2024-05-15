import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: '450px', 
    maxWidth: '900px', 
    overflowY: 'auto',
  },
  tableCellHeader: {
    fontWeight: 'bold', 
  },
  tableCellBody: {
    fontWeight: '300',
  },
});

const UserTable = ({ users }) => {
    const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCellHeader}>Name</TableCell>
            <TableCell className={classes.tableCellHeader}>Email</TableCell>
            <TableCell className={classes.tableCellHeader}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className={classes.tableCellBody}>{user.name}</TableCell>
              <TableCell className={classes.tableCellBody}>{user.email}</TableCell>
              <TableCell className={classes.tableCellBody}>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;