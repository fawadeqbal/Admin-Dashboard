import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import SensorModal from "../modal/SensorModal";
import EditSensorModal from "../modal/EditSensorModal";
// sections
import {
  SensorListHead,
  SensorListToolbar,
} from "../sections/@dashboard/sensor";
import { getAllSensors } from "../service/api";

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "sensorId", label: "SensorId", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_sensor) =>
        _sensor.sensorId.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SensorPage() {
  const [sensorList, setSensorList] = useState([]);
  const [open, setOpen] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState({
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    sensorId: '',
    status: 'inactive', // Default status
    // Add other sensor properties here
  });
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("sensorId");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  // Add this state variable at the beginning of the component
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchSensorData();
  }, []);

  async function fetchSensorData() {
    const data = await getAllSensors();

    setSensorList(data);
  }

  const handleOpenMenu = (event, sensor) => {
    setSelectedSensor(sensor);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sensorList.map((n) => {
        console.log(n.sensorId);
        return n.sensorId;
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleDeleteMutiple = () => {
    // Filter out the selected sensors from the sensorList
    const updatedList = sensorList.filter(
      (sensor) => !selected.includes(sensor.sensorId)
    );

    // Clear the selected sensors
    setSelected([]);

    // Update the sensorList state with the updated list
    setSensorList(updatedList);
  };

  const handleDelete = () => {
    const updatedList = sensorList.filter(
      (sensor) => sensor._id !== selectedSensor._id
    );
    setSensorList(updatedList);
    setOpen(null); // Close the popover when deleting
  };

  const handleClick = (event, sensorId) => {
    const selectedIndex = selected.indexOf(sensorId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sensorId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterBySensorId = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sensorList.length) : 0;

  const filteredSensors = applySortFilter(
    sensorList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredSensors.length && !filterName;

  return (
    <>
      <Helmet>
        <title> Sensor </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Sensor
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenCreateModal(true)}
          >
            New Sensor
          </Button>
        </Stack>

        <Card>
          <SensorListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterBySensorId}
            handleDeleteMutiple={handleDeleteMutiple}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SensorListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sensorList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredSensors
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((sensor) => {
                      const { sensorId, status } = sensor;
                      const selectedSensor = selected.indexOf(sensorId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={sensorId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedSensor}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedSensor}
                              onChange={(event) => handleClick(event, sensorId)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar />
                              <Typography variant="subtitle2" noWrap>
                                {sensorId}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (status === "banned" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, sensor)}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sensorList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => {
          setOpenEditModal(true)
          setOpen(null);
        }}>
          <Iconify
            icon={"eva:edit-fill"}
            sx={{ mr: 2 }}
            
          />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <SensorModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      <EditSensorModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        initialSensorData={selectedSensor} // Pass the selected sensor data for editing
      />
    </>
  );
}
