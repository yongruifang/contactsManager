import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { IPersonState } from './State';
import { PersonRecord } from './Types';
import FormValidation from './FormValidation';
import { IRecordState, RecordState } from './RecordState';
import { Database } from './Database/Database';
import { PersonalDetailsTableBuilder } from './PersonalDetailsTableBuilder';

interface IProps {
    DefaultState: IPersonState
}

function PersonalDetails(props: IProps) { //遵守约定，属性由父组件传入，状态由自己管理
    const defaultState: IPersonState = props.DefaultState;
    const [status, setStatus] = useState(props.DefaultState)
    const tableBuilder: PersonalDetailsTableBuilder = new PersonalDetailsTableBuilder();
    // 添加成员
    const dataLayer: Database<PersonRecord> = new Database(tableBuilder.Build());
    const [people, setPeople] = useState<IPersonState[]>([]);
    const updateBinding = (event: any) => {
        switch (event.target.id) {
            case `firstName`:
                setStatus({ ...status, FirstName: event.target.value });
                break;
            case `lastName`:
                setStatus({ ...status, LastName: event.target.value });
                break;
            case `addr1`:
                setStatus({ ...status, Address1: event.target.value });
                break;
            case `addr2`:
                setStatus({ ...status, Address2: event.target.value });
                break;
            case `town`:
                setStatus({ ...status, Town: event.target.value });
                break;
            case `county`:
                setStatus({ ...status, County: event.target.value });
                break;
            case `postcode`:
                setStatus({ ...status, Postcode: event.target.value });
                break;
            case `phoneNumber`:
                setStatus({ ...status, PhoneNumber: event.target.value });
                break;
            case `dateOfBirth`:
                setStatus({ ...status, DateOfBirth: event.target.value });
                break;
        }
    }
    let canSave: boolean = false;
    let peopleList = null;
    const userCanSave = (hasErrors: boolean) => {
        canSave = hasErrors;
    }
    const setActive = (event: any) => {
        const person: string = event.target.value;
        const state = people.find((element: IPersonState) => {
            return element.PersonId === person;
        })
        if (state) {
            setStatus(state)
        }
    }
    const deleteMethod = (event: any) => {
        const person: string = event.target.value;
        deletePerson(person);
    }
    const deletePerson = async (person: string) => {
        const foundPerson = people.find((element: IPersonState) => {
            return element.PersonId === person;
        })
        if (foundPerson == undefined) {
            return;
        }
        const personState: IRecordState = new RecordState();
        personState.IsActive = false;
        const state: PersonRecord = { ...foundPerson as IPersonState, ...personState };
        await dataLayer.Update(state);
        loadPeople()
        clear()
    }
    const loadPeople = () => {
        setPeople(new Array<PersonRecord>());
        dataLayer.Read().then(p => {
            setPeople(p);
            setStatus(status);
        });
    }
    const clear = () => {
        setStatus(defaultState);
    }
    const savePerson = () => {
        if (!canSave) {
            alert(`Please correct the errors before saving.`);
            return;
        }
        const personState: IRecordState = new RecordState();
        personState.IsActive = true;
        const state: PersonRecord = { ...status, ...personState };
        if (state.PersonId === "") {
            state.PersonId = Date.now().toString();
            dataLayer.Create(state);
            loadPeople();
            clear();
        }
        else {
            dataLayer.Update(state).then(rsn => loadPeople());
        }
    }

    if (people.length > 0) {
        peopleList = people.map((p: IPersonState) => {
            return (<Row key={p.PersonId}><Col lg="6"><label >{p.FirstName} {p.LastName}</label></Col>
                <Col lg="3">
                    <Button value={p.PersonId} color="link" onClick={setActive}>Edit</Button>
                </Col>
                <Col lg="3">
                    <Button value={p.PersonId} color="link" onClick={deleteMethod}>Delete</Button>
                </Col></Row>)
        });
    }
    return (
        <div className="d-flex flex-column">
            <Row>
                <h4 className="text-primary">Personal details 我的通讯录</h4>
            </Row>
            <Row className="flex-grow-1">
                <Col className="d-flex flex-column">
                    <Row>
                        <Col>
                            <Row>
                                <Col><label htmlFor="firstName" />First name</Col>
                                <Col><label htmlFor="lastName">Last name</label></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <input type="text" id="firstName" className="form-control" placeholder="First name" value={status.FirstName} onChange={updateBinding} />
                                </Col>
                                <Col><input type="text" id="lastName" className="form-control" placeholder="Last name" value={status.LastName} onChange={updateBinding} /></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="addr1" className="mt-2">Address line 1</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="addr1" className="form-control" placeholder="Address line 1" value={status.Address1} onChange={updateBinding} /></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="addr2" className="mt-2">Address line 2</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="addr2" className="form-control" placeholder="Address line 2" value={status.Address2 == null ? "" : status.Address2} onChange={updateBinding} /></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="town" className="mt-2">Town</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="town" className="form-control" placeholder="Town" value={status.Town} onChange={updateBinding} /></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="county" className="mt-2">County</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="county" className="form-control" placeholder="County" value={status.County} onChange={updateBinding} /></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className="mt-2">
                                <Col><label htmlFor="postcode">Postal/ZipCode</label></Col>
                                <Col><label htmlFor="phoneNumber">Phone number</label></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col><input type="text" id="postcode" className="form-control" value={status.Postcode} onChange={updateBinding} /></Col>
                                <Col><input type="text" id="phoneNumber" className="form-control" value={status.PhoneNumber} onChange={updateBinding} /></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="dateOfBirth" className="mt-2">Date of birth</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="date" id="dateOfBirth" value={status.DateOfBirth!} onChange={updateBinding} /></Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Button size="lg" color="primary" onClick={savePerson}>Save</Button>
                        </Col>
                        <Col>
                            <Button size="lg" color="secondary" onClick={clear}>Clear</Button>
                        </Col>
                    </Row>
                    <Row className="mt-3"><FormValidation CurrentState={status} CanSave={userCanSave} /></Row>
                </Col>
                <Col>
                    <Row>
                        <Col>{peopleList}</Col>
                    </Row>
                    <Row>
                        <Col><Button size="lg" color="success" onClick={loadPeople}>Load</Button></Col>
                        <Col><Button size="lg" color="info" onClick={clear}>New Person</Button></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default PersonalDetails;