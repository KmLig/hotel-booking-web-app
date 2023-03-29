import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";

function Transaction() {
  const [errorMessage, setErrorMessage] = useState("");

  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/hotel/transaction`,
          method: "POST",
          data: { user: userId },
        });
        console.log(response.data);
        setTransactions([...transactions, response.data.transactions]);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchTransaction();
  }, []);
  console.log(transactions);
  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='container'>
        <h1>Your transactions</h1>
        <table className='table text-center'>
          <thead className='bg-primary'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Hotel</th>
              <th scope='col'>Room</th>
              <th scope='col'>Date</th>
              <th scope='col'>Price</th>
              <th scope='col'>Payment method</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <th scope='row'>1</th>
                    <td>{transaction.hotel.name}</td>
                    <td>{transaction.room}</td>
                    <td>
                      {format(new Date(transaction.dateStart), "dd/MM/yyyy") +
                        " - " +
                        format(new Date(transaction.dateEnd), "dd/MM/yyyy")}
                    </td>
                    <td>{transaction.price}</td>
                    <td>{transaction.payment}</td>
                    <td>
                      <span
                        className={
                          transaction.status !== "Booked"
                            ? "text-success"
                            : "text-danger"
                        }>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <MailList />
      <Footer />
    </div>
  );
}

export default Transaction;
