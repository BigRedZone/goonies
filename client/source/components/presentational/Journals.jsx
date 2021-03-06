import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Route from './Route';

class RouteHistory extends React.Component {
  constructor({ props /* routes */}) {
    super(props);

    this.state = {
      saveView: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.hikeDiscard = this.hikeDiscard.bind(this);
    this.addToJournal = this.addToJournal.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }

  componentDidMount() {
    this.setEndTime();
  }
  
  setEndTime() {
    const endTime = !!localStorage.getItem('endTime');
    console.log('componentDidMount: ', endTime);
    this.setState({ saveView: endTime });
  }


  addToJournal() {
    const { username, viewData, getRoutes } = this.props;
    const trail = JSON.parse(localStorage.getItem('trail'));
    const started = localStorage.getItem('startTime');
    const ended = localStorage.getItem('endTime');

    axios.post('/api/routes/', {
      username,
      routeName: trail.name,
      start: started,
      end: ended,
      distanceInMiles: `${trail.length} miles`,
    })
      .then((data) => {
        getRoutes();
        localStorage.removeItem('endTime');
        console.log('addToJournal Function: ', localStorage.getItem('endTime'));
        this.setState({ saveView: false });
      })
    localStorage.removeItem('endTime');
  }

  hikeDiscard() {
    if (confirm('All data from this hike will be lost. Are you sure you want to discard this hike?')) {
      localStorage.removeItem('endTime');
      this.setState({ saveView: false });
    }
    localStorage.setItem('trail', null);
  }

  saveView() {
    const { saveView } = this.state;
    const trail = JSON.parse(localStorage.getItem('trail'));
    const started = localStorage.getItem('startTime');
    const ended = localStorage.getItem('endTime');

    return (saveView
      ? (
          <div className="recentHikeData">
            <div className="hike-data-container">
              <p>Most Recent Hike:
              <br />
              {trail.name}
              </p>
              <p>
              Started:
              <br />
              {started}
              </p>
              Ended:
              <br />
              {ended}
              <p>
              Distance:
              <br />
              {trail.length}
              {' miles'}
              </p>
            </div>
            <div className="save-or-discard-container">
            <button type="button" onClick={this.addToJournal}>Save</button>
            <button type="button" onClick={this.hikeDiscard}>Discard</button>
            </div>
          </div>
      )
      : null
    );
  }

  render() {
    const routes = JSON.parse(localStorage.getItem('routes')) || [];
    return (
      <div className="trail-journal">
        { this.saveView() }
        <div className="journal-title">
          <h1>Your Trails</h1>
        </div>
        <div className="routesContainer">
          {routes.map((route, i) => (
            <div key={i}>
              <Route route={route} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// RouteHistory.propTypes = {
//   username: PropTypes.string.isRequired,
//   viewData: PropTypes.shape.isRequired,
//   getRoutes: PropTypes.func.isRequired,
// };

export default RouteHistory;
