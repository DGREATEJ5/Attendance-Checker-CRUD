import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import {toast} from "react-toastify"
import axios from "axios"

const Home = () => {
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get")
        console.log(response.data)
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (number) => {
        if(window.confirm("Are you sure you want to delete this record?")){
            axios.delete(`http://localhost:5000/api/remove/${number}`)
            toast.success("Record Deleted Successfuly")
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div style={{marginTop: "50px"}}>
            <div className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Student Id</th>
                        <th style={{textAlign: "center"}}>Student Name</th>
                        <th style={{textAlign: "center"}}>Student Section</th>
                        <th style={{textAlign: "center"}}>Student Contact</th>
                        <th style={{textAlign: "center"}}>Date & Time</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.number}>
                                <th scope="row">{index+1}</th>
                                <td>{item.studentIDN}</td>
                                <td>{item.studentName}</td>
                                <td>{item.studentSection}</td>
                                <td>{item.studentContact}</td>
                                <td>{item.dateTime}</td>
                                <td>
                                    <Link to={`/update/${item.number}`}>
                                    <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteContact(item.number)}>Delete</button>
                                   {/* <Link to={`/view/${item.id}`}>
                                    <button className="btn btn-view">View</button>
                                    </Link> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </div>
            <Link to="/addStudent">
            <button className="btn btn-add">Add Student</button>
            </Link>
            
        </div>
    )
}


export default Home;