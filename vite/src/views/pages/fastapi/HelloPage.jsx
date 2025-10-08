import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const HelloPage = () => {
  const [hello, setHello] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/hello')
      .then(res => res.json())
      .then(data => {
        setHello(data.message || 'No message');
        setLoading(false);
      })
      .catch(() => {
        setHello('Error fetching hello message');
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>Hello Message</Typography>
        {loading ? <CircularProgress /> : <Typography>{hello}</Typography>}
      </CardContent>
    </Card>
  );
};

export default HelloPage;