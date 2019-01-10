import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import Error from "./components/error";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import autoBind from 'react-autobind';
const randomstring = require("randomstring");
const dateformat = require('dateformat');


class App extends Component {

  state = {
    disableView : true,
    account : '',
    mailsCount : 0,
    hasError : false
  }

  constructor() {
    super();
    autoBind(this);
  }

  getHomeData() {
    fetch("https://vongue.online:8443/api/emailCount")
      .then(data => data.json())
      .then(res => {
        this.setState({ 
          mailsCount: res.count,
          since : dateformat(new Date( res.since  ), 'dd.mm.yyyy') 
        })
      })
      .catch((e) => {
        this.setState({ hasError: true });
        console.log("Error",e);
      }); 

  }

  componentDidMount() {
    this.getHomeData();
  }
  
  generar() {
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

  changeAccount (value) {
    let disableView = false;
    if (value === '') {
      disableView = true;
    }
    this.setState({
      disableView,
      account: value
    });
  }

  viewEmails () {
    this.props.history.push({
      pathname: '/mails',
      state: {
        account: this.state.account
      }
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error>       
        </Error>      
      )
    } else {
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
            <MDBRow>
              <MDBCol md="4"></MDBCol>
              <MDBCol md="4">
                Mail processed {this.state.mailsCount} emails since {this.state.since}
              </MDBCol>
              <MDBCol md="4"></MDBCol>
            </MDBRow>
          </MDBContainer>
          
        </Layout>      
      )
    }
  }
}

export default App;