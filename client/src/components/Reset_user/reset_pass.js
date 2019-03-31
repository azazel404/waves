import React, { Component } from 'react'
import axios from "axios";
import {update,generateData,isFormValid} from "../utils/Form/formActions";
import FormField from "../utils/Form/formfield"


class ResetUser extends Component {
    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'reset_email');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'reset_email');
        let formIsValid = isFormValid(this.state.formdata, 'reset_email')

        if (formIsValid) {
        //    console.log(data);
        } else {
            this.setState({
                formError: true
            })
        }
    }
  render() {
    return (
      <div className="container">
            <h1>Reset Password</h1>
            <form onSubmit={(event) => this.submitForm(event)}>
                <FormField 
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element) =>this.updateForm(element)}
                />
            </form>
      </div>
    )
  }
}

export default ResetUser;