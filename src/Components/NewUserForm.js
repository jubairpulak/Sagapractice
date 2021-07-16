import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
class NewUserForm extends Component {
	state = {
		firstName: "",
		lastName: "",
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { firstName, lastName } = this.state;

		this.props.onSubmit({
			firstName,
			lastName,
		});

		this.setState({
			firstName: "",
			lastName: "",
		});
	};
	handleFirstNameChange = (e) => {
		this.setState({
			firstName: e.target.value,
		});
	};

	handleLastNameChange = (e) => {
		this.setState({
			lastName: e.target.value,
		});
	};
	render() {
		const { firstName, lastName } = this.state;
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>First Name</Label>
					<Input
						required
						placeholder="first name"
						onChange={this.handleFirstNameChange}
						value={firstName}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Last Name</Label>
					<Input
						required
						placeholder="Last name"
						onChange={this.handleLastNameChange}
						value={lastName}
					/>
				</FormGroup>
				<br />
				<FormGroup>
					<Button block outline type="submit" color="primary">
						Create
					</Button>
				</FormGroup>
				<br />
			</Form>
		);
	}
}

export default NewUserForm;
