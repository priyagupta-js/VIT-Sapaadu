import React, {useState} from "react";
import axios from "axios";

import './Payment.css';
import { FaUser } from "react-icons/fa";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [upiId, setUpiId] = useState('');
    const [bankName, setBankName] = useState('');
    const [walletType, setWalletType] = useState('');

    const [responseID , setResponsedID] = useState("");
    const [responseState , setaResponseState] =useState([]);

    const loadScript =(src) =>{
        return new Promise((resolve) =>{
            const script =document.createElement ("script");

            script.src = src;

            script.onload =()=>{
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script);
        })
    }

    const createRazorPayOrder = (amount) => {
        let data = JSON.stringify({
            amount:amount*100 , 
            currency :"INR"
        })

        let config = {
            method :"post",
            maxBodyLength : Infinity,
            url :"https://localhost:5000/orders",
            headers:{
                'Content-Type':'application/json'
            },
            data:data
        }

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data))
            handleRazorpayScreen(response.date.amount)
        })
        .catch((error) =>{
            console.log("error at" , error)
        })
    }
    const handleRazorpayScreen = async(amount) =>{
        const res = await loadScript("hhtps:/checkout.razorpay.com/v1/checkout.js")

        if (res) {
            alert("Some error at razorpay screen loading")
            return;
        }
        const options = {
        key :'rzp_Test_mmmm',
        amount:amount,
        currency : "INR",
        name : "VIT Sapaadu",
        description :" Payment to VIT Sapaadu",
        image :"img src",
        handler :function (response){
            setResponsedID(response.razorpay_payment_id)
        },
        prefill:{
            name:"VIT Sapaadu",
            email :"vtisapaadu@gmail.com"

        },
        theme:{
            color:"#fff"
        }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const paymentFetch = (e) => {
        e.preventDefault();

        const paymentId = e.target.paymentId.value;

        axios.get(`https://localhost:5000/payment/${paymentId}`)
        .then ((response) =>{
            console.log(response.data);
            setaResponseState(response.data)
        })
        .catch ((error) =>{
            console.log("error occures" , error)
        })
    }

    const totalAmount = 550; // Example amount in ₹

    const handlePayment = (e) => {
        e.preventDefault();
        alert('Payment Successful!');
    };
    return (
         <div className="payment-body">
            <nav>
                <div className="navbar-logo">
                    <h1>VIT Sapaadu</h1>
                </div>
                <div className="navbar-user">
                    <button type="submit" className="user-button" name="user-button"><FaUser className="icon"/>USER</button>
                </div>
            </nav>
            <div className="payment-wrapper">
                <h2 className="payment-amount">Total Amount: ₹{totalAmount}</h2>
                
                <h3 className="payment-title">Payment Options</h3>
                
                <div className="payment-methods">
                    {/* <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                    />
                    Credit/Debit Card
                    </label> */}
                    <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                    />
                    UPI
                    </label>
                    {/* <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                    />
                    Net Banking
                    </label> */}
                    {/* <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={paymentMethod === 'wallet'}
                        onChange={() => setPaymentMethod('wallet')}
                    />
                    Wallet
                    </label> */}
                </div>

                <form className="payment-form" onSubmit={handlePayment}>
                    {paymentMethod === 'card' && (
                    <>
                        <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label>CVV</label>
                        <input
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label>Name on Card</label>
                        <input
                            type="text"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        </div>
                    </>
                    )}

                    {paymentMethod === 'upi' && (
                    <div className="form-group">
                        <label>UPI ID</label>
                        <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        required
                        />
                    </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                    <div className="form-group">
                        <label>Select Bank</label>
                        <select value={bankName} onChange={(e) => setBankName(e.target.value)} required>
                        <option value="">Select Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        </select>
                    </div>
                    )}

                    {paymentMethod === 'wallet' && (
                    <div className="form-group">
                        <label>Select Wallet</label>
                        <select value={walletType} onChange={(e) => setWalletType(e.target.value)} required>
                        <option value="">Select Wallet</option>
                        <option value="Paytm">Paytm</option>
                        <option value="GooglePay">Google Pay</option>
                        <option value="PhonePe">PhonePe</option>
                        </select>
                    </div>
                    )}

                    <button type="button" onClick={()=>createRazorPayOrder(100)} className="payment-button">Pay Now</button>
                    {responseID && <p>{responseID}</p>}
                    <h1>This is a payment verification form</h1>

                </form>
                <form onSubmit={paymentFetch}>
                <input type="text" name="paymentId" />
                <button type="submit">Fetch Payment</button>
                    {responseState.length!==0 && (
                        <ul>
                            <li>{responseState.amount/100}Rs</li>
                            <li>{responseState.currency}</li>
                            <li>{responseState.status}</li>
                            <li>{responseState.method}</li>
                        </ul>
                    )} 
                </form>
            </div>
         </div>
    );
};

export default Payment;