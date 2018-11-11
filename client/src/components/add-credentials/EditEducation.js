import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation, getEducation, updateEducation } from '../../actions/profileActions';

const _ = require('lodash');
const moment = require('moment');

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

  }

  componentDidMount() {
    this.props.getEducation(this.props.match.params.edu_id);
    // console.log(test);

  }
  componentWillReceiveProps(nextProps) {
    console.log("REACHED");

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const edu = nextProps.profile.education;

    edu.school = !_.isEmpty(edu.school) ? edu.school : '';
    edu.degree = !_.isEmpty(edu.degree) ? edu.degree : '';
    edu.fieldOfStudy = !_.isEmpty(edu.fieldOfStudy) ? edu.fieldOfStudy : '';
    edu.from = !_.isEmpty(edu.from) ? moment.utc(edu.from).format("YYYY-MM-DD") : '';
    edu.to = !_.isEmpty(edu.to) ? moment.utc(edu.to).format("YYYY-MM-DD") : '';

    edu.description = !_.isEmpty(edu.description) ? edu.description : '';

    this.setState({
      school: edu.school,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      from: edu.from,
      to: edu.to,
      current: edu.current,
      description: edu.description,
    })
  }


  onSubmit = (e) => {
    e.preventDefault();

    let overrideDate;
    if (this.state.current) {
      overrideDate = '';
      // overrideDate = moment().format('YYYY MM DD')
    }

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.current ? overrideDate : this.state.to,
      current: this.state.current,
      description: this.state.description,

    };
    this.props.updateEducation(this.props.match.params.edu_id, eduData, this.props.history);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Education</h1>
              <small className="d-block pb3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the position"
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  getEducation: PropTypes.func.isRequired,
  updateEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})


export default connect(mapStateToProps, { addEducation, getEducation, updateEducation })(
  withRouter(AddEducation)
);