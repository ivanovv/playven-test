import React, { Component } from 'react';
import HeaderTemplate from './HeaderTemplate';
import FooterTemplate from './FooterTemplate';

class App extends Component {  
  render() {
    return (
      <div>
        <HeaderTemplate logo="Rails-React-JWT" />
        <div className="container">
          {this.props.children}
        </div>
        <FooterTemplate />
      </div>
    );
  }
}

export default App;

