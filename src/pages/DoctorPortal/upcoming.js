import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import NoUpcomingAppointments from './noAppointment'
import { SERVER_URL } from "../../constants";
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
    MDBTypography, MDBSpinner
} from "mdb-react-ui-kit";

import Counter from "./../PatientPortal/counter"

// This is the Upcoming component
export default function Upcoming() {

    const [data, setData] = useState([]);

    const [remainingTime, setRemainingTime] = useState(null);
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(true); // State to track loading status

    // Function to calculate time difference
    function timeDiff(str) {
        let currentTime = new Date();
        let currentOffset = currentTime.getTimezoneOffset();
        let ISTOffset = 330; // IST offset UTC +5:30
        let ISTTime = new Date(
            currentTime.getTime() + (ISTOffset + currentOffset) * 60000
        );
        let hoursIST = ISTTime.getHours();
        let minutesIST = ISTTime.getMinutes();
        let hours = str.substring(0, 2);
        let minutes = str.substring(3, 5);
        let num = hours - hoursIST;
        num *= 60;
        let num1 = minutes - minutesIST;
        return (num + num1) * 60;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        window.open(link, "_self");
    };

    // useEffect to fetch data
    useEffect(() => {
        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .get(`${SERVER_URL}/doctor/${id}/upcoming`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
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
                setLoading(false);
                setLink(`https://eclinic-web.onrender.com/h/${resp.data.upcoming[0].idD}/${resp.data.upcoming[0].name}`);
            });
    }, []);

    return (
        <>
        { loading && <MDBSpinner grow color="success" />}
        <div style={{ width: "90%" }}>
            <h2 style={{ marginBottom: "50px", marginTop: "40px" }}>
                Welcome Back!
            </h2>

            {/* Show NoUpcomingAppointments component if no data */}
            {data?.length == 0 && <NoUpcomingAppointments />}
            {data?.length!=0 && (

                <MDBCard>

                    <MDBCardHeader>Upcoming Appointment</MDBCardHeader>
                    <MDBCardBody>
                        <div className="row">
                            <div className="col-5">

                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0" style={{ paddingRight: "10%"  }}>
                                            <MDBCardImage
                                                style={{ width: '180px', borderRadius: '10px' }}
                                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                                alt='Generic placeholder image'
                                                fluid
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3" style={{paddingTop:"5%"}}>
                                            <MDBCardTitle>{data[0].name}({data[0].gender}) </MDBCardTitle>
                                            <div className="d-flex justify-content-start rounded-3  mb-2">
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
                                    <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                                        Your appointment in
                                    </MDBTypography>
                                </div>
                                {/* Conditionally render Counter component */}
                                {remainingTime != null && (
                                    <Counter remainingTime={remainingTime}  />
                                )}
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            )}
            <br />
            <br />
            {data.length !== 0 && (
                <MDBTable align="middle">
                    <MDBTableHead>
                        <tr>
                            <th scope="col">Patient's Name</th>
                            <th scope="col">Time</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {data?.map((appointment) => {
                            return (
                                <tr key={appointment.id}>
                                    <td>
                                        <div className="ms-3">
                                            <p
                                                className="fw-bold mb-1"
                                                style={{
                                                    fontWeight: "600",
                                                    color: "black",
                                                }}
                                            >
                                                {appointment.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <p
                                            className="fw-formal mb-1"
                                            style={{
                                                fontWeight: "450",
                                                color: "black",
                                            }}
                                        >
                                            {appointment.time}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </MDBTableBody>
                </MDBTable>
            )}
        </div>
        </>
    );
}
