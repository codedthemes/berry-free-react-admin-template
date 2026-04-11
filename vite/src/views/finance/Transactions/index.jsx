import { useMemo, useState } from 'react';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import SearchIcon from '@mui/icons-material/Search';

import MainCard from 'ui-component/cards/MainCard';
import financeApi from 'api/finance';
import { formatMoney, formatDate, CATEGORY_COLORS } from 'utils/finance-format';

export default function FinanceTransactions() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const key = useMemo(() => ['transactions', q, category, from, to], [q, category, from, to]);
  const { data, error, isLoading } = useSWR(key, () => financeApi.listTransactions({ q, category, from, to, limit: 1000 }));
  const { data: catData } = useSWR('categories', () => financeApi.listCategories());

  const rows = useMemo(() => data?.transactions || [], [data]);
  const categories = catData?.categories || [];

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const t of rows) {
      const a = Number(t.amount || 0);
      if (a > 0) expense += a;
      else income += -a;
    }
    return { income, expense, net: income - expense };
  }, [rows]);

  return (
    <Stack spacing={3}>
      <MainCard>
        <Stack spacing={2}>
          <Typography variant="h4">Transactions</Typography>
          <Typography variant="body2" color="text.secondary">
            Unified ledger of every line item pulled from your imported statements. Positive amounts are money out (expenses), negative
            amounts are money in.
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="merchant or description"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }
              }}
              sx={{ flex: 1, minWidth: 200 }}
            />
            <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} sx={{ minWidth: 180 }}>
              <MenuItem value="">All</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.category} value={c.category}>
                  {c.category} ({c.count})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="From"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ minWidth: 150 }}
            />
            <TextField
              label="To"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ minWidth: 150 }}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Chip label={`${rows.length} rows`} />
            <Chip color="error" variant="outlined" label={`Expense ${formatMoney(totals.expense)}`} />
            <Chip color="success" variant="outlined" label={`Income ${formatMoney(totals.income)}`} />
            <Chip color={totals.net >= 0 ? 'success' : 'warning'} label={`Net ${formatMoney(totals.net)}`} />
          </Stack>
        </Stack>
      </MainCard>

      <MainCard content={false}>
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error.message}
          </Alert>
        )}
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Account</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!isLoading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Box sx={{ py: 6 }}>
                      <Typography color="text.secondary">No transactions match your filters.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {rows.map((t) => {
                const amount = Number(t.amount || 0);
                const isExpense = amount > 0;
                return (
                  <TableRow key={t.id} hover>
                    <TableCell>{formatDate(t.tx_date || t.post_date)}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{t.description || '—'}</Typography>
                        {t.merchant && t.merchant !== t.description && (
                          <Typography variant="caption" color="text.secondary">
                            {t.merchant}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {t.category && (
                        <Chip
                          size="small"
                          label={t.category}
                          sx={{
                            bgcolor: CATEGORY_COLORS[t.category] || CATEGORY_COLORS.other,
                            color: '#fff',
                            fontWeight: 500
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {t.account_name || t.issuer || '—'}
                        {t.last_four ? ` •${t.last_four}` : ''}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isExpense ? 'error.main' : 'success.main' }}>
                        {isExpense ? '' : '+'}
                        {formatMoney(Math.abs(amount), t.currency)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Stack>
  );
}
