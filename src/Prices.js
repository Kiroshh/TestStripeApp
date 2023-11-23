import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Prices = () => {
    const [prices, setPrices] = useState([]);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const customer = location.state?.customer;

    // Mock function to simulate fetching prices
    const fetchPrices = () => {
        const mockPrices = [
            { id: 'price_1OFDHrBYhMpLcoXU2FQhWkTw', product: { name: '3 Months Plan' }, unit_amount: 3000 },
            { id: 'price_1OFDHrBYhMpLcoXUTKx8uSFl', product: { name: '6 Months Plan' }, unit_amount: 5500 },
            { id: 'price_1OFDHrBYhMpLcoXU3wxHKTDJ', product: { name: '12 Months Plan' }, unit_amount: 10000 },
        ];
        setPrices(mockPrices);
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const createSubscription = async (priceId) => {
        try {
            const customerId = customer.id;
            const response = await fetch('http://localhost:8080/api/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId,
                    priceId,
                }),
            });

            if (!response.ok) {
                throw new Error('Subscription creation failed');
            }

            const subscriptionDetails = await response.json();

            navigate('/subscribe', {
                state: {
                    subscriptionId: subscriptionDetails.subscriptionId,
                    clientSecret: subscriptionDetails.clientSecret,
                    customerId: customerId,
                }
            });
            console.log('Subscription created successfully:', subscriptionDetails);
        } catch (error) {
            console.error('Error during subscription creation:', error);
        }
    };

    return (
        <div>
            <h1>Select a plan</h1>
            <div className="price-list">
                {prices.map((price) => (
                    <div key={price.id}>
                        <h3>{price.product.name}</h3>
                        <p>${price.unit_amount / 100} / month</p>
                        <button onClick={() => createSubscription(price.id)}>
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Prices;
