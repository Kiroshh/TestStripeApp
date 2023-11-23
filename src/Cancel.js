import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Cancel = () => {
    const [cancelled, setCancelled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { subscriptionId, customerId } = location.state;
    console.log(subscriptionId);

    const handleClick = async () => {
        if (!subscriptionId) {
            console.error('No subscription ID provided');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/cancel-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subscriptionId }),
            });

            if (!response.ok) {
                throw new Error('Error cancelling subscription');
            }

            setCancelled(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (cancelled) {
        navigate('/account', {
            state: {
                customerId: customerId,
            }
        });
    }

    return (
        <div>
            <h1>Cancel Subscription</h1>
            <button onClick={handleClick}>Confirm Cancellation</button>
        </div>
    );
};

export default Cancel;
