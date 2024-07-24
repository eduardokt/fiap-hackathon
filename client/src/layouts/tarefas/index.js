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
import { unstable_useNumberInput as useNumberInput } from '@mui/base';

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

import ApiTasks from "api/tasks";

let tasks = []
let rows = []
async function getTasks() {
  const response = await ApiTasks.get()
  tasks = response.data
  rows = response.data
}
await getTasks()

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
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.deadline}</TableCell>
        <TableCell align="right">{row.priority}</TableCell>
        <TableCell align="right">{row.etc}</TableCell>
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
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField 
                        label="Descrição da Tarefa" 
                        variant="standard" 
                        defaultValue={row.description}
                        type="text"
                        required
                        onChange={(e) => {
                          row.description = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField 
                        label="Prazo" 
                        variant="standard"
                        type="date"
                        defaultValue={row.deadline}
                        required
                        onChange={(e) => {
                          row.deadline = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <MDInput
                        select
                        variant="standard"
                        label="Prioridade"
                        defaultValue={row.priority}
                        required
                        onChange={(e) => {
                          row.priority = e.target.value;
                        }}
                      >
                        <MenuItem value="1">Alta</MenuItem>
                        <MenuItem value="2">Média</MenuItem>
                        <MenuItem value="3">Baixa</MenuItem>
                      </MDInput>
                    </TableCell>
                    <TableCell>
                      <TextField 
                        label="Tempo Estimado para Conclusão (em horas)" 
                        variant="standard"
                        type="number"
                        defaultValue={row.etc}
                        required
                        onChange={(e) => {
                          row.etc = e.target.value;
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <MDButton 
                        variant="gradient" 
                        color="success"
                        onClick={() => {
                          row.description = row.description;
                          row.deadline = row.deadline;
                          row.priority = row.priority;
                          row.etc = row.etc;
                          ApiTasks.update(row.id, {description: row.description, deadline: row.deadline, priority: row.priority, etc: row.etc})
                            .then(response => {
                              if (response.hasOwnProperty('data')) {
                                alert('Tarefa atualizado com sucesso!')
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
  description: '',
  deadline: '',
  priority: '',
  etc: '',
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
                Cadastro de Tarefas
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
                        &nbsp;Nova Tarefa
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
                        label="Descrição da Tarefa"
                        required
                        variant="standard"
                        onChange={(e) => {
                          insert.description = e.target.value;
                        }}
                      />

                      <MDInput
                        type="date" 
                        label="Prazo"
                        required
                        variant="standard"
                        min="1"
                        onChange={(e) => {
                          insert.deadline = e.target.value;
                        }}
                      />

                      <MDInput
                        select
                        variant="standard"
                        label="Prioridade"
                        required
                        onChange={(e) => {
                          insert.priority = e.target.value;
                        }}
                      >
                        <MenuItem value="1">Alta</MenuItem>
                        <MenuItem value="2">Média</MenuItem>
                        <MenuItem value="3">Baixa</MenuItem>
                      </MDInput>

                      <MDInput
                        label="Tempo Estimado para Conclusão (em horas)"
                        type="number"
                        min="1"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.etc = e.target.value;
                        }}
                      />

                      <Box
                        mt={1}
                        ml={1}
                      >
                        <MDButton 
                          variant="gradient" 
                          color="success"
                          onClick={() => {
                            ApiTasks.insert(insert)
                              .then(response => {
                                if (response.hasOwnProperty('data')) {
                                  alert('Nova tarefa cadastrado com sucesso!')
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
                        <TableCell align="right">Descrição da Tarefa</TableCell>
                        <TableCell align="right">Prazo</TableCell>
                        <TableCell align="right">Prioridade</TableCell>
                        <TableCell align="right">Tempo Estimado para Conclusão</TableCell>
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
