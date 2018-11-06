import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from './../../actions/profileActions';

class Education extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEducation(id)
  }

  render() {
    const education = this.props.education.map(edu => (
      <div key={edu._id} className="flex-container edu-row">
        <div className="edu-column">{edu.school}</div>
        <div className="edu-column">{edu.degree}</div>
        <div className="edu-column years">
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </div>
        <div className="edu-column deleteButton">
          <button onClick={() => this.onDeleteClick(edu._id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <div className="flex-container edu-head-row">
          <div className="edu-column">School</div>
          <div className="edu-column">Degree</div>
          <div className="edu-column years">Years</div>
          <div className="edu-column"></div>
        </div>
        {education}
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);