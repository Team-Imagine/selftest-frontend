import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Card from "react-bootstrap/Card";

import styled from "styled-components";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import axios from "axios";
import SideBarSmall from '../sidebar/SideBarSmall';

const MyBlock = styled.div`
  .wrapper-class {
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  .editor {
    height: 350px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    background-color: white;
  }
  .input {
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0;
    margin-bottom: 1rem;
    height: 60px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    background-color: white;
  }
`;

const MakeQuestion = ({ subject, course, isOpen, toggle }) => {
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorChoice, setEditorChoice] = useState(EditorState.createEmpty());
  const [editorSolution, setEditorSolution] = useState(
    EditorState.createEmpty()
  );
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [questionType, setQuestionType] = useState("객관식");
  const [choices, setChoices] = useState([0]);
  const [checked, setChecked] = useState([false]);
  const [checks, setChecks] = useState([false]);
  const [answer, setAnswer] = useState([]);

  const [imageFile, setImageFile] = useState([]);

  let uploadedImages = [];
  let history = useHistory();

  let choiceNumber = [0];
  let answerList = [0];

  let t_checkList = [];

  let checkedList = [];

  useEffect(() => { }, []);

  const moveBack = () => {
    history.push(`/subject/${subject}/${course}`);
  };

  const onEditorChange = (type, editorState) => {
    // editorState에 값 설정
    if (type === 1) {
      // 문제 내용 Editor
      setEditorState(editorState);
    } else if (type === 2) {
      setEditorChoice(editorState); // 서술형 답안 Editor
    } else {
      setEditorSolution(editorState); // 문제의 해설 Editor
    }
  };

  const imageUploadCallback = (file) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    setImageURL(imageObject.localSrc);

    uploadedImages.push(file);
    setSelectedFile(uploadedImages);

    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc, entityKey: file } });
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let editorToHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    let editorToHtml_solution = draftToHtml(
      convertToRaw(editorSolution.getCurrentContent())
    );

    let answer_items = [];
    let data;

    console.log(editorToHtml);

    //console.log(imageURL);

    let question_type;

    if (questionType === "주관식") {
      for (var i in answer) {
        answer_items.push({ item_text: answer[i] });
      }
      question_type = "short_answer";

    } else if (questionType === "객관식") {
      for (var i in answer) {
        answer_items.push({ item_text: answer[i], checked: checked[i] });
      }

      console.log(checked);
      question_type = "multiple_choice";

    } else {
      let editorToHtml_answer = draftToHtml(
        convertToRaw(editorChoice.getCurrentContent())
      );

      answer_items.push({ item_text: editorToHtml_answer });

      question_type = "essay";
    }

    // 이미지 업로드
    const formData = new FormData();

    for (var i = 0; i < selectedFile.length; i++) {
      formData.append("img", selectedFile[i]);
    }

    let images = [];

    await axios
      .post("/api/image/upload", formData, {
        headers: {
          Authorization: "token",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSelectedFile([]);

        for (var i = 0; i < res.data.images.length; i++) {
          images.push({ url: res.data.images[i].url });
        }

        console.log(images);

        if (question_type === "multiple_choice") {
          data = {
            title: title,
            type: "multiple_choice",
            content: editorToHtml,
            course_title: course,
            multiple_choice_items: answer_items,
            uploaded_images: images,
          };
        } else if (question_type === "short_answer") {
          data = {
            title: title,
            type: "short_answer",
            content: editorToHtml,
            course_title: course,
            short_answer_items: answer_items,
            uploaded_images: images,
          };
        } else {
          data = {
            title: title,
            type: "essay",
            content: editorToHtml,
            course_title: course,
            uploaded_images: images,
          };
        }

        axios.post(`/api/question/`, data)
          .then((res) => {
            setEditorState("");
            let temp = [];
            const nData = {
              question_id: res.data.question.id,
              content: editorToHtml_solution,
              uploaded_images: temp,
            };

            axios
              .post(`/api/answer/`, nData)
              .then((res) => {
                setEditorSolution("");
              })
              .catch((error) => {
                alert(error.response.data.message);
              });
            alert("관리자 승인 후 문제가 등록됩니다.");
            moveBack();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      });
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSelect = (e) => {
    setChoices([0]);
    setChecks([false]);
    setQuestionType(e);
  };

  const makeAnswer = (index, e) => {
    answerList = choices;

    answerList[index] = e.target.value;

    setAnswer([...answerList]);
  };

  const controlCheck = (index, e) => {
    checkedList = checks;
    checkedList[index] = e.target.checked;

    setChecked([...checkedList]);
  };

  const addChoice = (e) => {
    choiceNumber = choices;
    choiceNumber.push(0);

    t_checkList = checks;
    t_checkList.push(false);

    setChoices([...choiceNumber]);
    setChecks([...t_checkList]);
  };

  return (
    <Container
      fluid
      id="jb-container"
    >
      <SideBarSmall toggle={toggle} isOpen={!isOpen} />
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <div style={{ height: "2.5rem" }}>
            <h3 style={{ fontWeight: "bolder", fontSize: '1.5rem' }}>
              과목 {">"} {subject} {">"} {course} {">"} 문제 생성
            </h3>
          </div>

        </div>
      </div>
      <hr />

      <div className="row justify-content-center align-items-center">
        <MyBlock>
          <div className="d-flex">
            <InputGroup style={{ width: '15%' }}>
              <DropdownButton style={{paddingTop:"0.6rem"}}
                variant="outline-secondary"
                title={questionType}
                id="input-group-dropdown-1"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="객관식">객관식</Dropdown.Item>
                <Dropdown.Item eventKey="주관식">주관식</Dropdown.Item>
                <Dropdown.Item eventKey="서술형">서술형</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
      
            <input
              type="text"
              id="title"
              className="input"
              placeholder="문제 제목"
              fontSize="40"
              onChange={onChange}
            />
 
          </div>
          <Editor
            // 에디터와 툴바 모두에 적용되는 클래스
            wrapperClassName="wrapper-class"
            // 에디터 주변에 적용된 클래스
            editorClassName="editor"
            // 툴바 주위에 적용된 클래스
            toolbarClassName="toolbar-class"
            // 툴바 설정
            toolbar={{
              // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지

              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },

              image: {
                uploadCallback: imageUploadCallback,
                previewImage: true,
              },
            }}
            placeholder="내용을 작성해주세요."
            // 한국어 설정
            localization={{
              locale: "ko",
            }}
            // 초기값 설정
            editorState={editorState}
            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
            onEditorStateChange={(editorState) => {
              onEditorChange(1, editorState);
            }}
          />
        </MyBlock>
      </div>
      <div className="row justify-content-center align-items-center">
      <Card border="light" style={{width: '47rem', backgroundColor:"#DDF2F1", paddingTop:"1rem", paddingBottom:"1rem"}}>
      <div className="row justify-content-center align-items-center">
        
        {questionType === "객관식" ? (
          <div className="d-flex">
            <div className="justify-content-center align-items-center">
              <p>*답을 입력하고 정답에 체크해주세요.</p>
              {choices.map((i, index) => (
                <div key={index}>
                  <InputGroup className="mb-3">
                    <FormControl
                      aria-label="Text input with checkbox"
                      onChange={(e) => makeAnswer(index, e)}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        onChange={(e) => controlCheck(index, e)}
                      />
                    </InputGroup.Prepend>
                  </InputGroup>
                </div>
              ))}</div> &nbsp;&nbsp;
              
              <div style={{paddingTop:"2.6rem"}}>
              <Button style={{ height: '2rem' }} variant="outline-info" onClick={addChoice}>
                추가
            </Button>
            </div>

          </div>
        ) : questionType === "주관식" ? (
          <div className="d-flex">
            <div className="justify-content-center align-items-center">
            {choices.map((i, index) => (
              <div key={index}>
                <FormControl
                  placeholder="정답을 작성해주세요."
                  type="text"
                  id="title"
                  className="input"
                  style={{ width: "100%", height: "3rem" }}
                  onChange={(e) => makeAnswer(index, e)}
                />
              </div>
            ))}</div> &nbsp;&nbsp;
            <div style={{paddingTop:"0.4rem"}}>
              <Button style={{ height: '2rem' }} variant="outline-info" onClick={addChoice}>
                추가
            </Button>
            </div>
          </div>
        ) : <div></div>}
      </div>
      </Card>
      </div>
      <br />
      <div className="row justify-content-center align-items-center">
        <div style={{ backgroundColor: "white", height: "20rem" }}>
          {" "}
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor"
            toolbarClassName="toolbar-class"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
            placeholder="문제의 해설을 작성해주세요."
            editorState={editorSolution}
            onEditorStateChange={(editorState) => {
              onEditorChange(3, editorState);
            }}
            localization={{
              locale: "ko",
            }}
          />
        </div>
      </div>
      <br />
      <div className="row justify-content-center align-items-center">
        <Button className="btn-block" variant="info" onClick={submitHandler} style={{ width: '47rem' }}>
          문제 등록
        </Button>
      </div>
    </Container>
  );
};

export default MakeQuestion;
