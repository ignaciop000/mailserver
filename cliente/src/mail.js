import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import MyTableBody from './components/myTableBody';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { MDBDataTable } from 'mdbreact';
import Error from "./components/error";
const dateformat = require('dateformat');

class Mail extends Component {
  state = {
    hasError : false
  }

  componentDidMount() {
    this.getMail();
  }

  getMail = () => {
    fetch("https://vongue.online:8443/api/mailbox/"+this.props.location.state.account+"/email/"+this.props.location.state.mailId)
    .then(data => data.json())
    .then(res => {
        console.log(res)
        this.setState({
            subject: res.subject,
            from: res.from.html,
            date: dateformat(new Date(res.timestamp), 'dd.mm.yyyy hh:mm:ss o'),
            html: res.html,
            text: res.text
        })
    })
    .catch((e) => {
      //this.setState({ hasError: true });
      console.log("Error",e);
    }); 
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
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md="6">{this.state.subject}</MDBCol>               
                    <MDBCol md="6">{this.state.date}</MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                    <div dangerouslySetInnerHTML={{__html: this.state.from}}></div>
                    </MDBCol>               
                    <MDBCol md="6"></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
                    </MDBCol>                                   
                </MDBRow>
            </MDBContainer>        
        </Layout>      
      )
    }
  }
}

export default Mail;