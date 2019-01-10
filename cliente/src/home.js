import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
const randomstring = require("randomstring");

class App extends Component {

  state = {
    disableView : true,
    account : ''
  }
  
  generar = () => {
    let account = randomstring.generate({
      length: 8,
      charset: 'alphanumeric',
      capitalization : 'lowercase'
    });
    this.setState ({
      disableView: false,
      account
    });
  }

  changeAccount = (value) => {
    let disableView = false;
    if (value === '') {
      disableView = true;
    }
    this.setState({
      disableView,
      account: value
    });
  }

  viewEmails = () => {
    this.props.history.push('/mails')
  }

  render() {
    return (
      <Layout>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="4"></MDBCol>
            <MDBCol md="4">
              <MDBInput icon="envelope" type="email" label="Email Account" value={this.state.account} onChange={e => this.changeAccount(e.target.value)}/>
              <MDBBtn color="indigo" onClick={this.generar} >Generar</MDBBtn>
              <MDBBtn color="deep-orange" disabled={this.state.disableView} onClick={this.viewEmails}>Ver Correos</MDBBtn>
            </MDBCol>
            <MDBCol md="4"></MDBCol>
          </MDBRow>
        </MDBContainer>
         
      </Layout>      
    )
  }
}

export default App;