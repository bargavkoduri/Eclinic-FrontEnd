import axios from "axios";
import { SERVER_URL } from "../../constants";
import { useState } from "react";
import Swal from "sweetalert2";

const AddPrescription = (props) => {
    const { id,helperfun } = props;
    const date = new Date();
    const [data, setData] = useState([]);
    const [medicine, setMedicine] = useState({
        name: "",
        duration: "",
        dosage: "",
    });

    const handleChange = (e) => {
        setMedicine({
            ...medicine,
            [e.target.name]: e.target.value,
        });
    };

    const addHandler = () => {
        if (
            medicine.name !== "" &&
            medicine.duration !== "" &&
            medicine.dosage !== ""
        ) {
            let obj = {
                ...medicine,
                key: new Date().toISOString(),
            };
            setData([...data, obj]);
            setMedicine({
                name: "",
                duration: "",
                dosage: "",
            });
        }
    };

    const submitHandler = () => {
        let prescription = {};
        let temp = [...data];
        for (let i = 0; i < temp.length; i++) delete temp[i].key;
        prescription.medicines = temp;
        prescription.date = new Date();
        prescription.app_id = id;
        const { jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios.post(`${SERVER_URL}/prescription`, prescription, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then(() => {
            Swal.fire({
                title: "Success",
                text: "Prescription Submitted",
                icon: "success",
            })
            helperfun()
        })
    };

    const deletePres = (key) => {
        setData(data.filter((med) => med.key !== key));
    };
    return (
        <>
            <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-toggle="modal"
                data-target={`#exampleModal${id}`}
            >
                Add
            </button>
            <div
                className="modal fade"
                id={`exampleModal${id}`}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <>
                            <div className="pres-wrapper">
                                <div className="prescription">
                                    <div className="pres-head">
                                        <h2>E-Clinic</h2>
                                        <div className="pres-info">
                                            <h6>
                                                Date :{" "}
                                                {date.getDate() +
                                                    "/" +
                                                    (date.getMonth() + 1) +
                                                    "/" +
                                                    date.getFullYear()}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="pres-body">
                                        {data.length > 0 ? (
                                            <>
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Medicine</th>
                                                        <th scope="col">Dosage</th>
                                                        <th scope="col">Duration</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {data.map((med) => {
                                                        return (
                                                            <tr key={med.key}>
                                                                <td>
                                                                    <h6>{med.name}</h6>
                                                                </td>
                                                                <td>
                                                                    <h6>{med.dosage}</h6>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                    }}
                                                                >
                                                                    <h6>{med.duration}</h6>
                                                                    <button
                                                                        className="pres-del-btn"
                                                                        onClick={() => deletePres(med.key)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                </table>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <div className="pres-input-form">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Name of the Medicine"
                                                onChange={handleChange}
                                                value={medicine.name}
                                            />
                                            <select
                                                className="form-control"
                                                name="dosage"
                                                onChange={handleChange}
                                                value={medicine.dosage}
                                            >
                                                <option hidden value="">
                                                    Dosage
                                                </option>
                                                <option value={"1-1-1"}>1-1-1</option>
                                                <option value={"1-1-0"}>1-1-0</option>
                                                <option value={"1-0-1"}>1-0-1</option>
                                                <option value={"0-1-1"}>0-1-1</option>
                                                <option value={"1-0-0"}>1-0-0</option>
                                                <option value={"0-1-0"}>0-1-0</option>
                                                <option value={"0-0-1"}>0-0-1</option>
                                            </select>
                                            <select
                                                className="form-control"
                                                name="duration"
                                                onChange={handleChange}
                                                value={medicine.duration}
                                            >
                                                <option hidden value="">
                                                    Duration
                                                </option>
                                                <option value={"2 Days"}>2 Days</option>
                                                <option value={"4 Days"}>4 Days</option>
                                                <option value={"1 Week"}>1 Week</option>
                                                <option value={"10 Days"}>10 Days</option>
                                                <option value={"2 Weeks"}>2 Weeks</option>
                                            </select>
                                        </div>
                                        <div className="pres-footer">
                                            <button className="btn btn-primary" onClick={addHandler}>
                                                Add +
                                            </button>
                                            <button
                                                className="btn btn-success"
                                                onClick={submitHandler}
                                                data-dismiss="modal"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <style jsx>
                                {`
                  .prescription {
                    width: 600px;
                    padding: 1rem;
                    border: 1px solid grey;
                  }

                  .pres-wrapper {
                    display: flex;
                    justify-content: center;
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                  }

                  .pres-head {
                    display: flex;
                    justify-content: space-between;
                  }

                  .pres-body {
                    margin-top: 1rem;
                  }

                  .pres-footer {
                    margin-top: 1rem;
                    display: flex;
                    justify-content: space-between;
                  }

                  .pres-input-form {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                  }

                  .pres-input-form .form-control {
                    margin-right: 10px;
                  }

                  .pres-del-btn {
                    padding: 5px 10px;
                    font-size: 16px;
                    color: white;
                    cursor: pointer;
                    border: 0px;
                    border-radius: 10px;
                    background-color: red;
                  }
                `}
                            </style>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPrescription;