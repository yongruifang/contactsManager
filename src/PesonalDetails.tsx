import React from 'react';
import { Row, Col, Button } from 'reactstrap';



function PersonalDetails() {
    return (
        <Row>
            <Col lg="8">
                <Row>
                    <Col><h4 className="mb-3">Personal details</h4></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col><label htmlFor="firstName">First name</label></Col>
                            <Col><label htmlFor="lastName">Last name</label></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <input type="text" id="firstName" className="form-control" placeholder="First name" />
                            </Col>
                            <Col><input type="text" id="lastName" className="form-control" placeholder="Last name" /></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><label htmlFor="addr1">Address line 1</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="addr1" className="form-control" placeholder="Address line 1" /></Col>
                </Row>
                <Row>
                    <Col><label htmlFor="addr2">Address line 2</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="addr2" className="form-control" placeholder="Address line 2" /></Col>
                </Row>
                <Row>
                    <Col><label htmlFor="town">Town</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="town" className="form-control" placeholder="Town" /></Col>
                </Row>
                <Row>
                    <Col><label htmlFor="county">County</label></Col>
                </Row>
                <Row>
                    <Col><input type="text" id="county" className="form-control" placeholder="County" /></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col lg="3"><label htmlFor="postcode">Postal/ZipCode</label></Col>
                            <Col lg="4"><label htmlFor="phoneNumber">Phone number</label></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col lg="3"><input type="text" id="postcode" className="form-control" /></Col>
                            <Col lg="4"><input type="text" id="phoneNumber" className="form-control" /></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><label htmlFor="dateOfBirth">Date of birth</label></Col>
                </Row>
                <Row>
                    <Col><input type="date" id="dateOfBirth" /></Col>
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