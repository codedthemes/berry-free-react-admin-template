import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, Typography, Button,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    List, ListItem, ListItemText, IconButton, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SamplePage = () => {
    const [samples, setSamples] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);

    const fetchSamples = () => {
        setLoading(true);
        fetch('http://localhost:8000/api/samples/')
            .then(res => res.json())
            .then(data => {
                setSamples(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchSamples(); }, []);

    const handleOpen = (sample = { name: '', description: '' }, id = null) => {
        setForm(sample);
        setEditId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm({ name: '', description: '' });
        setEditId(null);
    };

    const handleSave = () => {
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `http://localhost:8000/api/samples/${editId}` : 'http://localhost:8000/api/samples/';
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(() => {
                fetchSamples();
                handleClose();
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/api/samples/${id}`, { method: 'DELETE' })
            .then(() => fetchSamples());
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>Samples</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>Add Sample</Button>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {samples.map(sample => (
                            <ListItem key={sample.id}
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" onClick={() => handleOpen(sample, sample.id)}><EditIcon /></IconButton>
                                        <IconButton edge="end" onClick={() => handleDelete(sample.id)}><DeleteIcon /></IconButton>
                                    </>
                                }
                            >
                                <ListItemText primary={sample.name} secondary={sample.description} />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{editId ? 'Edit' : 'Add'} Sample</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave} variant="contained">{editId ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default SamplePage;