import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const EditRoomlModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomId, setRoomId] = useState(location.state.roomId);
  console.log(roomId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomWithId, setRoomWithId] = useState({});
  // const [newHotel, setNewHotel] = useState({});
  useEffect(() => {
    const fetchRoomWithID = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          url: `http://localhost:5000/api/admin/rooms/${roomId}`,
          method: "GET",
        });
        setRoomWithId(response.data.room);
        setIsLoading(false);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchRoomWithID();
  }, []);

  const handleChange = (e) => {
    setRoomWithId((prevState) => {
      if (e.target.name === "roomNumbers")
        return {
          ...prevState,
          [e.target.name]: e.target.value.split(","),
        };

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `http://localhost:5000/api/admin/editRoom/${roomId}`,
        method: "PATCH",
        data: roomWithId,
      });
      console.log(response.data);
      navigate("/room");
    } catch (error) {
      if (error) console.log(error);
    }
  };
  const cancelHandler = () => {
    navigate("/room");
  };
  console.log(roomWithId);
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <div className='shadow rounded-3 p-3 my-3 text-muted'>
        <h3>Do you want to edit room {roomWithId.name}?</h3>
        <button
          type='button'
          className='btn btn-warning me-2'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'>
          Edit
        </button>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={cancelHandler}>
          Come back
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                Edit hotel
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>

            <div className='modal-body'>
              {isLoading ? (
                <Loading />
              ) : (
                <form
                  className='mx-auto shadow rounded-3 p-4'
                  onSubmit={submitHandler}>
                  <div className='row my-2 d-flex flex-row justify-content-center'>
                    <div className='col form-floating my-auto'>
                      <input
                        type='text'
                        className='form-control'
                        value={roomWithId.title}
                        name='title'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='title' className='form-label ms-2'>
                        Title
                      </label>
                    </div>
                    <div className='col-2 form-floating my-auto'></div>
                    <div className='col form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={roomWithId.desc}
                        name='desc'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='desc' className='form-label ms-2'>
                        Type
                      </label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col form-floating'>
                      <input
                        type='number'
                        className='form-control'
                        value={roomWithId.maxPeople}
                        name='maxPeople'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='maxPeople' className='form-label ms-2'>
                        Max people
                      </label>
                    </div>
                    <div className='col-2 form-floating my-auto'></div>
                    <div className='col form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={roomWithId.price}
                        name='price'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='price' className='form-label ms-2'>
                        Price
                      </label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={roomWithId.roomNumbers}
                        name='roomNumbers'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='roomNumbers' className='form-label ms-2'>
                        Room Numbers
                      </label>
                    </div>
                  </div>

                  <div className=''></div>
                  <button
                    type='submit'
                    className='btn btn-outline-primary mx-auto text-center mt-4'
                    data-bs-dismiss='modal'
                    onClick={submitHandler}>
                    Edit hotel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRoomlModal;
