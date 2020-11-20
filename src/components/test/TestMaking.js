import React, { useState, useEffect } from "react";
import { Container, Button, InputGroup, Dropdown, DropdownButton, FormControl, Form } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import TestAutoMaking from './TestAutoMaking';

import axios from "axios";

const TestMaking = ({ isOpen }) => {

  const [listType, setListType] = useState('소장');
  const [testNumber, setTestNumber] = useState(10);
  const [autoForm, setAutoForm] = useState(false);

  const listTypeSelect = (e) => {
    setListType(e.target.value);
  }

  const testNumberSelect = (e) => {
    setTestNumber(e.target.value);
  }

  useEffect(() => {

  },[listType, testNumber]);

  const submitAutoMaker = (e) => {
    e.preventDefault();

    setAutoForm(true);
  }

  const closeAutoForm = () => {
    setAutoForm(false);
  };

  const onSearchSubmit = (subject, course) => {
    console.log('test:', subject, course);
  }

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": isOpen })}
    >
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h4 style={{ fontWeight: "bolder" }}>
            시험 문제 생성
              </h4>
          <Form inline>
            <Form.Group>
              <Form.Control as="select" onChange={listTypeSelect}>
                <option value="owned_question">소장 중</option>
                <option value="total_question">전체 문제</option>
              </Form.Control>

              <Form.Control as="select" onChange={testNumberSelect}>
                <option value="default">문항수</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <div className="p-2 bd-highlight">
          <div>
						<Button variant="info" style = {{width: '19rem', height: '2.5rem'}} onClick={submitAutoMaker}
						>시험 자동 생성</Button>
					</div>
        </div>
        <div className="p-2 bd-highlight">
          {autoForm && <TestAutoMaking onClose={closeAutoForm} onSubmit={onSearchSubmit}/>}
        </div>
      </div>
      <hr />
      <ul>
      </ul>
    </Container>
  );
}

export default TestMaking;