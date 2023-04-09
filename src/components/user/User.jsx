import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

const User = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/users`,
          method: "GET",
          //add userId later
        });
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchTransaction();
  }, []);

  return (
    <div className='container'>
      <div className='d-flex flex-row justify-content-between p-3 align-items-center'>
        <h1>User list</h1>
        <Link
          className='btn btn-outline-success align-items-center rounded-5'
          to={"/"}>
          Add users
        </Link>
      </div>
      <table className='table text-center table-sm align-middle shadow'>
        <thead className='bg-ligh'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>UserName</th>
            <th scope='col'>Full Name</th>
            <th scope='col'>Phone number</th>
            <th scope='col'>Email</th>
            <th scope='col'>Admin</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <th scope='row'>{user._id}</th>
                  <td>{user.userName}</td>
                  <td>{user.fullName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin.toString()}</td>
                  <td>
                    <button
                      className={
                        user.isAdmin
                          ? "btn disabled btn secondary"
                          : "btn btn-danger"
                      }>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
