import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row, Button, Jumbotron, Col, Panel } from 'react-bootstrap';
import axios from 'axios';
import { AreaChart, Area, Cell, PieChart, Pie, XAxis, YAxis, LineChart, Line, Legend, Bar, CartesianGrid, Tooltip, BarChart} from 'recharts';

import './App.css';

import Header from './Header';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userSession: {},
      data: [],
      totalDonated: 0,
      charityPieChartData: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/api/session')
    .then((res) => {
      console.log('userSession', res.data);
      this.setState({
        userSession: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get('http://localhost:8080/api/transactions/all')
    .then((res) => {
      var transactions = res.data;
      var daysData = [];
      var totalDonated = 0;
      transactions.forEach(function(elt) {
        var day = new Date(elt.date_time);
        var dayString = day.getMonth() + 1 + '/' + day.getFullYear();
        daysData[dayString] = daysData[dayString] + elt.amount || elt.amount;
        totalDonated += elt.amount;
      });
      totalDonated = Math.floor(totalDonated*100) / 100;
      this.setState({totalDonated: totalDonated});
      var data = [];
      for (var key in daysData) {
        data.push({name: key, 'Amount Donated': daysData[key]});
      }
      data.sort(function(a,b) {
        var bNum = Number(''+b.name.split('/')[1] + b.name.split('/')[0]);
        var aNum = Number(''+a.name.split('/')[1] + a.name.split('/')[0]);
        return (aNum - bNum);
      });
      this.setState({data: data});
      // this.setState({
      //   userSession: res.data
      // })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  

  render() {
    return (
      <Header>
        <div className="App">
          <div className="description">
            <Jumbotron className='jumbotron'>
              <h2>Make a Difference</h2>
              <p className="homePageSubtitle">Have a voice. Make a Difference. AddUp.</p>
              <p>Find and support charitable causes on your budget</p>
              <p><Link to="/search"><Button className='findButton' >Find Charities</Button></Link></p>
            </Jumbotron>
          </div>

          <div className="infoSections">

            <Col xs={6} md={4} className="infoColumn">
              <Panel header="Find Charities and Causes" bsStyle="primary">
                <p>With over 1.5 million charities available to search through you can truly find a cause that you are passionate about, or create your own cause.</p>
              </Panel>
            </Col>

            <Col xs={6} md={4} className="infoColumn">
              <Panel header="Securely Link your Accounts" bsStyle="primary">
                <p>Connect the accounts you already use everyday. We use Plaid and Stripe to securely link your accounts. We never store your account information.</p>
              </Panel>
            </Col>

            <Col xs={6} md={4} className="infoColumn">
              <Panel header="Donate Your Change" bsStyle="primary">
                <p>Use your credit or debit card and we round-up your purchase to the nearest dollar. Set monthly limits so that you can ensure your donations fit your budget. </p>
              </Panel>
            </Col>


            <div className="footer">
              
            </div>

          </div>


        </div>
        <div className='graph'>
          <Row>
            <h2 className="chartLabel">AddUp users have donated ${this.state.totalDonated} to charities so far!</h2>
            <LineChart width={800} height={400} data={this.state.data}>
              <XAxis dataKey="name"/>
              <YAxis label="Dollars Donated" />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="Amount Donated" stroke="#8884d8" />
            </LineChart>
            </Row>
        </div>
      </Header>
    );
  }
}

export default App;
