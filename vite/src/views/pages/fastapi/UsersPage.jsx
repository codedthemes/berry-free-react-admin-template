import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>Users</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {users.map(user => (
              <ListItem key={user.id}>
                <ListItemText primary={user.name} secondary={`ID: ${user.id}`} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersPage;