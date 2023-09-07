import React, { useEffect, useState } from "react";
import axios from "axios";
import NoUpcomingAppointments from "../DoctorPortal/noAppointment";
import { SERVER_URL } from "../../constants";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBTypography, MDBSpinner
} from "mdb-react-ui-kit";

import Counter from "./counter";

export default function Upcoming() {
  const [data, setData] = useState([]);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Function to calculate time difference in seconds
  function timeDiff(str) {
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330; // IST offset UTC +5:30
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    let hoursIST = ISTTime.getHours();
    let minutesIST = ISTTime.getMinutes();
    let hours = str.substring(0, 2);
    let minutes = str.substring(3, 5);
    let num = hours - hoursIST;
    num *= 60;
    let num1 = minutes - minutesIST;
    return (num + num1) * 60;
  }

  useEffect(() => {
    // Fetch upcoming appointments data when component mounts
    const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios
        .get(`${SERVER_URL}/patient/${id}/upcoming`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
        .then((resp) => {
          resp.data.upcoming.sort((a, b) => {
            const timeA = a.time.split('-')[0]; // Extract the start time
            const timeB = b.time.split('-')[0];
            // Compare the start times as strings (lexicographically)
            return timeA.localeCompare(timeB);
          });
          setData(resp.data.upcoming);

          setRemainingTime(timeDiff(resp.data.upcoming[0].time));
          setName(resp.data.name);
          setLoading(false);
          setLink(`https://eclinic-web.onrender.com/h/${resp.data.upcoming[0].idD}/${resp.data.upcoming[0].name}`);
        });
  }, []);



  const handleSubmit = async (event) => {
    // Handle the "Join Call" button click
    event.preventDefault();
    window.open(link, "_self");
  };

  return (
      <>
        {/* Show loading spinner if data is not fetched */}
        { loading && <MDBSpinner grow color="success" />}
      <div style={{ width: "90%" }}>
        <h2 style={{ marginBottom: "50px", marginTop: "40px" }}>
          Welcome Back!
        </h2>
        {/* Show NoUpcomingAppointments component if no data */}
        {data?.length == 0 && <NoUpcomingAppointments />}
        {data?.length!=0 &&(
            <MDBCard>
              <MDBCardHeader>Upcoming Appointment</MDBCardHeader>
              <MDBCardBody>
                <div className="row">
                  <div className="col-5">
                    <div className="d-flex text-black">
                      {/* Display doctor's profile image */}
                      <div className="flex-shrink-0" style={{ paddingRight: "4%" }}>
                        <MDBCardImage
                            style={{ width: '180px', borderRadius: '10px' }}
                            src={data[0].profilePic}
                            alt='Generic placeholder image'
                            fluid
                        />
                      </div>
                      {/* Display doctor's name, specialization, qualification, etc. */}
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>Dr.{data[0].name} ({data[0].spec})</MDBCardTitle>
                        <MDBCardText>{data[0].qualification} <br /> {data[0].exp} yrs</MDBCardText>
                        {/* Display appointment status and "Join Call" button */}
                        <div className="d-flex justify-content-start rounded-3 mb-2">
                          <span className="badge rounded-pill badge-success">scheduled</span>
                        </div>
                        <div className="d-flex pt-1">
                          <button type="button" onClick={handleSubmit} className="btn btn-outline-primary">Join Call</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{ textAlign: 'center', padding: "2%" }}>
                      {/* Display countdown timer */}
                      <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                        Your appointment in
                      </MDBTypography>
                    </div>
                    {/* Display Counter component if remainingTime is not null */}
                    {remainingTime != null && <Counter remainingTime={remainingTime} />}
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
        )}
        <br />
        <br />
        {data.length !== 0 && <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Doctor's Name</th>
              <th scope="col">Specialist</th>
              <th scope="col">Time</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {/* Map through data to display appointments */}
            {data?.map((appointment, indx) => {
              return (
                  <tr key={indx}>
                    {/* Display doctor's name, specialization, and appointment time */}
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1" style={{fontWeight: "600", color: "black"}}>
                          Dr.{appointment.name}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1" style={{fontWeight: "600", color: "black"}}>
                          {appointment.spec}
                        </p>
                      </div>
                    </td>
                    <td>
                      <p className="fw-formal mb-1" style={{fontWeight: "450", color: "black"}}>
                        {appointment.time}
                      </p>
                    </td>
                  </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        }
      </div>
      </>
  );
}
