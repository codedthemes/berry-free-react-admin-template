import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import MainCard from 'ui-component/cards/MainCard';
import financeApi from 'api/finance';

export default function FinanceSettings() {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setUrl(financeApi.baseUrl());
    setToken(financeApi.getToken());
  }, []);

  const save = () => {
    financeApi.setBaseUrl(url.trim());
    financeApi.setToken(token.trim());
    setStatus({ severity: 'success', msg: 'Saved.' });
  };

  const testConnection = async () => {
    setBusy(true);
    setStatus(null);
    try {
      const res = await financeApi.health();
      setStatus({ severity: 'success', msg: `Connected: ${JSON.stringify(res)}` });
    } catch (err) {
      setStatus({ severity: 'error', msg: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack spacing={3}>
      <MainCard title="FinanceLog settings">
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            The frontend talks to a Cloudflare Worker. Point it at your deployed URL (or <code>http://localhost:8787</code> while running{' '}
            <code>wrangler dev</code>). Credentials are stored in your browser&apos;s local storage — nothing is sent anywhere else.
          </Typography>
          <TextField
            label="API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://financelog-api.<you>.workers.dev"
            fullWidth
          />
          <TextField
            label="API token (optional)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="bearer token if you set API_TOKEN on the worker"
            fullWidth
            type="password"
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={save}>
              Save
            </Button>
            <Button variant="outlined" onClick={testConnection} disabled={busy}>
              {busy ? 'Testing…' : 'Test connection'}
            </Button>
          </Stack>
          {status && <Alert severity={status.severity}>{status.msg}</Alert>}
        </Stack>
      </MainCard>

      <MainCard title="How it works">
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <b>1. Upload.</b> PDFs are hashed (SHA-256) in the worker. If the hash already exists in D1 you get a 409 and nothing else
            happens — no duplicate Mistral spend, no duplicate data.
          </Typography>
          <Typography variant="body2">
            <b>2. Store.</b> The raw PDF goes into R2 keyed by its hash so you always have the source of truth.
          </Typography>
          <Typography variant="body2">
            <b>3. Extract.</b> Mistral OCR turns the PDF into markdown, then <code>mistral-large-latest</code> produces a strict JSON object
            with statement fields and every transaction.
          </Typography>
          <Typography variant="body2">
            <b>4. Persist.</b> The worker writes one row to <code>statements</code> and one row per line item to <code>transactions</code>{' '}
            in D1, all inside a batch.
          </Typography>
        </Stack>
      </MainCard>
    </Stack>
  );
}
