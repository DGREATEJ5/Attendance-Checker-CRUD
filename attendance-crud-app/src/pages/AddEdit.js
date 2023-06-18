import React, { useState, useEffect } from "react";
import { useNavigate , useParams, Link } from "react-router-dom";
import "./AddEdit.css"
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
    studentIDN: "",
    studentName: "",
    studentSection: "",
    studentContact: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState)

    const { studentIDN, studentName, studentSection, studentContact} = state

    const navigate = useNavigate()

    const {number} = useParams()
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/get/${number}`);
            setState({ ...response.data[0] });
          } catch (error) {
            // Handle error here
            console.error(error);
          }
        };
      
        fetchData();
      }, [number]);      

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!studentIDN || !studentName || !studentSection || !studentContact){
            toast.error("Please provide all the needed information")
        } else {
            if(!number){
                axios.post("http://localhost:5000/api/post", {
                    studentIDN,
                    studentName,
                    studentSection,
                    studentContact
                })
                .then(() => {
                    setState({studentIDN: "", studentName: "", studentSection: "", studentContact: ""})
                })
                .catch((err) => toast.error(err.response.data))
                toast.success("Attendance Added Sucessfully!")
            } else {
                axios.put(`http://localhost:5000/api/update/${number}`, {
                    studentIDN,
                    studentName,
                    studentSection,
                    studentContact
                })
                .then(() => {
                    setState({studentIDN: "", studentName: "", studentSection: "", studentContact: ""})
                })
                .catch((err) => toast.error(err.response.data))
                toast.success("Attendance Updated Sucessfully!")
            }
            
            setTimeout(() => navigate("/"), 500);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setState({...state, [name]: value})
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="studentIDN">ID Number</label>
                <input 
                type="text" 
                id="studentIDN"
                name="studentIDN"
                placeholder="Your Student ID Number"
                value={studentIDN || ""}
                onChange={handleInputChange}
                />

                <label htmlFor="studentName">Name</label>
                <input 
                type="text" 
                id="studentName"
                name="studentName"
                placeholder="Your Name"
                value={studentName || ""}
                onChange={handleInputChange}
                />

                <label htmlFor="studentSection">Section</label>
                <input 
                type="text" 
                id="studentSection"
                name="studentSection"
                placeholder="Your Section"
                value={studentSection || ""}
                onChange={handleInputChange}
                />

                <label htmlFor="studentContact">Contact</label>
                <input 
                type="text" 
                id="studentContact"
                name="studentContact"
                placeholder="Your Contact"
                value={studentContact || ""}
                onChange={handleInputChange}
                />

                <input type="submit" value={number ? "Update" : "Save"}/>
                <Link to="/">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}


export default AddEdit;