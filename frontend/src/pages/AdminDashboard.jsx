import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalIssues: 0,
        pendingIssues: 0,
        inProgressIssues: 0,
        resolvedIssues: 0
    });

    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const fetchDashboardStats = async () => {

        try {

            const response = await api.get(
                "/issues/dashboard/stats"
            );

            setStats(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchRecentIssues = async (currentSearch = search, currentStatus = statusFilter) => {

        try {

            const params = new URLSearchParams();

            if (currentSearch) {
                params.append("search", currentSearch);
            }

            if (currentStatus && currentStatus !== "All") {
                params.append("status", currentStatus);
            }

            const response = await api.get(
                `/issues${params.toString() ? `?${params.toString()}` : ""}`
            );

            setIssues(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchDashboardStats();
        fetchRecentIssues(search, statusFilter);

    }, [search, statusFilter]);

    const filteredIssues = issues;

    return (

        <div className="dashboard-container">

            <h2>Admin Dashboard</h2>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h3>Total Issues</h3>
                    <h1>{stats.totalIssues}</h1>
                </div>

                <div className="dashboard-card pending">
                    <h3>Pending Issues</h3>
                    <h1>{stats.pendingIssues}</h1>
                </div>

                <div className="dashboard-card progress">
                    <h3>In Progress Issues</h3>
                    <h1>{stats.inProgressIssues}</h1>
                </div>

                <div className="dashboard-card resolved">
                    <h3>Resolved Issues</h3>
                    <h1>{stats.resolvedIssues}</h1>
                </div>

            </div>

            <div className="quick-actions">

                <h2>Quick Actions</h2>

                <div className="action-buttons">

                    <button onClick={() => navigate("/report")}>
                        Report Issue
                    </button>

                    <button onClick={() => navigate("/issues")}>
                        View Issues
                    </button>

                </div>

            </div>

            <div className="filter-container">

                <input
                    type="text"
                    placeholder="Search issues..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>

            </div>

            <div className="recent-issues">

                <h2>Recent Issues</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredIssues.length === 0 ? (

                            <tr>
                                <td colSpan="4">No Issues Found</td>
                            </tr>

                        ) : (

                            filteredIssues.map((issue) => (

                                <tr key={issue.id}>

                                    <td>{issue.title}</td>
                                    <td>{issue.category}</td>
                                    <td>{issue.location}</td>

                                    <td>
                                        <span
                                            className={
                                                issue.status === "Pending"
                                                    ? "status pending-badge"
                                                    : issue.status === "In Progress"
                                                    ? "status progress-badge"
                                                    : "status resolved-badge"
                                            }
                                        >
                                            {issue.status}
                                        </span>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminDashboard;