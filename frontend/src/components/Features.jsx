import "../styles/Features.css";

function Features() {

    return (

        <section className="features">

            <h2>Why Choose CivicPulse?</h2>

            <div className="feature-container">

                <div className="feature-card">

                    <h3>📝 Report Issue</h3>

                    <p>
                        Report potholes, garbage,
                        water leakage and more.
                    </p>

                </div>

                <div className="feature-card">

                    <h3>📍 Track Issues</h3>

                    <p>
                        Monitor the status of your
                        reported issues.
                    </p>

                </div>

                <div className="feature-card">

                    <h3>📊 Dashboard</h3>

                    <p>
                        View live statistics
                        of civic issues.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default Features;