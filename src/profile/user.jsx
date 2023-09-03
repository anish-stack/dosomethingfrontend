import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.css'; // Import the CSS file
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Loader from '../Loder/loder';
import { useSelector } from 'react-redux';
import { logout } from '../redux/action'; // Import your logout action

function ProfilePage() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const Token = useSelector(state => state.auth.token);
  console.log("token",Token)
  const UserId = useSelector(state => state.auth.loginData);

  console.log(UserId);

  console.log(Token);

    const [ orders,setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      
        async function fetchData() {
          
          if (!Token) {
            toast.error('Please log in to view your profile.');
            window.location.href="/login"
            return;
          }
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          const config = {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
            
          };
          
          try {
            const userIdString = UserId._id;
            console.log("userid",userIdString); // This should now log the actual user ID
            
            const response = await axios.get(`https://dosomethingbackend-anish-stack.vercel.app/user/id/${userIdString}`);
            console.log("user-information", response.data.data); // Log the user data
            setUserInfo(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      
        fetchData();
      }, []);
      useEffect(() => {
        if (userInfo.email) {
          const email = userInfo.email;
          fetchOrderByEmail(email);
        } else {
          console.error('Contact number not available in userInfo:', userInfo);
        }
      }, [userInfo.email]);
      
      const fetchOrderByEmail = async (email) => {
        try {
          const response = await axios.get(`https://dosomethingbackend-anish-stack.vercel.app/meOrder/${email}`);      
          console.log(response)
          if (response.data.success) {
            if (response.data.numberOfOrders === 0) {
              console.log('No orders found for the provided contact number.');
            } else {
              const orders = response.data.orders;
              console.log(orders)
              setOrders(orders);
            }
          } else {
            console.log('Error fetching orders:', response.data.message);
            // toast.error('Error fetching orders:', response.data.message);
          }
        } catch (error) {
          // console.error('Error fetching orders by contact number:', error);
          // toast.error('Error fetching orders by contact number:', error);
        }
      };
    
      // Destructuring user info properties
      const {
        name,
        email,
        dateOfJoin,
        contactNumber,
      } = userInfo;
      const handleLogout = () => {
        // Dispatch the logout action to clear user data
        dispatch(logout());
    
        // Redirect to the login page after logout
        window.location.href = '/login'; // Replace with your login page URL
      };
  return (
    <div className="container">
       {loading && <Loader />}
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>
      <div className="profile-info">
        <h2>User Information</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Contact Number: {contactNumber}</p>
        <p>Date of Joining: {new Date(dateOfJoin).toLocaleDateString()}</p>
      </div>
      <div className='tableorder'>
      <h2>Your Orders</h2>
        <button onClick={fetchOrderByEmail}>Load Orders</button>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Item Name</th>
              <th>Items Price</th>
              <th>Shipping Price</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>cancel</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.orderItems[0].name}</td> {/* Display the first item's name */}
                <td>Rs{order.itemsPrice}</td>
                <td>Rs{order.shippingPrice}</td>
                <td>Rs{order.totalPrice}</td>
                <td>{order.orderStatus}</td>
                <td><button className='cancel' type="reset">Cancel</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleLogout}>Logout</button>

      </div>
      <ToastContainer/>
    </div>
  );
}

export default ProfilePage;
