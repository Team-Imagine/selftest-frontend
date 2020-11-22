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

const TestPage = ({isOpen, test_id}) => {
	const [test, setTest] = useState();
	const [title, setTitle] = useState('');


	useEffect(() => {

		axios.get(`/api/testset/${test_id}`)
		.then(res => {
			console.log(res.data);
			setTest(res.data.test_set.rows[0]);
			setTitle(res.data.test_set.rows[0].title);
		})
	}, []);

	const deleteHandler = () => {

	}

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": isOpen })}
		>
			<div className="d-flex bd-highlight mb-3">
				<div className="mr-auto p-2 bd-highlight">
					<h4 style={{ fontWeight: "bolder" }}>
						{title}
                </h4>
				</div>
				<div className="p-2 bd-highlight">
					<div>
						<div>
						<Button variant="info" style = {{width: '19rem', height: '2.5rem'}} onClick={deleteHandler}
						>시험 생성</Button>
					</div>
					</div>
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

export default TestPage;