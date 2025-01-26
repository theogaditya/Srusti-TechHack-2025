import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Ensure this import is added
import { Complaint } from "../../pages/UserLanding/Dashboard";
import { FaTrash } from "react-icons/fa";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [complaintsRes, statsRes] = await Promise.all([
          fetch("http://localhost:3000/admin/complaints", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3000/admin/complaints/statistics/districts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!complaintsRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const complaintsData = await complaintsRes.json();
        const statsData = await statsRes.json();

        console.log("Complaints Data:", complaintsData); // Debugging
        console.log("Stats Data:", statsData); // Debugging

        setComplaints(complaintsData.complaints || []);
        setStats(statsData.statistics || []);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch data. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (complaintId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/complaints/${complaintId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.ok) {
        setComplaints((prev) => prev.filter((c) => c._id !== complaintId));
      } else {
        throw new Error("Failed to delete complaint");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete complaint. Check console for details.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Super Admin Dashboard</h1>

      <div className="stats-section">
        <h2>Complaints Analytics</h2>
        <ul>
          {stats?.map((stat: any) => (
            <li key={stat.district}>
              {stat.district}: {stat.count}
            </li>
          ))}
        </ul>
      </div>

      <div className="complaints-list">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint._id} className="complaint-card">
              <div className="complaint-content">
                <h3>{complaint.title}</h3>
                <p>{complaint.description}</p>
                <div className="complaint-meta">
                  <span>Upvotes: {complaint.upvotes}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(complaint._id)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
    </div>
  );
}