import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe('pk_test_51OETLZBYhMpLcoXU2ZyHyVrqA23TeLzi2LGqJxvHCO9uQIyRmxZt6xM1ACf7AQdStikf7F6j3WruSXJh56eRNFYc00mcj7W01X');
root.render(
    <React.StrictMode>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </React.StrictMode>
);

