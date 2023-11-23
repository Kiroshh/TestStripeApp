import { Link } from 'react-router-dom';


const AccountSubscription = ({ subscription, customerId }) => {
    return (
        <section>
            <hr />
            <h4>
                <a href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
                    {subscription.id}
                </a>
            </h4>
            <p>Status: {subscription.status}</p>
            <p>Subscription period start: {(new Date(subscription.currentPeriodStart * 1000).toString())}</p>
            <p>Subscription Subscription end: {(new Date(subscription.currentPeriodEnd * 1000).toString())}</p>
            <Link to={{ pathname: '/cancel' }} state={{ subscriptionId: subscription.id, customerId: customerId }}>Cancel</Link>
        </section>
    );
};

export default AccountSubscription;