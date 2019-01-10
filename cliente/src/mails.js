import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { MDBDataTable } from 'mdbreact';

const data = {
    columns: [
      {
        label: 'Subject',
        field: 'name',
        sort: 'asc',
        width: 400
      },
      {
        label: 'Date',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'From',
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: 'To',
        field: 'age',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61'
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63'
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66'
      }
    ]
  };


class Mails extends Component {
   
  render() {
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

export default Mails;