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
import Button from '@mui/material/Button';
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
import { indigo, red } from '@mui/material/colors';

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

import ApiAdmin from "api/admin";
import ApiPerfil from "api/perfil";
import ApiInscricao from "api/inscricoes";
import ApiOngs from "api/ongs";

const user = JSON.parse(localStorage.getItem('user'))

let admin = []
async function getAdmin() {
  const response = await ApiAdmin.getUid(user.uid).then((response) => {
    if (response.data != 'not found') {
      admin = response.data
    } else {
      admin = ''
    }
    console.log(admin);
  }) 
}

let inscricoes = []
async function getInscricoes() {
  const response = await ApiInscricao.getUid(user.uid).then((response) => {
    if (response.data != 'not found') {
      inscricoes = response.data
    }
  })
}

let rows = []
let perfil = []
async function getPerfil() {
  const response = await ApiPerfil.getUid(user.uid)
  perfil = response.data
  rows = response.data
  console.log(rows);
}

let ongs = []
let ongList = []
async function getOngs() {
  const response = await ApiOngs.get()
  
  ongs = response.data
}

if (user && user.hasOwnProperty('uid')) {
  await getAdmin()
  await getPerfil()
  await getOngs()
  await getInscricoes()

  let ids = []
  inscricoes.map(ins => {
    let on = ongs.filter(ong => ins.ong_id == ong.id)

    if (on.length > 0) {
      ongList.push(on[0])
    }
  })
}

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
        <TableCell align="right">{row.nome_completo}</TableCell>
        <TableCell align="right">{row.perfil}</TableCell>
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
                        label="Nome Completo" 
                        variant="standard" 
                        defaultValue={row.nome_completo}
                        type="text"
                        required
                        onChange={(e) => {
                          row.nome_completo = e.target.value;
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <MDInput
                        select
                        label="Perfil"
                        variant="standard"
                        required
                        defaultValue={row.perfil}
                        onChange={(e) => {
                          row.perfil = e.target.value;
                        }}
                      >
                        <MenuItem value="Padrão">Padrão</MenuItem>
                        { admin != '' ? <MenuItem value="Admin">Admin</MenuItem> : null }
                      </MDInput>
                    </TableCell>

                    <TableCell>
                      <MDButton 
                        variant="gradient" 
                        color="success"
                        onClick={() => {
                          row.nome_completo = row.nome_completo;
                          row.perfil = row.perfil;
                          ApiPerfil.update(row.id, {nome_completo: row.nome_completo, perfil: row.perfil})
                            .then(response => {
                              if (response.hasOwnProperty('data')) {
                                alert('Perfil atualizado com sucesso!')
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
              { admin != '' || row.perfil == 'Admin' ? <strong>* Somente o perfil admin pode cadastrar e <a href='/ongs' alt='Ir para página de ongs' title='Ir para página de ongs'>alterar ongs</a></strong> : null }
            </Box>
          </Collapse>
        </TableCell>
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
                Perfil
                </MDTypography>
              </MDBox>

              <Box 
                pt={3}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nome Completo</TableCell>
                        <TableCell align="right">Perfil</TableCell>
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
                Lista de Ongs <Button href="/ongs" variant="contained" color="success" alt="Vá para a lista de ongs para cancelar a inscrição" title="Vá para a lista de ongs para cancelar a inscrição">Editar</Button>
                </MDTypography>
              </MDBox>

              <Box 
                pt={3}
              >
                <TableContainer component={Paper} mt={3}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">URL do Logo</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Descrição</TableCell>
                        <TableCell align="left">UF</TableCell>
                        <TableCell align="left">Cidade</TableCell>
                        <TableCell align="left">Categoria</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ongList.map((row) => (
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                          <TableCell align="left">
                            <img 
                              src={row.logo} 
                              alt={row.nome} 
                              title={row.nome} 
                              style={{maxHeight: 30 + 'px', width: 'auto'}}
                            />
                          </TableCell>
                          <TableCell align="left"><strong>{row.nome}</strong></TableCell>
                          <TableCell align="left">{row.descricao}</TableCell>
                          <TableCell align="left">{row.uf}</TableCell>
                          <TableCell align="left">{row.cidade}</TableCell>
                          <TableCell align="left">{row.categoria}</TableCell>
                        </TableRow>
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
