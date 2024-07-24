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
import './atribuicao.css';
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

import ApiTasks from "api/tasks";
import ApiMembers from "api/members";
import ApiMembersTask from "api/membersTask";

let tasks = []
async function getTasks() {
  const response = await ApiTasks.get()
  tasks = response.data
}
await getTasks()

let members = []
async function getMembers() {
  const response = await ApiMembers.get()
  members = response.data
}
await getMembers()

let memberTask = []
let rows = []
async function getMemberTask() {
  memberTask = await ApiMembersTask.get();
  memberTask.data.forEach(item => {
    item.member = members.find((member) => {
      return member.id == item.member;
    });

    item.task = tasks.find((task) => {
      return task.id == item.task;
    });

    rows.push(item);
  })
}
await getMemberTask()

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
        <TableCell align="left">{row.task.description}</TableCell>
        <TableCell align="left">{row.member.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Alterar Dados
              </Typography>
              <Table size="large" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">{row.task.description}</TableCell>
                    <TableCell component="th" scope="row" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                      <MDInput
                        select
                        variant="standard"
                        label="Membro"
                        required
                        defaultValue={row.member.id}
                        onChange={(e) => {
                          insert.member = e.target.value;
                        }}
                      >
                        {members.map((member) => (
                          <MenuItem key={member.id} value={member.id}>
                            {member.name}
                          </MenuItem>
                        ))}
                      </MDInput>
                    </TableCell>
                    <TableCell>
                      <MDButton 
                        variant="gradient" 
                        color="success"
                        onClick={() => {
                          ApiMembersTask.update(row.id, {member: insert.member})
                            .then(response => {
                              if (response.hasOwnProperty('data')) {
                                alert('Atribuição atualizada com sucesso!')
                                setRefreshData(refreshData ? false : true)
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
  member: '',
  task: '',
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
                Atribuição de Tarefas
                </MDTypography>
              </MDBox>

              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Accordion>
                  <AccordionSummary id="panel-header" aria-controls="panel-content" style={{backgroundColor: '#000'}}>
                    <Box>
                      <MDButton 
                        color="black"
                      >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Nova Atribuição
                      </MDButton>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      component="form"
                      autoComplete="off"
                    >
                      <MDInput
                        select
                        variant="standard"
                        label="Tarefa"
                        required
                        onChange={(e) => {
                          insert.task = e.target.value;
                        }}
                      >
                        {tasks.map((task) => (
                          <MenuItem key={task.id} value={task.id}>
                            {task.description}
                          </MenuItem>
                        ))}
                      </MDInput>


                      <MDInput
                        select
                        variant="standard"
                        label="Membro"
                        required
                        onChange={(e) => {
                          insert.member = e.target.value;
                        }}
                      >
                        {members.map((member) => (
                          <MenuItem key={member.id} value={member.id}>
                            {member.name}
                          </MenuItem>
                        ))}
                      </MDInput>

                      <Box
                        mt={1}
                        ml={1}
                      >
                        <MDButton 
                          variant="gradient" 
                          color="success"
                          onClick={() => {
                            ApiMembersTask.insert(insert)
                              .then(response => {
                                if (response.hasOwnProperty('data')) {
                                  alert('Nova atribuição cadastrado com sucesso!')
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
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">Tarefa</TableCell>
                        <TableCell align="left">Membro Responsavel</TableCell>
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
