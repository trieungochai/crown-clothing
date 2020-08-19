import React from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Those password didn't matched. Please try again!");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      // if createUserProfileDocument() success -> reset our state
      // (gonna wait for createUserProfileDocument() finish)
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">Don't have an account?</h2>
        <span>Create your Crown-Clothing Account.</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type='displayName'
            name='displayName'
            value={ displayName }
            onChange={this.handleChange}
            label='Username'
            required
          />

          <FormInput 
            type='email'
            name='email'
            value={ email }
            onChange={this.handleChange}
            label='Email'
            required
          />

          <FormInput
            type='password'
            name='password'
            value={ password }
            onChange={this.handleChange}
            label='Type a password'
            required
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={ confirmPassword }
            onChange={this.handleChange}
            label='Retype your password'
            required
          />

          <div className="button">
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </div>
        </form>

      </div>
    );
  };
};

export default SignUp;
