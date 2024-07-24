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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Button from '@mui/material/Button';

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import ApiAuth from "api/auth";
import ApiPerfil from "api/perfil";

let insert = {
  email: '',
  password: '',
}

let insertPerfil = {
  nome_completo: '',
  perfil: 'Padrão',
  uid: '',
}

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Crie o seu cadastro
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Utilize um email e senha para se cadastrar
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="email" 
                label="Email" 
                variant="standard" 
                fullWidth 
                required
                onChange={(e) => {
                  insert.email = e.target.value;
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password" 
                label="Password" 
                variant="standard" 
                fullWidth 
                required
                onChange={(e) => {
                  insert.password = e.target.value;
                }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient" 
                color="info" 
                fullWidth
                onClick={() => {
                  ApiAuth.insert(insert)
                    .then(async (response) => {
                      if (response.hasOwnProperty('data')) {
                        
                        insertPerfil.uid = response.data.uid
                        await ApiPerfil.insert(insertPerfil)

                        localStorage.setItem('user', JSON.stringify(response.data));
                        alert('Login criado com sucesso!');
                        window.location.href = "/ongs"
                      } 
                      else {
                        alert('Ops! Tivemos algum problema, tente novamente!')
                      }
                    }).catch(function (error) {
                      alert(error)
                    });
                }}
              >
                Criar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Já tem uma conta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
