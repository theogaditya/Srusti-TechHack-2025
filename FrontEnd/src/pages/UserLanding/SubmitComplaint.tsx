import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addComplaintToIndexedDB, getComplaintsFromIndexedDB, clearComplaintsFromIndexedDB } from "../../utils/indexedDB";
import "./SubmitComplaint.css";

export function SubmitComplaint() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step-by-step form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    district: "",
    pincode: "",
    urgencyLevel: "Low",
    photos: [] as File[],
    consentForFollowUp: false,
  });
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log("App is online.");
      setIsOnline(true);
    };
  
    const handleOffline = () => {
      console.log("App is offline.");
      setIsOnline(false);
    };
  
    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  
    // Cleanup event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Sync complaints when online
  useEffect(() => {
    if (isOnline) {
      console.log("App is online. Syncing complaints...");
      syncComplaints();
    }
  }, [isOnline]);

  // Function to sync complaints from IndexedDB to the server


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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to sync complaints:", errorData);
        throw new Error(errorData.msg || "Failed to sync complaints");
      }

      const data = await response.json();
      console.log("Complaints synced successfully:", data);
      await clearComplaintsFromIndexedDB();
      alert("Offline complaints synced successfully!");
    } catch (error) {
      console.error("Error syncing complaints:", error);
      alert(`Failed to sync complaints: ${
        error instanceof Error ? error.message : "Unknown error occurred" }`);
    }
  } else {
    console.log("No complaints to sync.");
  }
};



  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photos: Array.from(e.target.files) });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.address ||
      !formData.district ||
      !formData.pincode
    ) {
      setError("All fields are required.");
      return;
    }
  
    const complaintData = {
      title: formData.title,
      description: formData.description,
      address: formData.address,
      district: formData.district,
      pincode: formData.pincode,
      urgencyLevel: formData.urgencyLevel,
      consentForFollowUp: formData.consentForFollowUp,
      userEmail: localStorage.getItem("userEmail") || "",
      upvotedBy: [], // Initialize as empty array
      upvotes: 0, // Initialize as 0
      createdAt: new Date(), // Add current timestamp
    };
  
    if (isOnline) {
      // If online, submit the complaint directly to the server
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("district", formData.district);
        formDataToSend.append("pincode", formData.pincode);
        formDataToSend.append("urgencyLevel", formData.urgencyLevel);
        formDataToSend.append("consentForFollowUp", formData.consentForFollowUp.toString());
  
        if (formData.photos && formData.photos.length > 0) {
          formData.photos.forEach((file) => {
            formDataToSend.append("photos", file);
          });
        }
  
        const response = await fetch("http://localhost:3000/complaintSub", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Complaint submitted successfully!");
          navigate("/dashboard");
        } else {
          setError(data.msg || "Failed to submit complaint. Please try again.");
        }
      } catch (err) {
        console.error("Error submitting complaint:", err);
        setError("An error occurred. Please try again later.");
      }
    } else {
      // If offline, save the complaint to IndexedDB
      try {
        await addComplaintToIndexedDB(complaintData);
        alert("Complaint saved offline. It will be synced when you are back online.");
      } catch (error) {
        console.error("Error saving complaint offline:", error);
        setError("Failed to save complaint offline. Please try again.");
      }
    }
  };

  // Check if the current step is valid
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.description;
      case 2:
        return formData.address && formData.district && formData.pincode;
      case 3:
        return true; // No validation needed for step 3
      default:
        return false;
    }
  };

  return (
    <div className="submit-complaint-container">
      <h1>Register New Complaint</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Step Progress Indicator */}
      <div className="step-progress">
        <div className="step-indicator">
          Step {step} of 3
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step-by-step form */}
      {step === 1 && (
        <div className="form-step">
          <h2>Step 1: Basic Information</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter complaint title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!isStepValid()}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Step 2: Location Details</h2>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter your district"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="back-button"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!isStepValid()}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <h2>Step 3: Additional Details</h2>
          <div className="form-group">
            <label htmlFor="urgencyLevel">Urgency Level</label>
            <select
              id="urgencyLevel"
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="photos">Upload Photos (Max 5)</label>
            <input
              type="file"
              id="photos"
              name="photos"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="consentForFollowUp"
                checked={formData.consentForFollowUp}
                onChange={(e) => setFormData({ ...formData, consentForFollowUp: e.target.checked })}
              />
              I consent to follow-up communication regarding this complaint.
            </label>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="back-button"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </button>
          </div>
          <button onClick={syncComplaints}>Sync Complaints</button>
        </div>
      )}
    </div>
  );
}