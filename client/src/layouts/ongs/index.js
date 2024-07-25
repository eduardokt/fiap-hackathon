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
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Modal from '@mui/material/Modal';
import TablePagination from '@mui/material/TablePagination';

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

import ApiOngs from "api/ongs";
import ApiEstadosCidades from "api/estados_cidades";
import ApiAdmin from "api/admin";
import ApiPerfil from "api/perfil";
import ApiInscricao from "api/inscricoes";

const user = JSON.parse(localStorage.getItem('user'))
let admin = []
async function getAdmin() {
  const response = await ApiAdmin.getUid(user.uid).then((response) => {
    if (response.data != 'not found') {
      admin = response.data
    } else {
      admin = ''
    }
  }) 
}

let perfil = []
async function getPerfil() {
  const response = await ApiPerfil.getUid(user.uid)
  perfil = response.data
}

let inscricoes = []
async function getInscricoes() {
  const response = await ApiInscricao.getUid(user.uid).then((response) => {
    if (response.data != 'not found') {
      inscricoes = response.data
    }
  })
}

if (user && user.hasOwnProperty('uid')) {
  await getAdmin()
  await getPerfil()
  await getInscricoes()
}

let categoria = [
  {
    nome: "Assistência Social"
  },
  {
    nome: "Cultura"
  },
  {
    nome: "Saúde"
  },
  {
    nome: "Meio Ambiente"
  },
  {
    nome: "Desenvolvimento e defesa de direitos"
  },
  {
    nome: "Habitação"
  },
  {
    nome: "Educação e Pesquisa"
  },
  {
    nome: "Outros"
  },
]

let ongs = []
let rows = []
async function getOngs() {
  const response = await ApiOngs.get()
  
  ongs = response.data
  rows = response.data
}
await getOngs()

let estadosCidades = []
async function getEstadosCidades() {
  const response = await ApiEstadosCidades.get()
  
  estadosCidades = response.data
}
await getEstadosCidades()

