import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { IPersonState } from './State';

interface IProps {
    DefaultState: IPersonState
}

function PersonalDetails(props: IProps) { //遵守约定，属性由父组件传入，状态由自己管理
    const defaultState: Readonly<IPersonState> = props.DefaultState;
    const [status, setStatus] = useState(props.DefaultState)
    return (
        <Row>
            <Col lg="8">
                <Row>
                    <Col><h4 className="mb-3">Personal details</h4></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col><label htmlFor="firstName" placeholder="First name" /></Col>
                            <Col><label htmlFor="lastName">Last name</label></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <input type="text" id="firstName" className="form-control" placeholder="First name" value={status.FirstName} />
                            </Col>
                            <Col><input type="text" id="lastName" className="form-control" placeholder="Last name" value={status.LastName} /></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><label htmlFor="addr1">Address line 1</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="addr1" className="form-control" placeholder="Address line 1" value={status.Address1} /></Col>
                </Row>
                <Row>
                    <Col><label htmlFor="addr2">Address line 2</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="addr2" className="form-control" placeholder="Address line 2" value={status.Address2 ? status.Address2 : ""} /></Col>
                </Row>
                <Row>
                    <Col><label htmlFor="town">Town</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="town" className="form-control" placeholder="Town" value={status.Town} /></Col>
                </Row>
                <Row>
                    <Col><label htmlFor="county">County</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="county" className="form-control" placeholder="County" value={status.County} /></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col><label htmlFor="postcode">Postal/ZipCode</label></Col>
                            <Col><label htmlFor="phoneNumber">Phone number</label></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col><input type="text" id="postcode" className="form-control" value={status.Postcode} /></Col>
                            <Col><input type="text" id="phoneNumber" className="form-control" value={status.PhoneNumber} /></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><label htmlFor="dateOfBirth">Date of birth</label></Col>
                </Row>
                <Row>
                    <Col><input type="date" id="dateOfBirth" value={status.DateOfBirth!} /></Col>
                </Row>
                <Row>
                    <Col>
                        <Button size="lg" color="primary" >Save</Button>
                    </Col>
                    <Col>
                        <Button size="lg" color="secondary" >Clear</Button>
                    </Col>
                </Row>

            </Col>
            <Col>
                <Col>
                    <Row>
                        <Col lg="6"><Button size="lg" color="success" >Load</Button></Col>
                        <Col lg="6"><Button size="lg" color="info" >New Person</Button></Col>
                    </Row>
                </Col>
            </Col>
        </Row>
    );
}

export default PersonalDetails;