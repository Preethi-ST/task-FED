import React from 'react'
import TextError from './TextError'
import {Field,ErrorMessage} from 'formik'
function Select(props) {
    const {label,name,options, ...rest} = props
    return (
        <div className = 'mb-3 form-group'>
            <label htmlFor = {name}>{label}</label>
            <Field as="select" name={name} id={name} className="form-control form-control-sm" {...rest}>
                <option value=''></option>
                {
                    options.map(option => {
                        return (
                            <option key={option.key} value={option.key}>{option.value}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component = {TextError} />
        </div>
    )
}

export default Select
