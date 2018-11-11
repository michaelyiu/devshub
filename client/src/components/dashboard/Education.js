import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getEducation, deleteEducation } from './../../actions/profileActions';
import { Link } from 'react-router-dom';

const moment = require('moment');
class Education extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onEditClick = (id) => {
    this.props.getEducation(id);
  }

  onDeleteClick = (id) => {
    this.props.deleteEducation(id)
  }

  render() {
    const education = this.props.education.map(edu => (
      <div key={edu._id} className="flex-container edu-row">
        <div className="edu-column">{edu.school}</div>
        <div className="edu-column">{edu.degree}</div>
        <div className="edu-column years">
          <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> - {edu.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>}

        </div>
        <div className="edu-column deleteButton">
          <Link to={`/edit-education/${edu._id}`} className="btn btn-primary btn-custom">Edit</Link>
          <button onClick={() => this.onDeleteClick(edu._id)} className="btn btn-danger btn-custom ml-4">Delete</button>
        </div>
      </div>
    ))
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
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
  getEducation: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  singleEducation: state.profile.singleEducation
})

export default connect(mapStateToProps, { getEducation, deleteEducation })(Education);