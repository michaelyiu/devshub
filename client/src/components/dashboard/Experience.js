import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from './../../actions/profileActions';

class Experience extends Component {
  onDeleteClick = (id) => {
    console.log('reached');

    this.props.deleteExperience(id)
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <div key={exp._id} className="flex-container exp-row">
        <div className="exp-column">{exp.company}</div>
        <div className="exp-column">{exp.title}</div>
        <div className="exp-column years">
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </div>
        <div className="exp-column deleteButton">
          <button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <div className="flex-container exp-head-row">
          <div className="exp-column">Company</div>
          <div className="exp-column">Title</div>
          <div className="exp-column years">Years</div>
          <div className="exp-column"></div>
        </div>
        {experience}
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);