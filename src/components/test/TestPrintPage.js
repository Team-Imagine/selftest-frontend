import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, Card } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from "html-to-draftjs";
import parse from "node-html-parser";

import axios from "axios";

import './TestPrintPage.css';

class TestPrintPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 0,
		}
	}

	render() {
		return (
			<div>
				<br /><br />
				
				<div>
					{this.props.type !== 'answer' && <div><h2 style={{ fontSize: '50px', textAlign: 'center', paddingBottom: '10px', marginLeft: '20px', marginRight: '20px', borderBottom:'3px solid black'}}>Test</h2> {
					this.props.questions.map((i, index, array) => ((index % 2 === 0) ? <div key={index}>
						{index !==0  && index % 3 === 0 && <div className="section"/>}
						<div style={{ width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
							<div style={{ width: '50%', float: 'left' }}>

								<br /><div style={{ fontSize: '16px', fontWeight: "bold", color: 'black', margin: '20px' }}>{index + 1}번) {array[index].title} </div><br />
								<div style={{ width: '90%', height: '300px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
									<div style={{ width: '90%', height: '200px', overflow: 'hidden' }} >
										<Editor
											scrollbarHidden
											toolbarHidden
											editorState={array[index].content}
											readOnly
											// 한국어 설정
											localization={{
												locale: "ko",
											}}
										/></div>
									{array[index].type === "multiple_choice" ? array[index].multiple_choice_items.map((i, index) => (
										<div key={index}>
											{index + 1}번) {i.item_text}
										</div>
									)) : array[index].type === "short_answer" ? <div>
										<br />
										정답: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
									</div> : <div>
												<br />
											풀이:
										</div>}
								</div>
							</div>
							
							<div style={{ width: '50%', float: 'left' }}>
								<div>
									<br /><div style={{ fontSize: '16px', fontWeight: "bold", color: 'black', margin: '20px'}}>{index + 2}번) {array[index + 1].title} </div><br />
									<div style={{ width: '90%', height: '300px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
										<div style={{ width: '90%', height: '200px', overflow: 'hidden' }} >
											<Editor
												style={{ height: '80%', overflow: 'hidden' }}
												scrollbarHidden
												toolbarHidden
												// 에디터와 툴바 모두에 적용되는 클래스
												wrapperClassName="wrapper-class"
												// 에디터 주변에 적용된 클래스
												editorClassName="editor"
												// 툴바 주위에 적용된 클래스
												toolbarClassName="toolbar-class"
												editorState={array[index + 1].content}
												readOnly
												// 한국어 설정
												localization={{
													locale: "ko",
												}}
											/></div>
										{array[index].type === "multiple_choice" ? array[index].multiple_choice_items.map((i, index) => (
											<div key={index}>
												{index + 1}번) {i.item_text}
											</div>
										)) : array[index].type === "short_answer" ? <div>
											<br />
										정답: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
									</div> : <div>
													<br />
											풀이:
										</div>}
									</div>
								</div>
							</div>
						</div>
					</div> : <div key={index}></div>
					))}</div>}
					
					{this.props.type !== 'question' && <div><div className="section"/><br /><br /><h2 style={{ fontSize: '50px',textAlign: 'center', paddingBottom: '10px', marginLeft: '20px', marginRight: '20px', borderBottom:'3px solid black'}}>
						해답</h2>{
					this.props.answers.map((i, index, array) => ((index % 2 === 0) ? <div key={index}>
					{index !==0  && index % 3 === 0 && <div className="section"/>}
						<div style={{ width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
							<div style={{ width: '50%', float: 'left' }}>
								<br /><div style={{ fontWeight: "bold", color: 'black', margin: '20px' }}>{index + 1}번) {array[index].answer} </div><br />
								<div style={{ width: '90%', height: '300px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
									<div style={{ width: '90%', height: '200px', overflow: 'hidden' }}>
										해설 )
										<Editor
											scrollbarHidden
											toolbarHidden
											editorState={array[index].solution}
											readOnly
											// 한국어 설정
											localization={{
												locale: "ko",
											}}
										/></div>
								</div>
							</div>
							<div style={{ width: '50%', float: 'left' }}>
								<div>
									<br /><div style={{ fontWeight: "bold", color: 'black', margin: '20px'}}>{index + 2}번) {array[index + 1].answer} </div><br />
									<div style={{ width: '90%', height: '300px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
										<div style={{ width: '90%', height: '200px', overflow: 'hidden' }} >
											<Editor
												style={{ height: '80%', overflow: 'hidden' }}
												toolbarHidden
												editorState={array[index + 1].solution}
												readOnly
												// 한국어 설정
												localization={{
													locale: "ko",
												}}
											/></div>
									</div>
								</div>
							</div>
						</div>
					</div> : <div key={index}></div>
					))}
					</div>
					}
				</div>
			</div>
		)
	}
}
export default TestPrintPage;