import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import MainCard from 'ui-component/cards/MainCard';
import financeApi from 'api/finance';
import { formatMoney, formatDate, percent } from 'utils/finance-format';

export default function FinanceStatements() {
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR('statements', () => financeApi.listStatements());
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const rows = data?.statements || [];

  const handleDelete = async (id) => {
    await financeApi.deleteStatement(id);
    setConfirmDelete(null);
    mutate('statements');
    mutate('summary');
  };

  return (
    <Stack spacing={3}>
      <MainCard>
        <Typography variant="h4">Imported statements</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Every PDF you&apos;ve uploaded, with the fields Mistral extracted. The original PDF is stored in R2 and can be re-opened at any
          time.
        </Typography>
      </MainCard>

      <MainCard content={false}>
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error.message}
          </Alert>
        )}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                <TableCell>Period</TableCell>
                <TableCell align="right">Closing</TableCell>
                <TableCell align="right">Min payment</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>APR</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!isLoading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 6 }}>
                      <Typography color="text.secondary">No statements yet. Head to Upload to import your first PDF.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {rows.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {s.account_name || s.issuer || s.pdf_filename}
                      {s.last_four ? ` •${s.last_four}` : ''}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {s.issuer}
                      {s.account_type ? ` · ${s.account_type.replace('_', ' ')}` : ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(s.period_start)} – {formatDate(s.period_end)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      stmt {formatDate(s.statement_date)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{formatMoney(s.closing_balance, s.currency)}</TableCell>
                  <TableCell align="right">{formatMoney(s.minimum_payment, s.currency)}</TableCell>
                  <TableCell>{formatDate(s.payment_due_date)}</TableCell>
                  <TableCell>
                    {s.interest_rate_purchase != null && (
                      <Chip size="small" color="warning" variant="outlined" label={percent(s.interest_rate_purchase)} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => setSelected(s.id)} title="View details">
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      component="a"
                      href={financeApi.statementPdfUrl(s.id)}
                      target="_blank"
                      rel="noreferrer"
                      title="Open PDF"
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setConfirmDelete(s)} title="Delete">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      <StatementDialog id={selected} onClose={() => setSelected(null)} />

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Delete this statement?</DialogTitle>
        <DialogContent>
          <Typography>
            This removes the statement, its {''}
            {confirmDelete?.pdf_filename ? <b>{confirmDelete.pdf_filename}</b> : 'PDF'} from R2, and all of its transactions. You can
            re-upload the same PDF afterwards.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(confirmDelete.id)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function StatementDialog({ id, onClose }) {
  const { data, isLoading } = useSWR(id ? `statement-${id}` : null, () => financeApi.getStatement(id));
  const s = data?.statement;
  const txs = data?.transactions || [];

  return (
    <Dialog open={!!id} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{s ? `${s.account_name || s.issuer || 'Statement'}${s.last_four ? ` •${s.last_four}` : ''}` : 'Statement'}</DialogTitle>
      <DialogContent dividers>
        {isLoading && <Skeleton variant="rounded" height={200} />}
        {s && (
          <Stack spacing={2}>
            <Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {s.statement_date && <Chip size="small" label={`statement ${formatDate(s.statement_date)}`} />}
                {s.period_start && <Chip size="small" label={`${formatDate(s.period_start)} – ${formatDate(s.period_end)}`} />}
                {s.payment_due_date && <Chip size="small" color="warning" label={`due ${formatDate(s.payment_due_date)}`} />}
                {s.interest_rate_purchase != null && (
                  <Chip size="small" color="warning" variant="outlined" label={`purchase APR ${percent(s.interest_rate_purchase)}`} />
                )}
                {s.interest_rate_cash != null && (
                  <Chip size="small" color="warning" variant="outlined" label={`cash APR ${percent(s.interest_rate_cash)}`} />
                )}
              </Stack>
            </Box>
            <Divider />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Metric label="Opening" value={formatMoney(s.opening_balance, s.currency)} />
              <Metric label="Closing" value={formatMoney(s.closing_balance, s.currency)} />
              <Metric label="Minimum" value={formatMoney(s.minimum_payment, s.currency)} />
              <Metric label="Credit limit" value={formatMoney(s.credit_limit, s.currency)} />
              <Metric label="Available" value={formatMoney(s.available_credit, s.currency)} />
            </Stack>
            <Divider />
            <Typography variant="subtitle1">{txs.length} transactions</Typography>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {txs.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{formatDate(t.tx_date || t.post_date)}</TableCell>
                      <TableCell>{t.description}</TableCell>
                      <TableCell>{t.category || '—'}</TableCell>
                      <TableCell align="right" sx={{ color: Number(t.amount) > 0 ? 'error.main' : 'success.main' }}>
                        {formatMoney(t.amount, s.currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        {s && (
          <Button component="a" href={financeApi.statementPdfUrl(s.id)} target="_blank" rel="noreferrer">
            Open PDF
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function Metric({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  );
}
