import React, { useState, useEffect } from "react";
import { Container, Button, InputGroup, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import store from "../store";
import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import axios from "axios";

const TestMaking = ({isOpen}) => {
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
            </div>
            <div className="p-2 bd-highlight">
            </div>
          </div>
          <hr />
                <ul>
                </ul>
        </Container>
      );
}

export default TestMaking;