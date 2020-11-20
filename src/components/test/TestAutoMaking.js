import React, { useState, useEffect } from 'react';

const TestAutoMaking = ({ onClose, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [testNumber, setTestNumber] = useState(0);
  
  useEffect(() => {
    /*
    if(color === 'auto') {
      setColorValue('auto');
    } else {
      if(color === 'black') {
        setColorValue('white');
      }
      if(color === 'white') {
        setColorValue('black');
      }
    }
    */   
  }, [subject]);

  useEffect(() => {
    
  }, [course]);

  useEffect(() => {
    
  }, [testNumber]);
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(subject, course, testNumber);
    onClose();
  }
  
  return (
    <div style={{width: '30rem', 
                height: '25rem', 
                position: 'fixed', 
                top: '40%', 
                left:'40%', 
                backgroundColor: '#ffffff', 
                border: '2px solid black', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                }}>
      <form name="testSet" onSubmit={onFormSubmit}>
      <div className="content">
        <h3>시험 자동 생성</h3>
        과목 선택
        <select 
          style={{width: '10rem', height: '2rem', marginLeft: '5%'}}
          name="subject"
          onChange={(e) => {setSubject(e.target.value)}}  
        >
          <option value="과목 선택">과목 선택</option>
          <option value="10">subject1</option>
          <option value="30">subject2</option>
          <option value="60">subject3</option>
        </select><br/><br/>
        강의 선택
        <select 
          style={{width: '10rem', height: '2rem', marginLeft: '5%'}}
          name="subject" 
          name="color"
          onChange={(e) => {setCourse(e.target.value)}}
        >
          <option value="강의 선택">강의 선택</option>
          <option value="auto">course1</option>
          <option value="black">course2</option>
          <option value="white">course3</option>
        </select><br/><br/>
        문항 수
        <select 
          style={{width: '10rem', height: '2rem', marginLeft: '8.5%'}}
          name="color"
          onChange={(e) => {setTestNumber(e.target.value)}}
        >
          <option value="문항 수">문항 수</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select><br/><br/><br/><br/>
        <button style={{width: '10rem', height: '2rem', margin: '5%'}} type="submit">확인</button>
        <button style={{width: '10rem', height: '2rem', margin: '5%'}} onClick={onClose}>닫기</button>
      </div> 
      </form>
    </div>
  );
};

export default TestAutoMaking;