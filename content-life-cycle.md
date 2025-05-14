# Content life cycle

### Step 1: Adi Registers a Complaint

* Entities Involved: User, Category, Complaint, Sub\_Category\_Mappings, Audit Log
* Process:
  1. Adi Logs In: Adi (User ID: "USR-2025-000008") logs into the system via OAuth using their email.
  2. Adi Submits Complaint:
     * Category: "Environment"
     * Sub\_Category: "Illegal dumping of waste"
     * Description: "Illegal waste dumping in XYZ Nagar park."
     * Location: { "PIN": "400001", "District": "Mumbai District", "City": "Mumbai", "Locality": "XYZ Nagar", "Street": "Park Road", "Geolocation": { "lat": 12.35, "long": 56.79 } }
     * Urgency: "High"
     * Attachment: "[https://cloudstorage.example.com/waste.jpg](https://cloudstorage.example.com/waste.jpg)"
     * Is\_Public: true
  3. Complaint Creation:
     *   A new Complaint record is created:json

         ```json
         {
           "complaint_id": "CMP-2025-123457",
           "submission_date": "2025-05-13T17:21:00+05:30",
           "complainant": "USR-2025-000008",
           "category": "Environment",
           "sub_category": "Illegal dumping of waste",
           "standardized_sub_category": null,
           "description": "Illegal waste dumping in XYZ Nagar park.",
           "location": {
             "PIN": "400001",
             "District": "Mumbai District",
             "City": "Mumbai",
             "Locality": "XYZ Nagar",
             "Street": "Park Road",
             "Geolocation": { "lat": 12.35, "long": 56.79 }
           },
           "urgency": "High",
           "attachment": "https://cloudstorage.example.com/waste.jpg",
           "assigned_department": "Environment",
           "status": "Registered",
           "sla": "5 days",
           "assigned_agent": null,
           "co_assigned_agents": [],
           "upvote_count": 0,
           "is_public": true,
           "feedback": null,
           "resolution_notes": null,
           "escalation_level": "DepartmentMunicipal",
           "date_of_resolution": null
         }
         ```
     * The complaint is added to User.current\_complaints: \["CMP-2025-123457"].
  4. AI Standardization:
     * The system standardizes "Illegal dumping of waste" to "Waste Dumping" using NLP.
     *   A new Sub\_Category\_Mappings record is created:json

         ```json
         {
           "mapping_id": "SCM-2025-000002",
           "category": "Environment",
           "original_sub_category": "Illegal dumping of waste",
           "standardized_sub_category": "Waste Dumping",
           "created_by": "System",
           "creation_date": "2025-05-13T17:21:05+05:30",
           "last_updated": "2025-05-13T17:21:05+05:30"
         }
         ```
     * Complaint.standardized\_sub\_category is updated to "Waste Dumping".
  5. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000008",
           "action": "Complaint Submitted",
           "user_id": "USR-2025-000008",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:21:05+05:30",
           "details": "Complaint submitted by user USR-2025-000008"
         }
         ```
* Role of Entities:
  * User: Submits the complaint.
  * Category: Provides category and sub-category options.
  * Complaint: Stores the complaint details.
  * Sub\_Category\_Mappings: Records the AI-standardized sub-category.
  * Audit Log: Logs the submission action.

***

### Step 2: Complaint Routed to Department Municipal Admin

* Entities Involved: Complaint, Category, DepartmentMunicipalAdmin, Audit Log
* Process:
  1. Routing Based on Category:
     * The complaint’s category ("Environment") maps to the "Environment" department in Category.assigned\_department.
     * The system identifies the DepartmentMunicipalAdmin for the Environment department in Mumbai Ward 5 (based on Complaint.location): Neha Patel (User ID: "USR-2025-000009", department: "Environment", municipality: "Mumbai Ward 5").
     * The complaint is added to DepartmentMunicipalAdmin.managed\_complaints: \["CMP-2025-123457"].
  2. Department-Specific Handling:
     * Since "Environment" is a regulatory category (not operational like Infrastructure), it cannot be resolved by an Agent. Neha reviews the complaint and decides to escalate it to the corresponding DepartmentStateAdmin.
     * Complaint.status is updated to "Under Processing".
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000009",
           "action": "Complaint Routed",
           "user_id": "USR-2025-000009",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:25:00+05:30",
           "details": "Routed to DepartmentMunicipalAdmin USR-2025-000009 (Environment)"
         }
         ```
* Role of Entities:
  * Complaint: Updated with the initial escalation level and status.
  * Category: Used to determine the department for routing.
  * DepartmentMunicipalAdmin: Receives the complaint and decides the next step.
  * Audit Log: Logs the routing action.

***

### Step 3: Escalation to Department State Admin

