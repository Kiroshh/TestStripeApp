import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Subscribe = () => {
    const location = useLocation();
    const clientSecret = location.state?.clientSecret;
    const customerId = location.state?.customerId;

    const [name, setName] = useState('');
    const [messages, setMessages] = useState('');
    const [paymentIntent, setPaymentIntent] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const setMessage = (message) => {
        setMessages((prevMessages) => `${prevMessages}\n\n${message}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: name,
                    },
                },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setPaymentIntent(result.paymentIntent);
                navigate('/account', {
                    state: {
                        customerId: customerId,
                    }
                });
            }
        } catch (error) {
            setMessage('An error occurred while processing the payment.');
        }
    };

    if (!location.state) {
        return <div>Loading...</div>;
    }

    // Some styles below.

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%', // Ensure full width within container
    };

    // Styling for Stripe CardElement
    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '20px 0',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
    };

    const messageBoxStyle = {
        textAlign: 'left',
        fontSize: '14px',
        color: '#333',
        marginTop: '10px',
    };

    return (
        <div>
            <h1>Subscribe</h1>
            <p>Use a test card for payment.</p>
            <p>  When testing interactively, use a card number, such as 4242 4242 4242 4242. Enter the card number in the Dashboard or in any payment form.

                Use a valid future date, such as 12/34.
                Use any three-digit CVC (four digits for American Express cards).
                Use any value you like for other form fields.</p>
            <hr />
            <form onSubmit={handleSubmit} style={formStyle}>
                <label>
                    Full Name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
                </label>
                <div style={{ margin: '10px 0', width: '100%' }}>
                    <CardElement options={cardStyle} />
                </div>
                <button type="submit" style={buttonStyle}>Subscribe</button>
                <div style={messageBoxStyle}>{messages}</div>
            </form>
        </div>
    );
};

export default Subscribe;
