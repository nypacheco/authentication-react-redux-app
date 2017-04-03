import React from 'react';
import classNames from 'classnames'

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
    onSubmit(e){
        this.setState({ errors: {}, isLoading: true});
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(
            () => {},
            (data) => {
                this.setState({ errors: data.response.data, isLoading: false })
            }
        );
    };
    render(){
        const { errors } = this.state;

        return (
           <form onSubmit={this.onSubmit}>
               <h1>Join our community!</h1>
               <div className={classNames("form-group", {'has-error': errors.username})}>
                   <label className="control-label">Username</label>
                   <input
                       value={this.state.username}
                       onChange={this.onChange}
                       type="text"
                       name="username"
                       className="form-control"/>
                   {errors.username && <span className="help-block">{errors.username}</span>}
               </div>
               <div className={classNames("form-group", {'has-error': errors.email})}>
                   <label className="control-label">Email</label>
                   <input
                       value={this.state.email}
                       onChange={this.onChange}
                       type="text"
                       name="email"
                       className="form-control"/>
                   {errors.email && <span className="help-block">{errors.email}</span>}
               </div>
               <div className={classNames("form-group", {'has-error': errors.password})}>
                   <label className="control-label">Password</label>
                   <input
                       value={this.state.password}
                       onChange={this.onChange}
                       type="password"
                       name="password"
                       className="form-control"/>
                   {errors.password && <span className="help-block">{errors.password}</span>}
               </div>
               <div className={classNames("form-group", {'has-error': errors.passwordConfirmation})}>
                   <label className="control-label">Password Confirmation</label>
                   <input
                       value={this.state.passwordConfirmation}
                       onChange={this.onChange}
                       type="password"
                       name="passwordConfirmation"
                       className="form-control"/>
                   {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
               </div>
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
    userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;