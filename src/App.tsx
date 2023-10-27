import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'reactstrap'
import PersonalDetails from './PersonalDetails';
import { IPersonState, PersonState } from './State';

function App() {
  const defaultPerson: IPersonState = new PersonState();
  // console.log(defaultPerson.DateOfBirth)
  return (
    <Container className="container-fluid h-100 d-flex justify-content-center">
      <PersonalDetails DefaultState={defaultPerson} />
    </Container>
  );
}

export default App;
