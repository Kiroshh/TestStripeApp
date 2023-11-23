import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountSubscription from './AccountSubscription';

const Account = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const location = useLocation();
    const customerId = location.state?.customerId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/list-subscriptions/${customerId}`);
                if (!response.ok) {
                    throw new Error('Error fetching subscriptions');
                }
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [customerId]);

    if (!subscriptions) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Account</h1>
            {/* TODO: need to pass customer id */}
            <Link to="/prices" state={{ customer: { id: customerId } }}>Add a subscription</Link>
            <h2>Subscriptions</h2>
            <div id="subscriptions">
                {subscriptions.map((s) => (
                    <AccountSubscription key={s.id} subscription={s} customerId={customerId} />
                ))}
            </div>
        </div>
    );
};

export default Account;