* Entities Involved: Complaint, DepartmentMunicipalAdmin, DepartmentStateAdmin, Audit Log
* Process:
  1. Escalation:
     * Neha escalates the complaint to the DepartmentStateAdmin for the Environment department in Maharashtra: Arjun Mehta (User ID: "USR-2025-000010", department: "Environment", state: "Maharashtra").
     * The Complaint is updated:
       * escalation\_level: "DepartmentState"
     * The complaint is added to DepartmentStateAdmin.escalated\_complaints: \["CMP-2025-123457"].
     * DepartmentMunicipalAdmin.performance.escalation\_count is incremented to 4.
  2. Department State Admin Action:
     * Arjun reviews the complaint and coordinates with environmental regulators to address the illegal dumping. He updates the resolution\_notes: "Coordinating with environmental regulator for cleanup and fines."
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000010",
           "action": "Complaint Escalated",
           "user_id": "USR-2025-000009",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:30:00+05:30",
           "details": "Escalated to DepartmentStateAdmin USR-2025-000010 (Environment) by DepartmentMunicipalAdmin USR-2025-000009"
         }
         ```
* Role of Entities:
  * Complaint: Updated with new escalation level and resolution notes.
  * DepartmentMunicipalAdmin: Initiates the escalation.
  * DepartmentStateAdmin: Takes over the complaint and begins resolution.
  * Audit Log: Logs the escalation action.

***

### Step 4: Community Engagement&#x20;

* Entities Involved: Complaint, Upvote, User, Audit Log&#x20;
* Process:
  1. Complaint Visible on Community Page:
     * Since Complaint.is\_public is true, the complaint appears on the community page.
  2. Another User Upvotes:
     * Another user, Jane Smith (User ID: "USR-2025-000007"), upvotes the complaint.
     *   A new Upvote record is created:json

         ```json
         {
           "upvote_id": "UPV-2025-000001",
           "user_id": "USR-2025-000007",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:35:00+05:30"
         }
         ```
     * Complaint.upvote\_count is updated to 1.
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000011",
           "action": "Complaint Upvoted",
           "user_id": "USR-2025-000007",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:35:00+05:30",
           "details": "Upvoted by user USR-2025-000007"
         }
         ```
* Role of Entities:
  * Complaint: Tracks community engagement.
  * Upvote: Records the upvote action.
  * User: Participates in the community.
  * Audit Log: Logs the upvote action.

***

### Step 5: Resolution by Department State Admin

* Entities Involved: Complaint, DepartmentStateAdmin, User, Audit Log
* Process:
  1. Resolution:
     * Arjun resolves the complaint by May 15, 2025, after coordinating with the regulator.
     * The Complaint is updated:
       * status: "Completed"
       * resolution\_notes: "Cleanup completed, fine issued to violator."
       * date\_of\_resolution: "2025-05-15T10:00:00+05:30"
  2. User Notification:
     * Adi is notified via their preferred channel (e.g., SMS).
     * The complaint is moved from User.current\_complaints to complaint\_history.
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000012",
           "action": "Complaint Resolved",
           "user_id": "USR-2025-000010",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-15T10:00:00+05:30",
           "details": "Resolved by DepartmentStateAdmin USR-2025-000010 (Environment)"
         }
         ```
* Role of Entities:
  * Complaint: Updated with resolution details.
  * DepartmentStateAdmin: Resolves the complaint.
  * User: Notified of the resolution.
  * Audit Log: Logs the resolution action.

***

### Step 6: User Provides Feedback

* Entities Involved: Complaint, User, Audit Log
* Process:
  1. Feedback Submission:
     * Adi submits feedback: { "rating": 4, "comments": "Resolved quickly, but communication could be better." }
     * The Complaint is updated:
       * feedback: { "rating": 4, "comments": "Resolved quickly, but communication could be better." }
  2. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000013",
           "action": "Feedback Provided",
           "user_id": "USR-2025-000008",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-15T10:05:00+05:30",
           "details": "Feedback provided by user USR-2025-000008"
         }
         ```
* Role of Entities:
  * Complaint: Stores the feedback.
  * User: Provides feedback.
  * Audit Log: Logs the feedback action.

***

### Step 7: Escalation to Super State Admin (If Unresolved)

