import React from 'react';
import css from './home.css';

class Confirmed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({
        userType: 'Trainer',
        name: this.props.trainerName,
        visibility: {display: 'none'}
      });
    } else {
      this.setState({
        userType: 'Client',
        name: this.props.userFirstname + ' ' + this.props.userLastname,
        visibility: {}
      });
    }
  }

  render() {
    return (
      <div id="confirmedBooking">
        <li className="testimonial-row" id="confirmedBooking">
          <div className="w-row">
            <div className="booking-column w-col w-col-3">
              <div className="booking-row-title">
                <h4>{this.state.userType}</h4>
                <div>{this.state.name}</div>
              </div>
            </div>
            <div className="w-col w-col-3">
              <h4>Service</h4>
              <div>{this.props.service}</div>
            </div>
            <div className="w-col w-col-3">
              <h4>Duration</h4>
              <div>{this.props.duration}</div>
            </div>
            <div className="w-col w-col-3">
              <h4>Date / Time</h4>
              <div>Feb. 12 - 10:30am</div>
            </div>
          </div>
        </li>
      </div>
    );
  }
}


export default Confirmed;




