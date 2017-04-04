import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { login } from '../../actions/authActions';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
    };

    isValid(){
        const { errors, isValid } = validateInput(this.state);
        if(!isValid){
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            this.setState({errors: {}, isLoading: true});
            this.props.login(this.state).then(
                (res) => browserHistory.push('/'),
                (err) => this.setState({errors: err.response.data.errors, isLoading: false})
            );
        }
    };

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };

    render(){
        const {errors, identifier, password, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <TextFieldGroup
                    error={errors.identifier}
                    label="Username/ Email"
                    value={this.state.identifier}
                    onChange={this.onChange}
                    type="text"
                    field="identifier" />
                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    type="password"
                    field="password"/>
                <div className="form-group">
                    <button disabled={isLoading} className="btn-primary btn-lg">
                        Login
                    </button>
                </div>
            </form>
        );
    };
};

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
};

export default connect(null, { login })(LoginForm);