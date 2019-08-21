import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    const { user = {} } = this.props;
    const { name = "", _id = "" } = user;
    this.state = { name, _id };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.props;

    if (user && user.name) {
      const body = Object.assign({}, this.state, { name: user.name });
      this.props.onSubmit(body);
    } else {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            onChange={this.handleChange}
            name="name"
            type="text"
            value={this.state.name}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
