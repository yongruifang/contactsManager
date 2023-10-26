import React from 'react'
import { Col, Row } from 'reactstrap';
import { IPersonState } from './State';
import { AddressValidation } from './Validations/AddressValidation';
import { IValidation } from './Validations/IValidation';
import { PersonValidation } from './Validations/PersonValidation';
import { PhoneValidation } from './Validations/PhoneValidation';

interface IValidationProps {
    CurrentState: IPersonState;
    CanSave: (canSave: boolean) => void;
}

function FormValidation(props: IValidationProps) {
    // 将不同的验证其添加到数组中，迭代数组，调用每个验证器的验证方法
    // 如果验证失败，将canSave设置为false
    // 如果所有验证都通过，将canSave设置为true
    const validations: IValidation[] = [];
    const failures: string[] = new Array<string>();
    validations.push(new PersonValidation());
    validations.push(new AddressValidation());
    validations.push(new PhoneValidation());

    const Validate = () => {
        validations.forEach(validation => {
            validation.Validate(props.CurrentState, failures)
        })
        props.CanSave(failures.length === 0);
    }
    Validate()
    const errors = failures.map((failure, index) => {
        return (
            <Row key={failure}>
                <Col>
                    <label>
                        {failure}
                    </label>
                </Col>
            </Row>
        )
    })
    return (
        (
            <Col>
                {errors}
            </Col>
        )
    )
}

export default FormValidation