export function applyPagination(
  documents: any[],
  page: number,
  rowsPerPage: number,
) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
