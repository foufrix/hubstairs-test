import React, { Component } from 'react';

import Dygraph from 'dygraphs';
import myData from '../../misc/data_graph.csv.txt'

class GraphPage extends Component {

  componentDidMount = () => {
    new Dygraph(this.refs.chart, myData, {
      legend: 'always',
      animatedZooms: true,
      title: 'Compte Bancaire',
      ylabel: 'Euros',

  });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="mx-auto">
            <div ref="chart"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GraphPage;