import React from 'react';
import axios from 'axios';

class ParkInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkName: '',
      alerts: [],
      info: {},
    };
  }

  componentDidMount() {
    this.getAlerts();
    this.getInfo();
  }

  getAlerts() {
    axios.get('/api/park/alerts')
      .then((response) => {
        this.setState({ alerts: response.data.data }, () => this.render());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getInfo() {
    axios.get('/api/park/info')
      .then((response) => {
        this.setState({
          info: response.data[0],
          parkName: (response.data[0].fullName),
        }, () => this.render());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { parkName } = this.state;
    const { alerts } = this.state;
    const { info } = this.state;
    return (
      <div className="park-info">
        <h3>Alerts</h3>
        <div className="alerts">
          {alerts.map(alert => (
            <div key={alert.id}>
              <p>
                <strong>{alert.title}</strong>
                <br />
                <span>Category: </span>
                {alert.category}
                <br />
                {alert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ParkInfo;
