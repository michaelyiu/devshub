import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience, getExperience, updateExperience } from '../../actions/profileActions';

const _ = require('lodash');
const moment = require('moment');
class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

  }

  componentDidMount() {
    this.props.getExperience(this.props.match.params.exp_id);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const exp = nextProps.profile.experience
    console.log(exp);
    exp.company = !_.isEmpty(exp.company) ? exp.company : '';
    exp.title = !_.isEmpty(exp.title) ? exp.title : '';
    exp.location = !_.isEmpty(exp.location) ? exp.location : '';



    exp.from = !_.isEmpty(exp.from) ? moment(exp.from).format("YYYY-MM-DD") : '';
    exp.to = !_.isEmpty(exp.to) ? moment(exp.to).format("YYYY-MM-DD") : '';

    exp.to = !_.isEmpty(exp.to) ? exp.to : '';
    exp.to = !_.isEmpty(exp.to) ? exp.to : '';

    exp.description = !_.isEmpty(exp.description) ? exp.description : '';

    this.setState({
      company: exp.company,
      title: exp.title,
      location: exp.location,
      from: exp.from,
      to: exp.to,
      current: exp.current,
      description: exp.description,
    })
  }


  onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,

    };
    console.log(this.props);

    this.props.updateExperience(this.props.match.params.exp_id, expData, this.props.history);
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
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Experience</h1>
              <small className="d-block pb3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  getExperience: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})


export default connect(mapStateToProps, { addExperience, getExperience, updateExperience })(
  withRouter(AddExperience)
);