* Entities Involved: Complaint, DepartmentStateAdmin, SuperStateAdmin, Audit Log
* Process (if the complaint isn’t resolved within the SLA of 5 days):
  1. Escalation:
     * On May 18, 2025, the SLA expires. Arjun escalates the complaint to the SuperStateAdmin for Maharashtra: Vikram Singh (User ID: "USR-2025-000005").
     * The Complaint is updated:
       * escalation\_level: "SuperState"
     * The complaint is added to SuperStateAdmin.escalated\_complaints: \["CMP-2025-123457"].
  2. Super State Admin Action:
     * Vikram coordinates cross-departmental efforts (e.g., involving the Revenue department for fines) to resolve the issue.
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000014",
           "action": "Complaint Escalated",
           "user_id": "USR-2025-000010",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-18T09:00:00+05:30",
           "details": "Escalated to SuperStateAdmin USR-2025-000005 by DepartmentStateAdmin USR-2025-000010"
         }
         ```
* Role of Entities:
  * Complaint: Updated with new escalation level.
  * DepartmentStateAdmin: Initiates the escalation.
  * SuperStateAdmin: Takes over the complaint.
  * Audit Log: Logs the escalation action.

***

### Step 8: Escalation to Super Admin (If Unresolved)

* Entities Involved: Complaint, SuperStateAdmin, SuperAdmin, Audit Log
* Process:
  1. Escalation:
     * If Vikram cannot resolve the complaint, he escalates it to the SuperAdmin: Suresh Kumar (User ID: "USR-2025-000006").
     * The Complaint is updated:
       * escalation\_level: "Super"
     * The complaint is added to SuperAdmin.managed\_complaints: \["CMP-2025-123457"].
  2. Super Admin Action:
     * Suresh takes final action, possibly involving national-level environmental policies.
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000015",
           "action": "Complaint Escalated",
           "user_id": "USR-2025-000005",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-20T09:00:00+05:30",
           "details": "Escalated to SuperAdmin USR-2025-000006 by SuperStateAdmin USR-2025-000005"
         }
         ```
* Role of Entities:
  * Complaint: Updated with final escalation level.
  * SuperStateAdmin: Initiates the escalation.
  * SuperAdmin: Takes over the complaint.
  * Audit Log: Logs the escalation action.

***

### **Agent Involvement for Operational Categories**

* Entities Involved: Complaint, DepartmentMunicipalAdmin, Agent, Audit Log
* Process (if the complaint category were "Infrastructure"):
  1. Routing to Department Municipal Admin:
     * If Adi had submitted an Infrastructure complaint (e.g., a pothole), it would be routed to the DepartmentMunicipalAdmin for Infrastructure in Mumbai Ward 5: Anil Kumar (User ID: "USR-2025-000012", department: "Infrastructure").
  2. Agent Assignment:
     * Anil assigns the complaint to an Agent: Priya Sharma (User ID: "USR-2025-000002").
     * The Complaint is updated:
       * assigned\_agent: "USR-2025-000002"
       * status: "Under Processing"
     * The complaint is added to Agent.assigned\_complaints: \["CMP-2025-123457"].
     * Agent.current\_workload is incremented.
  3. Agent Resolution:
     * Priya resolves the complaint, updating Complaint.status to "Completed".
     * The complaint is removed from Agent.assigned\_complaints, and current\_workload is decremented.
  4. Audit Log Entry:
     *   An AuditLog entry for assignment:json

         ```json
         {
           "log_id": "LOG-2025-000016",
           "action": "Complaint Assigned",
           "user_id": "USR-2025-000012",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:30:00+05:30",
           "details": "Assigned to Agent USR-2025-000002 by DepartmentMunicipalAdmin USR-2025-000012"
         }
         ```
* Role of Entities:
  * Complaint: Updated with agent assignment and status.
  * DepartmentMunicipalAdmin: Assigns the complaint to an Agent.
  * Agent: Resolves the complaint.
  * Audit Log: Logs the assignment action.

***

### Step 9: Cross-Departmental Coordination by Super Municipal Admin (Optional)

* Entities Involved: Complaint, DepartmentMunicipalAdmin, SuperMunicipalAdmin, Audit Log
* Process:
  1. Cross-Department Issue Identified:
     * If the complaint involves multiple departments (e.g., Environment and Revenue for fines), Neha escalates it to the SuperMunicipalAdmin for Mumbai Ward 5: Rahul Verma (User ID: "USR-2025-000011").
     * The complaint is added to SuperMunicipalAdmin.cross\_department\_issues: \["CMP-2025-123457"].
  2. Super Municipal Admin Action:
     * Rahul coordinates between the Environment and Revenue Department Municipal Admins to resolve the issue.
  3. Audit Log Entry:
     *   An AuditLog entry is created:json

         ```json
         {
           "log_id": "LOG-2025-000017",
           "action": "Cross-Department Issue Assigned",
           "user_id": "USR-2025-000009",
           "complaint_id": "CMP-2025-123457",
           "timestamp": "2025-05-13T17:40:00+05:30",
           "details": "Assigned to SuperMunicipalAdmin USR-2025-000011 for cross-department coordination"
         }
         ```
*   Role of Entities:

    * Complaint: Tracks the cross-departmental issue.
    * DepartmentMunicipalAdmin: Identifies the need for coordination.
    * SuperMunicipalAdmin: Manages cross-departmental resolution.
    * Audit Log: Logs the action.



