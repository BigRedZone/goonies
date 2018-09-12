import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router } from '@reach/router';
import MapYourRoute from '../presentational/MapYourRoute';
import SignUp from '../presentational/SignUp';
import Login from '../presentational/Login';
import RouteHistory from '../presentational/RouteHistory';
import routes from '../../SampleData';
import Weather from '../presentational/Weather';
import UserProfile from '../presentational/UserProfile';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMenu: false,
    };
  }

  handleMenuClick() {
    const { showingMenu } = this.state;
    this.setState({ showingMenu: !showingMenu });
  }

  render() {
    const { showingMenu } = this.state;
    return (
      <div className="header">
        <h1>Backpacker</h1>
        <nav>
          <button className="menu" type="button" onClick={this.handleMenuClick.bind(this)}>MENU</button>        { showingMenu
          ? (
            <div className="dropdown">
            <div className="close">
              <button className="close" type="button" onClick={this.handleMenuClick.bind(this)}>X</button>
            </div>
            <div role="presentation" onClick={this.handleMenuClick.bind(this)} onKeyPress={this.handleMenuClick.bind(this)}>
              <ul className="dropdown">
                {/* <li><Link to="/" className="menu-link">Login</Link></li>
                <li><Link to="/signUp" className="menu-link">Sign Up</Link></li> */}
                <li><Link to="/maps" className="menu-link">Map</Link></li>
                <li><Link to="/stopwatch" className="menu-link">Stopwatch</Link></li>
                <li><Link to="/info" className="menu-link">Park Info</Link></li>
                <li><Link to="/routes" className="menu-link">My History</Link></li>
                <li><Link to="/user" className="menu-link">My Profile</Link></li>
                <li><Link to="/login" className="menu-link">Sign Out</Link></li>
              </ul>
            </div>
          </div>
          )
          : (null)
        }
        </nav>
        <Router>
          <MapYourRoute path="/maps" />
          <Login exact path="/" />
          <SignUp path="/signUp" />
          <MapYourRoute path="/maps" />
          <UserProfile path="/user" />
          <RouteHistory path="/routes" routes={routes} />
          <Weather path="/weather" />
        </Router>
      </div>
    );
  }
}

const document = window.document;
ReactDOM.render(<AppContainer />, document.getElementById('app'));
