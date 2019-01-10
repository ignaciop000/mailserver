import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Layout from "./layout";

class Errors extends Component {
  render() {
    return (
        <Layout>
            <MDBContainer>    
                <MDBRow>        
                <MDBCol md="4"></MDBCol>
                <MDBCol md="4">
                    Ups, parece que algo no funciona :(
                </MDBCol>
                <MDBCol md="4"></MDBCol>
                </MDBRow>
            </MDBContainer>          
        </Layout> 
    );
  }
}

export default Error;