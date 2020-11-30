import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, Card } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ReactHeight } from 'react-height';
import Test from "./Test";
import './TestPrintPage.css';

let theight = 0;

const test = (height) => {
	theight += height;

	//console.log('test:', theight);
}

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
				<br />
				<div>
					{this.props.type !== 'answer' && <div>
		<h2 style={{ fontSize: '50px', textAlign: 'center', paddingBottom: '10px', marginLeft: '20px', marginRight: '20px', marginBottom: '30px', borderBottom: '3px solid black' }}>{this.props.title}</h2>
						<div style={{ columnCount: '2', columnGap: '10px', columnRule: '3px solid black' }}>
							{this.props.questions.map((i, index, array) =>
								<div key={index}>
									<div style={{ width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden', }}>
											<div style={{ width: '100%', float: 'left' }}>
												<div style={{ fontSize: '16px', fontWeight: "bold", color: 'black', marginLeft: '30px' }}>{index + 1}번) {array[index].title} </div><br />
												<div style={{ width: '90%', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
													<div style={{ width: '90%', overflowX: '90%', overflowY: '200px', marginLeft: '20px' }}>
														<Editor
															scrollbarHidden
															toolbarHidden
															editorState={array[index].content}
															readOnly
															// 한국어 설정
															localization={{
																locale: "ko",
															}}
														/><br /><br />
													</div>
													{array[index].type === "multiple_choice" ? array[index].multiple_choice_items.map((i, index) => (
														<div key={index} style={{ marginLeft: '20px' }}>
															{index + 1}번) {i.item_text}
														</div>
													)) : array[index].type === "short_answer" ? <div style={{ marginLeft: '20px' }}>
														<br />정답: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
														</div> : <div style={{ marginLeft: '20px' }}>
																<br /> 풀이:
														</div>}
													<br /><br />
												</div>
											</div>
									</div>
								</div>
							)}
						</div>
					</div>}
					{this.props.type !== 'question' && <div>
								{this.props.type === 'both' && <div className="section" />}
								<h2 style={{ fontSize: '50px', textAlign: 'center', paddingBottom: '10px', marginLeft: '20px', marginRight: '20px', marginBottom: '30px', borderBottom: '3px solid black' }}>해답</h2>
								<div style={{ columnCount: '2', columnGap: '10px', columnRule: '3px solid black' }}>
									{this.props.answers.map((i, index, array) =>
										<div key={index}>
											<div style={{ width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden', }}>
													<div style={{ width: '100%', float: 'left' }}>
														<div style={{ fontSize: '16px', fontWeight: "bold", color: 'black', marginLeft: '30px' }}>{index + 1}번) {array[index].answer} </div><br />
														<div style={{ width: '90%', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
															<div style={{ width: '90%', overflowX: '90%', overflowY: '200px', marginLeft: '20px' }}>
																<Editor
																	scrollbarHidden
																	toolbarHidden
																	editorState={array[index].solution}
																	readOnly
																	// 한국어 설정
																	localization={{
																		locale: "ko",
																	}}
																/><br /><br />
															</div>

															<br /><br />
														</div>
													</div>
											</div>
										</div>
									)}
								</div>
							</div>}
				</div>
			</div>
		)
	}
}
export default TestPrintPage;