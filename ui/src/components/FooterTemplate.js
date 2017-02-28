import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link to="/">Home</Link>
        </li>,
        <li key={2}>
          <Link to="dashboard">Dashboard</Link>
        </li>,
        <li key={3}>
          <Link to="logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li key={1}>
          <Link to="/">Home</Link>
        </li>,
        <li key={2}>
          <Link to="login">Login</Link>
        </li>
      ];
    }
  }

  render() {
    const d = new Date();
    const year = d.getFullYear();

    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav>
                  <ul className="footer-nav">
                    {this.renderLinks()}
                  </ul>
                </nav>
                <p className="copyright">© {year}, Rails-React-JWT. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