function BasicModal(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  let modalOpen = () => setOpen(true);
  let modalClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 80 + '%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={modalOpen} style={{backgroundColor: 'gray', color: 'white'}} >Ver mais</Button>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography class="modal-modal-title" variant="h6" component="h2">
            {row.nome}
          </Typography>
          
          <Typography class="modal-modal-description" sx={{ mt: 2 }}>
            <small>{row.descricao}</small>
          </Typography>

          <Typography class="modal-modal-contato" sx={{ mt: 2 }}>
            <small>{row.contato}</small>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false)
  const [refreshData, setRefreshData] = React.useState(false)
  let [cidades, setCidades] = React.useState([])

  let cid = {}
  cidades = []
  Object.entries(estadosCidades.filter(item => item.id === row.uf)[0].cidade).map((option, index) =>  (
    cid[option[0]] = `${option[1]}`
  ))
  cidades.push(cid)
  
  React.useEffect(()=>{
    row
  },[refreshData])
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {admin != '' || perfil.perfil == 'Admin' ? <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> : null }
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
        <TableCell align="left">
          <BasicModal key={row.id} row={row}/>
          <Button sx={{ mt: 1 }} style={{backgroundColor: inscricoes.filter((insc) => insc.ong_id == row.id).length > 0 ? 'red' : 'green', color: 'white'}} variant="contained" onClick={() => {
            let inscrito = inscricoes.filter((insc) => insc.ong_id == row.id)
            if (inscrito.length > 0) {
              ApiInscricao.delete(inscrito[0].id)
                .then(response => {
                  if (response.hasOwnProperty('data')) {
                    alert('Que pena, espero que possa nos ajudar no futuro!')
                    window.location.reload()
                  } 
                  else {
                    alert('Ops! Tivemos algum problema, tente novamente!')
                  }
                });
            } else {
              const inst = {
                ong_id: row.id,
                user_uid: user.uid
              }
              ApiInscricao.insert(inst)
                .then(response => {
                  if (response.hasOwnProperty('data')) {
                    alert('Agradecemos a colaboração!')
                    window.location.reload()
                  } 
                  else {
                    alert('Ops! Tivemos algum problema, tente novamente!')
                  }
                });
            }
          }}>
            {inscricoes.filter((insc) => insc.ong_id == row.id).length > 0 ? 'Sair' : 'Inscrever'}
          </Button>
        </TableCell>
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
                        label="URL do Logo" 
                        variant="standard" 
                        defaultValue={row.logo}
                        type="text"
                        required
                        onChange={(e) => {
                          row.logo = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField 
                        label="Nome" 
                        variant="standard" 
                        defaultValue={row.nome}
                        type="text"
                        required
                        onChange={(e) => {
                          row.nome = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField 
                        label="Descrição" 
                        variant="standard"
                        type="text"
                        defaultValue={row.descricao}
                        required
                        onChange={(e) => {
                          row.descricao = e.target.value;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <MDInput
                        select
                        label="UF"
                        variant="standard"
                        required
                        defaultValue={row.uf}
                        onChange={(e) => {
                          row.uf = e.target.value;
                          
                          let cid = {}
                          cidades = []
                          Object.entries(estadosCidades.filter(item => item.id === row.uf)[0].cidade).map((option, index) =>  (
                            cid[option[0]] = `${option[1]}`
                          ))
                          cidades.push(cid)
                          setCidades(cidades)
                        }}
                      >
                        {estadosCidades.map((option, index) => (
                          <MenuItem value={option.id}>{option.id}</MenuItem>
                        ))}
                      </MDInput>
                    </TableCell>

                    <TableCell>
                      <MDInput
                        select
                        label="Cidade"
                        variant="standard"
                        required
                        defaultValue={row.cidade}
                        onChange={(e) => {
                          row.cidade = e.target.value;
                        }}
                      >
                        {Object.entries(cidades[0]).map((option, index) => (
                          <MenuItem value={option[0]}>{option[1]}</MenuItem>
                        ))}
                      </MDInput>
                    </TableCell>

                    <TableCell>
                      <MDInput
                        select
                        label="Categoria"
                        variant="standard"
                        required
                        defaultValue={row.categoria}
                        onChange={(e) => {
                          row.categoria = e.target.value;
                        }}
                      >
                        {categoria.map((option, index) => (
                          <MenuItem value={option.nome}>{option.nome}</MenuItem>
                        ))}
                      </MDInput>
                    </TableCell>

                    <TableCell>
                      <TextField 
                        label="Contato" 
                        variant="standard"
                        type="text"
                        defaultValue={row.contato}
                        required
                        onChange={(e) => {
                          row.contato = e.target.value;
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <MDButton 
                        variant="gradient" 
                        color="success"
                        onClick={() => {
                          row.nome = row.nome;
                          row.descricao = row.descricao;
                          row.uf = row.uf;
                          row.cidade = row.cidade;
                          row.categoria = row.categoria;
                          row.logo = row.logo;
                          row.contato = row.contato;
                          
                          ApiMembers.update(row.id, {
                            nome: row.nome, 
                            descricao: row.descricao, 
                            uf: row.uf, 
                            cidade: row.cidade,
                            categoria: row.categoria,
                            logo: row.logo,
                            contato: row.contato
                          }).then(response => {
                            if (response.hasOwnProperty('data')) {
                              alert('Ong atualizada com sucesso!')
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
  nome: '', 
  descricao: '', 
  uf: '', 
  cidade: '',
  categoria: '',
  logo: '',
  contato: ''
}

function Tables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  let [addCidades, setAddCidades] = React.useState(() => {
    const e = estadosCidades
    let cid = {}
    Object.entries(e.filter(item => item.id === e[0].id)[0].cidade).map((option) =>  (
      cid[option[0]] = `${option[1]}`
    ))
    return [cid]
  })

  React.useEffect(() => {
    console.log(addCidades);
  }, [addCidades])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const filteredData = rows.filter((row) => {
    return (
      row.nome.toLowerCase().includes(search.toLowerCase()) ||
      row.uf.toLowerCase().includes(search.toLowerCase()) ||
      row.cidade.toLowerCase().includes(search.toLowerCase())||
      row.categoria.toLowerCase().includes(search.toLowerCase())
    );
  });

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
                Cadastro e Inscrição de Ongs
                </MDTypography>
              </MDBox>

              {admin != '' || perfil.perfil == 'Admin' ? <Box mt={2}>
                <Accordion>
                  <AccordionSummary id="panel-header" aria-controls="panel-content" style={{backgroundColor: '#000'}}>
                    <Box>
                      <MDButton 
                        color="black"
                      >
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Nova Ong
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
                        label="URL do logo"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.logo = e.target.value;
                        }}
                      />

                      <MDInput
                        label="Nome"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.nome = e.target.value;
                        }}
                      />

                      <MDInput
                        label="Descrição"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.descricao = e.target.value;
                        }}
                      />

                      <MDInput
                        select
                        label="UF"
                        variant="standard"
                        required
                        defaultValue={insert.uf == '' ? estadosCidades[0].id : insert.uf}
                        onChange={(e) => {
                          insert.uf = e.target.value;

                          let cid = {}
                          addCidades = []
                          Object.entries(estadosCidades.filter(item => item.id === e.target.value)[0].cidade).map((option, index) =>  (
                            cid[option[0]] = `${option[1]}`
                          ))
                          addCidades.push(cid)
                          setAddCidades(addCidades)
                          // console.log(addCidades);
                        }}
                      >
                        {estadosCidades.map((option, index) => (
                          <MenuItem value={option.id}>{option.id}</MenuItem>
                        ))}
                        {/* <MenuItem value="DF">DF</MenuItem>
                        <MenuItem value="SP">SP</MenuItem> */}
                      </MDInput>

                      <MDInput
                        select
                        label="Cidade"
                        variant="standard"
                        required
                        defaultValue={Object.entries(estadosCidades[0].cidade)[0][0]}
                        onChange={(e) => {
                          insert.cidade = e.target.value;
                        }}
                      >
                        {Object.entries(addCidades[0]).map((option, index) => ( 
                          <MenuItem value={option[0]}>{option[1]}</MenuItem>
                        ))}
                      </MDInput>

                      <TableCell>
                        <MDInput
                          select
                          label="Categoria"
                          variant="standard"
                          required
                          onChange={(e) => {
                            insert.categoria = e.target.value;
                          }}
                        >
                          {categoria.map((option, index) => (
                            <MenuItem value={option.nome}>{option.nome}</MenuItem>
                          ))}
                        </MDInput>
                      </TableCell>

                      <MDInput
                        label="Contato"
                        variant="standard"
                        required
                        onChange={(e) => {
                          insert.contato = e.target.value;
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
                            ApiMembers.insert(insert)
                              .then(response => {
                                if (response.hasOwnProperty('data')) {
                                  alert('Nova Ong cadastrado com sucesso!')
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
              </Box> : null }

              <Box 
                pt={3}
              >
                <Box sx={{ padding: 2 }}>
                  <TextField
                    fullWidth
                    label="Buscar por nome, uf, cidade ou categoria"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </Box>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        {admin != '' || perfil.perfil == 'Admin' ?<TableCell /> : null }
                        <TableCell align="left">URL do Logo</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Descrição</TableCell>
                        <TableCell align="left">UF</TableCell>
                        <TableCell align="left">Cidade</TableCell>
                        <TableCell align="left">Categoria</TableCell>
                        <TableCell align="left">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <Row key={row.id} row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[1, 2, 5, 10, 25]}
                  component="div"
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
