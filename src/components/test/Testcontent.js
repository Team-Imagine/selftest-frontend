import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Container, Accordion, Button, InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import store from "../../store";
import { propTypes } from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";


const Testcontent = ({ isOpen }) => {
  const [tests, setTests] = useState({
    test_list: [],
    curPage: 1,
  });
  const [pages, setPages] = useState([]);
  const [state, setState] = useState("normal");
  const [buttonColor, setButtonColor] = useState("info");

  let history = useHistory();

  useEffect(() => {
    axios.get("/api/testset/").then((res) => {
      console.log(res.data);
      setTests({ test_list: res.data.test_sets.rows });

      let count = res.data.test_sets.count / 10 + 1;
      let t_pages = [];

      for (var i = 1; i <= count; i++) {
        t_pages.push(i);
      }
      setPages(t_pages);
    });
  }, []);

  const loadTestPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/testset/`, {
        params: {
          page: index,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTests({ test_list: res.data.test_sets.rows, curPage: index });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const modifyHandler = () => {
    if (store.getState().isLoggedIn) {
      if (state === "normal") {
        setButtonColor("danger");
        setState("delete");
      } else {
        setButtonColor("info");
        setState("normal");
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
      history.push("/login");
    }
  };
  const deleteHandler = (index, e) => {
    e.preventDefault();

    var result = window.confirm("해당 Test를 삭제 하시겠습니까?");

    //console.log('test', tests);
    let id = tests.test_list[index].id;

    if (result) {
      axios
        .delete(`/api/testset/${id}`)
        .then((res) => {
          alert(res.data.message);
          axios
            .get(`/api/testset/`, {
              params: {
                page: tests.curPage,
              },
            })
            .then((res) => {
              console.log(res.data);
              setTests({ test_list: res.data.test_sets.rows });
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const makeHandler = () => {
    if (store.getState().isLoggedIn) {
      history.push(`/test/make_test/${1}`);
    } else {
      alert("로그인이 필요한 기능입니다.");
      history.push("/login");
    }

  };

  return (
    <Container fluid className={classNames("content", { "is-open": isOpen })}>
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h3 style={{ fontWeight: "bolder" }}>시험</h3>
        </div>
        <div className="p-2 bd-highlight">
          <Button
            variant="info"
            style={{ width: "9rem", height: "2.5rem" }}
            onClick={makeHandler}
          >
            시험 생성
          </Button>
          &nbsp;
          <Button
            variant={buttonColor}
            style={{ width: "9rem", height: "2.5rem" }}
            onClick={modifyHandler}
          >
            시험 수정
          </Button>
          &nbsp;
        </div>
      </div>
      <hr />
      <div style={{ height: "auto", minHeight: "48em", maxHeight: "48em" }}>
        <ul>
          {tests.test_list.length ? (
            tests.test_list.map((i, index) => (
              <div key={i.title}>
                <div className="row h-100 justify-content-center align-items-center">
                  <Alert
                    className="text-center"
                    variant="info"
                    style={{ width: "30%", height: "10%" }}
                  >
                    <Link
                      key={i.title}
                      to={{
                        pathname: `/test/${i.id}`,
                      }}
                    >
                      <div style={{ fontSize: 18 }}>{i.title}</div>
                    </Link>
                  </Alert>
                  &nbsp;&nbsp;
                  {state === "delete" && (
                    <Button
                      variant="danger"
                      onClick={(e) => deleteHandler(index, e)}
                    >
                      삭제
                    </Button>
                  )}
                  <br />
                </div>
              </div>
            ))
          ) : (
              <div>
                <h5>등록된 시험이 없습니다. 새로운 시험을 등록해주세요.</h5>
              </div>
            )}
        </ul>
      </div>
      <ul className="row justify-content-center align-items-center">
        {pages.map((i, index) => (
          <div key={index}>
            <button
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid",
                width: "1.5rem",
              }}
              onClick={(e) => loadTestPerPage(i, e)}
            >
              {i}
            </button>
            &nbsp;
          </div>
        ))}
      </ul>
    </Container>
  );
};

export default Testcontent;
