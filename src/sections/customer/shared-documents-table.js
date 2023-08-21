import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const SharedDocumentsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Document
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Document ID
                </TableCell>
                <TableCell>
                  Created On
                </TableCell>
                <TableCell>
                  Shared By
                </TableCell>
                <TableCell>
                  Size
                </TableCell>
                <TableCell>
                  Version
                </TableCell>
                <TableCell>
                  Expiry
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((documents) => {
                const isSelected = selected.includes(documents.id);
                // const createdAt = format(documents.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={documents.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(documents.id);
                          } else {
                            onDeselectOne?.(documents.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={documents.avatar}>
                          {getInitials(documents.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {documents.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {documents.category}
                    </TableCell>
                    {/* <TableCell>
                      {documents.address.city}, {documents.address.state}, {documents.address.country}
                    </TableCell> */}
                      <TableCell>
                      {documents.documentid}
                    </TableCell>
                    <TableCell>
                      {documents.create}
                    </TableCell>
                    <TableCell>
                      {documents.shared}
                    </TableCell>
                    <TableCell>
                      {documents.size}
                    </TableCell>
                    <TableCell>
                      {documents.version}
                    </TableCell>
                    <TableCell>
                      {documents.expiry}
                    </TableCell>
                    <TableCell>
                      Add Icon
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SharedDocumentsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
