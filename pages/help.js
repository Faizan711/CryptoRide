
function RideHelp() 
{
    return (
        <div>
            {/* Header section */}
            <header className="header">
                <div className="header-logo">
                    <h1>Help</h1>
                </div>

            </header>
            {/* Main content section */}
            <main className="main-content">
                <section className="faq-section">
                    <h2 className="section-heading">Frequently Asked Questions</h2>
                    {/* List of FAQs */}
                    <ul className="faq-list">
                        {/* How do I request a ride? */}
                        <li>
                            <h3 className="faq-heading">How do I request a ride?</h3>
                            <p className="faq-answer">To request a ride, open the cryptoRide app and enter your destination. The app will show you the available ride options and their estimated arrival times. Just tap the one you want and confirm your pickup location.</p>
                        </li>
                        {/* How do I pay for my ride? */}
                        <li>
                            <h3 className="faq-heading">How do I pay for my ride?</h3>
                            <p className="faq-answer">Payment is automatic and secure with your credit or debit card on file. You can also add or update payment methods in the app.</p>
                        </li>
                        {/* What if I have an issue during my ride? */}
                        <li>
                            <h3 className="faq-heading">What if I have an issue during my ride?</h3>
                            <p className="faq-answer">If you have an issue during your ride, you can contact your driver or cryptoRide support through the app.</p>
                        </li>
                        {/* How do I rate my driver? */}
                        <li>
                            <h3 className="faq-heading">How do I rate my driver?</h3>
                            <p className="faq-answer">After your ride, you can rate your driver and provide feedback on your experience. Just go to the cryptoRide app menu and select "Your Trips". Then, select the trip you want to rate and provide your feedback.</p>
                        </li>
                        {/* How do I contact cryptoRide support? */}
                        <li>
                            <h3 className="faq-heading">How do I contact cryptoRide support?</h3>
                            <p className="faq-answer">You can contact cryptoRide support through the app or by visiting the cryptoRide Help Center. To contact support through the app, go to the cryptoRide app menu and select "Help". Then, select the issue you're having and follow the prompts. If you prefer to contact support through the web, you can visit the cryptoRide Help Center at help.cryptocryptoRide.com.</p>
                        </li>
                        {/* How do I apply to be a cryptoRide driver? */}
                        <li>
                            <h3 className="faq-heading">How do I apply to be a cryptoRide driver?</h3>
                            <p className="faq-answer">If you're interested in becoming a cryptoRide driver, you can apply through the cryptoRide app or website. Just go to the "Drive with cryptoRide" section of the app or visit the cryptoRide website at cryptocryptoRide.com/drive.</p>
                        </li>
                        {/* How do I cancel a ride? */}
                        <li>
                            <h3 className="faq-heading">How do I cancel a ride?</h3>
                            <p className="faq-answer">To cancel a ride, open the cryptoRide app and select the trip you want to cancel. Then, tap "Cancel Ride" and follow the prompts.</p>
                        </li>
                        {/* How do I check my ride history? */}
                        <li>
                            <h3 className="faq-heading">How do I check my ride history?</h3>
                            <p className="faq-answer">To view your ride history, open the cryptoRide app and go to the "Your Trips" section. Here, you can see a list of all your past trips and their details.</p>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default RideHelp;