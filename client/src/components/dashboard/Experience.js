import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getExperience, deleteExperience } from './../../actions/profileActions';
import { Link } from 'react-router-dom';

const moment = require('moment');

class Experience extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onEditClick = (id) => {
    this.props.getExperience(id);
  }

  onDeleteClick = (id) => {
    this.props.deleteExperience(id)
  }

  render() {

    const experience = this.props.experience.map(exp => (
      <div key={exp._id} className="flex-container exp-row">
        <div className="exp-column">{exp.company}</div>
        <div className="exp-column">{exp.title}</div>
        <div className="exp-column years">
          <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> - {exp.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>}
        </div>
        <div className="exp-column buttonGroup">
          <Link to={`/edit-experience/${exp._id}`} className="btn btn-primary btn-custom">Edit</Link>
          <button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger btn-custom">Delete</button>
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
  getExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  singleExperience: state.profile.singleExperience
})

export default connect(mapStateToProps, { getExperience, deleteExperience })(Experience);