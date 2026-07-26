import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/ViewIssues.css";

function ViewIssues() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);

    const [editingIssue, setEditingIssue] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        category: ""
    });

    // Fetch All Issues
    const fetchIssues = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/issues"
            );

            setIssues(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch issues");

        }

    };

    // Update Status
    const updateStatus = async (id, currentStatus) => {

        let newStatus = "";

        if (currentStatus === "Pending") {
            newStatus = "In Progress";
        }
        else if (currentStatus === "In Progress") {
            newStatus = "Resolved";
        }
        else {

            toast.info("Issue is already resolved");
            return;

        }

        try {

            await axios.put(
                `http://localhost:8080/api/issues/${id}/status?status=${newStatus}`
            );

            toast.success("Status updated successfully!");

            fetchIssues();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update status");

        }

    };

    // Delete Issue
    const deleteIssue = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this issue?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:8080/api/issues/${id}`
            );

            toast.success("Issue deleted successfully!");

            fetchIssues();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete issue");

        }

    };

    // Open Edit Form
    const openEditForm = (issue) => {

        setEditingIssue(issue);

        setFormData({
            title: issue.title,
            description: issue.description,
            location: issue.location,
            category: issue.category
        });

    };

    // Handle Input Change
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // Update Issue
    const updateIssue = async () => {

        try {

            await axios.put(
                `http://localhost:8080/api/issues/${editingIssue.id}`,
                formData
            );

            toast.success("Issue updated successfully!");

            setEditingIssue(null);

            fetchIssues();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update issue");

        }

    };

    useEffect(() => {

        fetchIssues();

    }, []);

    return (

        <div className="issues-container">

            <h2>Reported Issues</h2>

            {issues.length === 0 ? (

                <p className="no-issues">
                    No Issues Found
                </p>

            ) : (

                <div className="issues-grid">

                    {issues.map((issue) => (

                        <div
                            className="issue-card"
                            key={issue.id}
                        >

                            <h3>{issue.title}</h3>

                            <p>
                                <strong>Description:</strong> {issue.description}
                            </p>

                            <p>
                                <strong>Location:</strong> {issue.location}
                            </p>

                            <p>
                                <strong>Category:</strong> {issue.category}
                            </p>

                            <p>
                                <strong>Status:</strong> {issue.status}
                            </p>

                            <p>
                                <strong>Created:</strong>{" "}
                                {issue.createdDate
                                    ? new Date(issue.createdDate).toLocaleString()
                                    : "N/A"}
                            </p>

                            <div className="button-group">

                                <button
                                    className="details-btn"
                                    onClick={() =>
                                        navigate(`/issues/${issue.id}`)
                                    }
                                >
                                    View Details
                                </button>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        openEditForm(issue)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="update-btn"
                                    onClick={() =>
                                        updateStatus(
                                            issue.id,
                                            issue.status
                                        )
                                    }
                                >
                                    Update Status
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteIssue(issue.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {editingIssue && (

                <div className="edit-modal">

                    <div className="edit-card">

                        <h2>Edit Issue</h2>

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                        />

                        <div className="modal-buttons">

                            <button
                                className="save-btn"
                                onClick={updateIssue}
                            >
                                Save Changes
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setEditingIssue(null)
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default ViewIssues;