import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const StatusEnvio = () => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: 300, maxWidth: '100%' }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Typography variant="h5" gutterBottom>
                    Endereço do Envio
                </Typography>
            </div>
            <div label="Pacote">
                <TextField id="outlined-multiline-flexible" label="Estado do Brasil" multiline />
                <TextField id="outlined-textarea" label="Cidade" multiline />
                <TextField id="outlined-textarea" label="Bairro ou Distrito" multiline />
                <TextField id="outlined-textarea" label="Nome da Rua" multiline />
                <TextField id="outlined-textarea" label="Número" multiline />
                <TextField id="outlined-textarea" label="Complemento" multiline />
            </div>
            <p></p>
            <div>
                <Typography variant="h5" gutterBottom>
                    Dados do Pacote
                </Typography>
            </div>
            <div label="Pacote">
                <TextField id="outlined-multiline-flexible" label="Hash Destinatário" multiline />
                <TextField id="outlined-multiline-flexible" label="Descrição do Pacote" multiline style={{ marginBottom: '2em' }} />
            </div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Button size="large" variant="contained" margin="hard">
                    Atualizar Status
                </Button>
            </Grid>
        </Box>
    );
};

export default StatusEnvio;
