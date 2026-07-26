import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/ReportIssue.css";

function ReportIssue() {

  const [issue, setIssue] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/issues",
        issue
      );

      console.log(response.data);

      toast.success("Issue reported successfully!");

      setIssue({
        title: "",
        description: "",
        location: "",
        category: "",
      });

    } catch (error) {

      console.error(error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Failed to report issue"
        );
      } else {
        toast.error("Server not running or cannot connect");
      }

    }
  };

  return (
    <div className="report-container">
      <div className="report-card">

        <h2>Report Civic Issue</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Issue Title"
            value={issue.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={issue.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={issue.location}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={issue.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Road">Road</option>
            <option value="Garbage">Garbage</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Street Light">Street Light</option>
            <option value="Drainage">Drainage</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">
            Report Issue
          </button>

        </form>

      </div>
    </div>
  );
}

export default ReportIssue;