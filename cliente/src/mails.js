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

const columns =  [
  {
    label: 'Id',
    field: 'id',
    sort: 'asc',
    width: 400
  },
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
    field: 'from',
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
          id : mailbox.emailId,          
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

  onMailClick = (mail) => {
    console.log(mail)
    this.props.history.push({
      pathname: '/mail',
      state: {
        account: this.props.location.state.account,
        mailId: mail.id
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
            <MDBContainer fluid>
              {this.props.location.state.account}
              <MDBTable>
                <MDBTableHead columns={columns} />
                <MyTableBody rows={this.state.data} onRowClick={this.onMailClick}/>
              </MDBTable>     
            </MDBContainer>        
        </Layout>      
      )
    }
  }
}

export default Mails;