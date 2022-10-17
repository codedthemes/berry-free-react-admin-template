//import Box from '@mui/material/Box';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useState } from 'react';

const useStyles = makeStyles({
    field: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    }
});

export default function Cadastrar() {
    const classes = useStyles();
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [hash, setHash] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (estado && cidade && bairro && rua && numero & complemento && hash && desc) {
            console.log(estado, cidade, bairro, rua, numero, complemento, hash, desc);
        }
    };

    return (
        <Container>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom>
                    Endereço do Envio
                </Typography>
                <TextField
                    onChange={(e) => setEstado(e.target.value)}
                    className={classes.field}
                    id="outlined"
                    label="Estado do Brasil"
                    required
                />
                <TextField
                    onChange={(e) => setCidade(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Cidade"
                    multiline
                    required
                />
                <TextField
                    onChange={(e) => setBairro(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Bairro ou Distrito"
                    multiline
                    required
                />
                <TextField
                    onChange={(e) => setRua(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Nome da Rua"
                    multiline
                    required
                />
                <TextField
                    onChange={(e) => setNumero(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Número"
                    multiline
                    required
                />
                <TextField
                    onChange={(e) => setComplemento(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Complemento"
                    multiline
                    required
                    fullWidth
                />

                <Typography variant="h5" gutterBottom>
                    Dados do Pacote
                </Typography>

                <TextField
                    onChange={(e) => setHash(e.target.value)}
                    className={classes.field}
                    id="outlined"
                    label="Hash Destinatário"
                    required
                    fullWidth
                />
                <TextField
                    onChange={(e) => setDesc(e.target.value)}
                    id="outlined"
                    label="Descrição do Pacote"
                    multiline
                    required
                    className={classes.field}
                    fullWidth
                    rows={3}
                />
                <Button size="large" variant="contained" margin="normal">
                    Cadastrar Novo Envio
                </Button>
            </form>
        </Container>
    );
}
