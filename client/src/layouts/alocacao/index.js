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
let tasksByMember = []
let allocation = []
async function getMemberTask() {
  memberTask = await ApiMembersTask.get()
  memberTask.data.forEach(item => {
    item.member = members.find((member) => {
      return member.id == item.member;
    });

    item.task = tasks.find((task) => {
      return task.id == item.task;
    });

    if (!tasksByMember[item.member.id]) {
      tasksByMember[item.member.id] = {
        member: item.member,
        allocation: 0,
        tasks: [],
      }  
    }
    tasksByMember[item.member.id].allocation = parseInt(tasksByMember[item.member.id].allocation) + parseInt(item.task.etc)
    tasksByMember[item.member.id].tasks.push(item.task)
  })

  rows = Object.entries(tasksByMember).map((item) => {
    return item[1];
  })

  // console.log(rows);
  // memberTask.data.forEach(item => {
  //   const memberName = item.member.name;
  //   let totalEtc = 0;

  //   // Calcular o total de 'etc' para as tarefas do membro
  //   item.tasks.forEach(task => {
  //     totalEtc += Number(task.etc);
  //   });

  //   // Adicionar ao resultado no formato desejado
  //   rows.push({id: index++, member: memberName, etc: totalEtc });
  // });
}
await getMemberTask();

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
        <TableCell align="right">{row.member.name}</TableCell>
        <TableCell align="right">{row.allocation}</TableCell>
      </TableRow>

    </React.Fragment>
  );
}

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box 
                pt={3}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Membro</TableCell>
                        <TableCell align="right">Alocação de Tempo (em horas)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <Row key={row} row={row} />
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
