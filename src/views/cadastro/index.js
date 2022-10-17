import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Grid } from '@mui/material';

// Para as margens

const useStyles = makeStyles({
    field: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    }
});

export default function Cadastrar() {
    const classes = useStyles();

    // Declaraões das Variáveis

    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [hash, setHash] = useState('');
    const [desc, setDesc] = useState('');

    // Variáveis auxiliares para checagem dos campos

    const [estadoError, setEstadoError] = useState(false);
    const [cidadeError, setCidadeError] = useState(false);
    const [bairroError, setBairroError] = useState(false);
    const [ruaError, setRuaError] = useState(false);
    const [numeroError, setNumeroError] = useState(false);
    const [complementoError, setComplementoError] = useState(false);
    const [hashError, setHashError] = useState(false);
    const [descError, setDescError] = useState(false);

    // Checagens e Submissão

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recolocando as variáveis em false para campos saírem do vermelho

        setEstadoError(false);
        setCidadeError(false);
        setBairroError(false);
        setRuaError(false);
        setNumeroError(false);
        setComplementoError(false);
        setHashError(false);
        setDescError(false);

        // Checagem: deixa vermelho os campos não preenchidos

        if (estado == '') {
            setEstadoError(true);
        }
        if (cidade == '') {
            setCidadeError(true);
        }
        if (bairro == '') {
            setBairroError(true);
        }
        if (rua == '') {
            setRuaError(true);
        }
        if (numero == '') {
            setNumeroError(true);
        }
        if (complemento == '') {
            setComplementoError(true);
        }
        if (hash == '') {
            setHashError(true);
        }
        if (desc == '') {
            setDescError(true);
        }

        // Submissão: só prossegue com todos os campos preenchidos

        if (estado && cidade && bairro && rua && numero && complemento && hash && desc) {
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
                    error={estadoError}
                />
                <TextField
                    onChange={(e) => setCidade(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Cidade"
                    multiline
                    required
                    error={cidadeError}
                />
                <TextField
                    onChange={(e) => setBairro(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Bairro ou Distrito"
                    multiline
                    required
                    error={bairroError}
                />
                <TextField
                    onChange={(e) => setRua(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Nome da Rua"
                    multiline
                    required
                    error={ruaError}
                />
                <TextField
                    onChange={(e) => setNumero(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Número"
                    multiline
                    required
                    error={numeroError}
                />
                <TextField
                    onChange={(e) => setComplemento(e.target.value)}
                    className={classes.field}
                    id="outlined-textarea"
                    label="Complemento"
                    multiline
                    required
                    fullWidth
                    error={complementoError}
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
                    error={hashError}
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
                    error={descError}
                />
                <p></p>
                <Grid container direction="column" alignItems="center">
                    <Button size="large" variant="contained" margin="dense" endIcon={<KeyboardArrowRight />} type="submit">
                        Cadastrar Novo Envio
                    </Button>
                </Grid>
            </form>
        </Container>
    );
}
