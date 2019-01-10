import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { MDBDataTable } from 'mdbreact';
import Error from "./components/error";
const dateformat = require('dateformat');

const columns =  [
  {
    label: 'Subject',
    field: 'subject',
    sort: 'asc',
    width: 400
  },
  {
    label: 'Date',
    field: 'date',
    sort: 'asc',
    width: 270
  },
  {
    label: 'From',
    field: 'office',
    sort: 'asc',
    width: 200
  }
];


class Mails extends Component {
  state = {
    data : [],
    hasError : false
  }

  componentDidMount() {
    this.getMails();
  }

  getMails = () => {
    fetch("https://vongue.online:8443/api/mailbox/"+this.props.location.state.account+"/email")
    .then(data => data.json())
    .then(res => {
      let tres = [];
      res.forEach(mailbox => {
        tres.push({
          subject : mailbox.subject,
          date : dateformat(new Date( mailbox.timestamp  ), 'dd.mm.yyyy hh:mm:ss'),
          from: mailbox.sender.name + ' <' + mailbox.sender.address + '>' 
        });
      });

      this.setState({data :tres})
    })
    .catch((e) => {
      //this.setState({ hasError: true });
      console.log("Error",e);
    }); 
  }
  
  render() {
    let data = { columns : columns, rows : this.state.data};
    if (this.state.hasError) {
      return (
        <Error>       
        </Error>      
      )
    } else {
      return (
        <Layout>
            <MDBContainer fluid>
            <MDBDataTable
              striped
              bordered
              small
              data={data}
              />        
            </MDBContainer>        
        </Layout>      
      )
    }
  }
}

export default Mails;