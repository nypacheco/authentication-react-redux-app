import React from 'react';
import { browserHistory } from 'react-router';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };

    isValid(){
        const { errors, isValid } = validateInput(this.state);

        if(!isValid){
            this.setState({ errors });
        }

        return isValid;
    };

    onSubmit(e){
        e.preventDefault();

        if(this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        message: 'You signed up successfully. Welcome!'
                    });
                    browserHistory.push('/');
                },
                (data) => {
                    this.setState({errors: data.response.data, isLoading: false})
                }
            );
        }
    };

    render(){
        const { errors } = this.state;

        return (
           <form onSubmit={this.onSubmit}>
               <h1>Join our community!</h1>
                <TextFieldGroup
                   error={errors.username}
                   label="Username"
                   value={this.state.username}
                   onChange={this.onChange}
                   type="text"
                   field="username"/>
               <TextFieldGroup
                   error={errors.email}
                   label="Email"
                   value={this.state.email}
                   onChange={this.onChange}
                   type="email"
                   field="email"/>
               <TextFieldGroup
                   error={errors.password}
                   label="Password"
                   value={this.state.password}
                   onChange={this.onChange}
                   type="password"
                   field="password"/>
               <TextFieldGroup
                   error={errors.passwordConfirmation}
                   label="Password Confirmation"
                   value={this.state.passwordConfirmation}
                   onChange={this.onChange}
                   type="password"
                   field="passwordConfirmation"/>
               <div className="form-group">
                   <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                       Signup
                   </button>
               </div>
           </form>
        )
    };
};

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default SignupForm;