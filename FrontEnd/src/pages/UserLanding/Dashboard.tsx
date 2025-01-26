import React, { useEffect, useState } from "react";
import { NavNav } from "../../components/NavNav";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addComplaintToIndexedDB, getComplaintsFromIndexedDB, clearComplaintsFromIndexedDB } from "../../utils/indexedDB";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  createdAt: string;
  userEmail: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMostUpvoted, setShowMostUpvoted] = useState(false);
  const [showUserComplaints, setShowUserComplaints] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:3000/complaints");
        const data = await response.json();
        setComplaints(data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  const handleUpvote = async (complaintId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/complaints/${complaintId}/upvote`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === complaintId
              ? { ...complaint, upvotes: complaint.upvotes + 1 }
              : complaint
          )
        );
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const sortComplaintsByUpvotes = () => {
    const sortedComplaints = [...complaints].sort((a, b) => b.upvotes - a.upvotes);
    setComplaints(sortedComplaints);
    setShowMostUpvoted(true);
  };

  const resetSorting = () => {
    const originalOrder = [...complaints].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setComplaints(originalOrder);
    setShowMostUpvoted(false);
  };

  const fetchUserComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/user/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setComplaints(data.complaints);
      setShowUserComplaints(true);
    } catch (error) {
      console.error("Error fetching user complaints:", error);
    }
  };

  const resetToAllComplaints = async () => {
    try {
      const response = await fetch("http://localhost:3000/complaints");
      const data = await response.json();
      setComplaints(data.complaints);
      setShowUserComplaints(false);
    } catch (error) {
      console.error("Error fetching all complaints:", error);
    }
  };



  const syncComplaints = async () => {
    console.log("Syncing complaints...");
    const complaints = await getComplaintsFromIndexedDB();
    console.log("Complaints from IndexedDB:", complaints);
  
    if (complaints.length > 0) {
      try {
        const response = await fetch("http://localhost:3000/complaints/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ complaints }),
        });
  
        if (response.ok) {
          console.log("Complaints synced successfully!");
          await clearComplaintsFromIndexedDB();
          alert("Offline complaints synced successfully!");
          
          // Refresh the dashboard to show the newly synced complaints
          window.location.reload(); // Or use a state update to refresh the dashboard
        } else {
          console.error("Failed to sync complaints:", response.statusText);
        }
      } catch (error) {
        console.error("Error syncing complaints:", error);
      }
    } else {
      console.log("No complaints to sync.");
    }
  };




  return (
    <div>
      <NavNav />
      <div className="dashboard-container">
        <div className="dashboard-actions">
          <button
            onClick={() => navigate("/submit-complaint")}
            className="register-complaint-btn"
          >
            {t("dashboard.registerNewComplaint")}
          </button>
          {showMostUpvoted ? (
            <button onClick={resetSorting} className="sort-button">
              {t("dashboard.showAllComplaints")}
            </button>
          ) : (
            <button onClick={sortComplaintsByUpvotes} className="sort-button">
              {t("dashboard.showMostUpvoted")}
            </button>
          )}
          {showUserComplaints ? (
            <button onClick={resetToAllComplaints} className="sort-button">
              {t("dashboard.showAllComplaints")}
            </button>
          ) : (
            <button onClick={fetchUserComplaints} className="sort-button">
              {t("dashboard.showMyComplaints")}
            </button>
          )}
        </div>

        <h1 className="dashboard-heading">{t("dashboard.heading")}</h1>
        <br />
        {loading ? (
          <p>{t("dashboard.loading")}</p>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-card">
                <div className="complaint-content">
                  <h3>{complaint.title}</h3>
                  <p>{complaint.description}</p>
                  <div className="complaint-meta">
                    <span>{complaint.category}</span>
                    <span>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="upvote-section">
                  <button
                    onClick={() => handleUpvote(complaint._id)}
                    className="upvote-btn"
                  >
                    {complaint.upvotes > 0 ? (
                      <FaHeart className="heart-icon filled" />
                    ) : (
                      <FaRegHeart className="heart-icon" />
                    )}
                  </button>
                  <span className="upvote-count">{complaint.upvotes}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
