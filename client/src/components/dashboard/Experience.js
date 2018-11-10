import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getExperience, deleteExperience } from './../../actions/profileActions';
import { Link } from 'react-router-dom';

class Experience extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onEditClick = (id) => {
    this.props.getExperience(id);
    // const { profile } = this.props;
    // const { profile } = this.props.profile;
    // const { singleExperience } = this.props.p
    // console.log(profile);
    // console.log(singleExperience);
    // console.log(this.props.profile.singleExperience);



  }

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
          <Link to={`/edit-experience/${exp._id}`} className="btn btn-primary">Edit</Link>
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
  getExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  // exp: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  //   exp: this.props.experience
  profile: state.profile,
  singleExperience: state.profile.singleExperience
  // exp: state.profile.experience
})

export default connect(mapStateToProps, { getExperience, deleteExperience })(Experience);