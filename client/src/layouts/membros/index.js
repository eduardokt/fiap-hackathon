/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { red } from '@mui/material/colors';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ApiMembers from "api/members";

let members = []
let rows = []
async function getMembers() {
  const response = await ApiMembers.get()
  members = response.data
  rows = response.data
}
await getMembers()

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false)
  const [refreshData, setRefreshData] = useState(false)

  React.useEffect(()=>{
    row
  },[refreshData])

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.function}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Alterar Dados
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow 
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      <TextField 
                        label="Nome" 
                        variant="standard" 
                        defaultValue={row.name}
                        type="text"
                        required
                        onChange={(e) => {
                          row.name = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField 
                        label="Email" 
                        variant="standard"
                        type="text"
                        defaultValue={row.email}
                        required
                        onChange={(e) => {
                          row.email = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <MDInput
                        select
                        label="Função"
                        variant="standard"
                        required
                        defaultValue={row.function}
                        onChange={(e) => {
                          row.function = e.target.value;
                        }}
                      >
                        <MenuItem value="jr">Desenvolvedor Jr</MenuItem>
                        <MenuItem value="pl">Desenvolvedor Pleno</MenuItem>
                        <MenuItem value="sr">Desenvolvedor Sr</MenuItem>
                      </MDInput>
                    </TableCell>

                    <TableCell>
                      <MDButton 
                        variant="gradient" 
                        color="success"
                        onClick={() => {
                          row.name = row.name;
                          row.email = row.email;
                          row.f = row.function;
                          ApiMembers.update(row.id, {name: row.name, email: row.email, f: row.f})
                            .then(response => {
                              if (response.hasOwnProperty('data')) {
                                alert('Membro atualizado com sucesso!')
                                setRefreshData(!refreshData)
                              } 
                              else {
                                alert('Ops! Tivemos algum problema, tente novamente!')
                              }
                            });
                          setRefreshData(!refreshData)
                        }}
                      >
                        <Icon sx={{ fontWeight: "bold" }}>send</Icon>
                        &nbsp;&nbsp;salvar
                      </MDButton>
                    </TableCell>

                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

let insert = {
  name: '',
  email: '',
  function: '',
}

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                Cadastro de Membros
                </MDTypography>
              </MDBox>

              <Box mt={2}>
                <Accordion>
                  <AccordionSummary id="panel-header" aria-controls="panel-content" style={{backgroundColor: '#000'}}>
                    <Box>
                      <MDButton 
                        color="black"
                      >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Novo Membro
                      </MDButton>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <MDInput
                        label="Nome"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.name = e.target.value;
                        }}
                      />

                      <MDInput
                        label="Email"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.email = e.target.value;
                        }}
                      />

                      <MDInput
                        select
                        label="Função"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.function = e.target.value;
                        }}
                      >
                        <MenuItem value="jr">Desenvolvedor Jr</MenuItem>
                        <MenuItem value="pl">Desenvolvedor Pleno</MenuItem>
                        <MenuItem value="sr">Desenvolvedor Sr</MenuItem>
                      </MDInput>

                      <Box
                        mt={1}
                        ml={1}
                      >
                        <MDButton 
                          variant="gradient" 
                          color="success"
                          onClick={() => {
                            ApiMembers.insert(insert)
                              .then(response => {
                                if (response.hasOwnProperty('data')) {
                                  alert('Novo membro cadastrado com sucesso!')
                                  getData()
                                } 
                                else {
                                  alert('Ops! Tivemos algum problema, tente novamente!')
                                }
                              });
                            
                              window.location.reload()
                          }}
                        >
                          <Icon sx={{ fontWeight: "bold" }}>send</Icon>
                          &nbsp;&nbsp;salvar
                        </MDButton>
                      </Box>

                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box 
                pt={3}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nome</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Função</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <Row key={row.id} row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
