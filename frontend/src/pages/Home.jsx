import { Link } from "react-router-dom";
import "../styles/Home.css";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to CivicPulse</h1>

        <p>
          Report civic issues quickly and help improve your community.
        </p>

        <Link to="/report">
          <button>Report an Issue</button>
        </Link>
      </section>

      <Features />

      <Footer />
    </>
  );
}

export default Home;