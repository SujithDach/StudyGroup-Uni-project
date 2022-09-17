import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/AdminOverview.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import BootstrapPopup from "./BootStrapPopUp";

const AdminOverview = () => {
  const [students, setStudents] = useState([]);
  const [showDeleteIcon, setshowDeleteIcon] = useState(false);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [studentName, setStudentName] = useState("");


  const getStudents = async () => {
    fetch("/api/get-all-student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data["result"]);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div>
      <span className={`${styles.editIcon} d-flex gap-2 align-items-center`}>
        {!showDeleteIcon ? (
          <FontAwesomeIcon
            icon={faEdit}
            className="fa-2x"
            onClick={() => setshowDeleteIcon(!showDeleteIcon)}
          />
        ) : (
          <>
            <Button className={styles.addStudentBtn}>Add Student</Button>
            <FontAwesomeIcon
              icon={faClose}
              className="fa-2x"
              onClick={() => setshowDeleteIcon(!showDeleteIcon)}
            />
          </>
        )}
      </span>
      <Tabs
        defaultActiveKey="StudentsOverview"
        transition={false}
        className={`${styles.bootstrapTabContainer} mb-3`}
        id="student-tabs"
      >
        <Tab
          eventKey="StudentsOverview"
          title="Students Overview"
          tabClassName={`${styles.bootstrapSingleTab}`}
        >
          <div className={`${styles.bootstrapTabContent}`}>
            <Table className={`${styles.bootstrapTable}`} striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Student Name</th>
                  <th>Group</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr key={student._id}>
                      {showDeleteIcon ? (
                        <td>
                          <Button
                            variant="danger"
                            className={styles.deleteIcon}
                            onClick={() => {setshowDeletePopup(true); setStudentName(student.name)}}
                          >
                            <FontAwesomeIcon icon={faMinus} className="fa-1x" />
                          </Button>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      <td>{student.name}</td>
                      <td>
                        {student.group && student.group !== ""
                          ? student.group
                          : "Group not yet assigned"}
                      </td>
                      <td>
                        <Button
                          className={
                            student.allocation
                              ? styles.primCompbtn
                              : styles.primInCompbtn
                          }
                        >
                          {student.allocation
                            ? "Allocation Complete"
                            : "Allocation Incomplete"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab
          eventKey="GroupOverview"
          title="Group Overview"
          tabClassName={`${styles.bootstrapSingleTab}`}
        >
          <div className={`${styles.bootstrapTabContent}`}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Group Allocation Setting</th>
                  <th>Min Group Size</th>
                  <th>Max Group Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Button>Manual Allocation</Button>
                  </td>
                  <td>03 Students</td>
                  <td>05 Students</td>
                </tr>
              </tbody>
            </Table>
            <Accordion className={styles.Accordion}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex gap-5 w-100">
                    <span>Group 1</span>
                    <span className="ms-5"> 03/05 student</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped borderless hover>
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="d-flex gap-5 w-100">
                    <span>Group 2</span>
                    <span className="ms-5"> 04/05 student</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped borderless hover>
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Tab>
      </Tabs>
      <BootstrapPopup
        showPopup={showDeletePopup}
        setShowPopup={setshowDeletePopup}
        title="Delete Student"
        body={`Are you sure you want to remove "${studentName}" ?`}
        size={"md"}
        proceedBtnRequired={true}
        proceedBtnName="Confirm"
        closeBtnName="Cancel"
       />
    </div>
  );
};

export default AdminOverview;
