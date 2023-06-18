import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import "./View.css";


const View = () => {
    const [state, setState] = useState({})

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
      


    return (
        <div style={{marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Student Details</p>
                </div>
                <div className="container">
                    <strong>Student ID Number: </strong>
                    <span>{state.studentIDN}</span>
                    <br />
                    <br />
                    <strong>Student Name: </strong>
                    <span>{state.studentName}</span>
                    <br />
                    <br />
                    <strong>Student Section: </strong>
                    <span>{state.studentSection}</span>
                    <br />
                    <br />
                    <strong>Student Contact: </strong>
                    <span>{state.studentContact}</span>
                    <br />
                    <br />
                    <Link to="/">
                    <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default View;