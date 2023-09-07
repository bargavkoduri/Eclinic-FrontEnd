

export default function Index({ state, handleSubmit,handleInputChange,error })
{
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div style={{textAlign: "center" }}>

                    <h4 className="display-8" style={{fontFamily: "Lucida Console, Courier New, monospace"}}>Medical Registration</h4>


                    <hr/>

                </div>

                <div className="form-group">
                    <label >Registration Number</label>
                    <input type="text" className="form-control" id="reg"
                        value={state.reg}
                        onChange={handleInputChange}
                           placeholder="Enter your medical registration number"
                           name="reg"/>
                    {error.reg && <p className="text-danger" style={{margin:"0"}}>{error.reg}</p>}
                </div>

                <div className="form-group">
                    <label >Registration Council</label>
                    <select style={{padding:"2%"}} id="inputState" className="form-control"
                        value={state.stateC}
                        onChange={handleInputChange}
                            name="stateC">
                        <option value="">Select Council</option>
                        <option value="AP">Andhra Pradesh Council</option>
                        <option value="AR">Arunachal Pradesh Council</option>
                        <option value="AS">Assam Council</option>
                        <option value="BR">Bihar Council</option>
                        <option value="CH">Chandigarh Council</option>
                        <option value="CT">Chhattisgarh Council</option>
                        <option value="DN">Dadra and Nagar Haveli Council</option>
                        <option value="DD">Daman and Diu  Council</option>
                        <option value="DL">Delhi  Council</option>
                        <option value="GA">Goa Council</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana Council</option>
                        <option value="HP">Himachal Pradesh  Council</option>
                        <option value="JK">Jammu and Kashmir Council</option>
                        <option value="JH">Jharkhand Council</option>
                        <option value="KA">Karnataka Council</option>
                        <option value="KL">Kerala Council</option>
                        <option value="LA">Ladakh Council</option>
                        <option value="LD">Lakshadweep Council</option>
                        <option value="MP">Madhya Pradesh Council</option>
                        <option value="MH">Maharashtra Council</option>
                        <option value="MN">Manipur Council</option>
                        <option value="ML">Meghalaya Council</option>
                        <option value="MZ">Mizoram Council</option>
                        <option value="NL">Nagaland Council</option>
                        <option value="OR">Odisha Council</option>
                        <option value="PY">Puducherry Council</option>
                        <option value="PB">Punjab Council</option>
                        <option value="RJ">Rajasthan Council</option>
                        <option value="SK">Sikkim Council</option>
                        <option value="TN">Tamil Nadu Council</option>
                        <option value="TG">Telangana Council</option>
                        <option value="TR">Tripura Council</option>
                        <option value="UP">Uttar Pradesh Council</option>
                        <option value="UT">Uttarakhand Council</option>
                        <option value="WB">West Bengal Council</option>
                    </select>
                    {error.stateC && <p className="text-danger" style={{margin:"0"}}>{error.stateC}</p>}
                </div>


                <div className="form-group">
                    <label >Specialization</label>
                    <select
                        style={{ padding: "2%" }}
                        id="inputState"
                        className="form-control"
                        value={state.spec}
                        onChange={handleInputChange}
                        name="spec"
                    >
                        <option value="">Select Specialization</option>
                        <option value="Anesthesiology">Anesthesiology</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Gastroenterology">Gastroenterology</option>
                        <option value="Hematology">Hematology</option>
                        <option value="Infectious Disease">Infectious Disease</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Psychiatry">Psychiatry</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Urology">Urology</option>
                        <option value="ENT">ENT</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                    </select>
                        {error.spec && <p className="text-danger" style={{margin:"0"}}>{error.spec}</p>}

                </div>
                <div className="form-group">
                    <label >Year of experience</label>
                    <select
                        style={{ padding: "2%" }}
                        id="inputState"
                        className="form-control"
                        value={state.exp}
                        onChange={handleInputChange}
                        name="exp"
                    >
                        <option value="">Select years of experience</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                        <option value="4">4 years</option>
                        <option value="5">5 years</option>
                        <option value="6">6 years</option>
                        <option value="7">7 years</option>
                        <option value="8">8 years</option>
                        <option value="9">9 years</option>
                        <option value="10+">10+ years</option>
                    </select>
                    {error.spec && <p className="text-danger" style={{margin:"0"}}>{error.spec}</p>}

                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Qualification</label>
                    <textarea className="form-control" placeholder="Please list your medical qualifications using commas to separate each qualification, including your degree(s), specialty training, and any additional relevant qualifications.."
                           name="qualification" value={state.qualification}
                              onChange={handleInputChange}  id="exampleFormControlTextarea1" rows="3"></textarea>
                    {error.qualification && <p className="text-danger" style={{margin:"0"}}>{error.qualification}</p>}
                </div>


                <div style={{textAlign:"center"}}>
                    <button type="submit" className="btn btn-dark btn-lg">Register</button>
                </div>

            </form>
        </>

    )
}