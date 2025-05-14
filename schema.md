# Schema

### User Schema (Citizen):

* User\_ID: Unique identifier (string, e.g., "USR-2025-000001").
* Email: From OAuth (string, e.g., "john.doe@gmail.com").
* Phone\_Number: For notifications (string, e.g., "+91-9876543210").
* Name: First and Last (string, e.g., "John Doe").
* DOB: Date of birth (date, e.g., "1990-01-01").
* Location:
  * PIN: Postal code (string, e.g., "400001").
  * District: District name (string, e.g., "Mumbai District").
  * City: City name (string, e.g., "Mumbai").
  * Locality: Specific area (string, e.g., "XYZ Nagar").
  * Street: Street address (string, e.g., "Park Road").
  * Municipal: Associated municipality (string, e.g., "Mumbai Ward 5").
* Aadhaar\_ID: Optional, masked (string, e.g., "XXXX-XXXX-1234").
* Preferred\_Language: For multilingual support (string, e.g., "English").
* Disability: Accessibility needs (string, e.g., "Visual Impairment", "None").
* Consent\_Data\_Collection: Mandatory for users (boolean, e.g., true).
* Current\_Complaints: Active complaints (array of strings, e.g., \["CMP-2025-123456"]).
* Complaint\_History: Past complaints (array of strings, e.g., \["CMP-2025-123455"]).
* Date\_of\_Creation: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").

### Category Schema:

* Category\_ID: Unique identifier (string, e.g., "CAT-2025-000001").
* Name: Category name (string, e.g., "Environment").
* Sub\_Categories: Optional seed list for AI suggestions (array of strings, e.g., \["Waste Dumping", "Pollution"]).
* Learned\_Sub\_Categories: Dynamically learned sub-categories from user inputs (array of strings, e.g., \["Illegal dumping of waste"]).
* Assigned\_Department: Department responsible (string, e.g., "Environment").
* Created\_By: Admin who created the category (string, e.g., "USR-2025-000006" (Super Admin)).
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").



### Complaint Schema:

* Complaint\_ID: Unique identifier (string, e.g., "CMP-2025-123457").
* Submission\_Date: Timestamp (string, e.g., "2025-05-13T17:14:00+05:30").
* Complainant: User ID (string, e.g., "USR-2025-000008").
* Category: Selected from dropdown (string, e.g., "Environment").
* Sub\_Category: User-provided via text input (string, e.g., "Illegal dumping of waste").
* Standardized\_Sub\_Category: AI-standardized sub-category (string, e.g., "Waste Dumping").
* Description: User input (string, e.g., "Illegal waste dumping in XYZ Nagar park.").
* Location:
  * PIN: Postal code (string, e.g., "400001").
  * District: District name (string, e.g., "Mumbai District").
  * City: City name (string, e.g., "Mumbai").
  * Locality: Specific area (string, e.g., "XYZ Nagar").
  * Street: Street address (string, e.g., "Park Road").
  * Geolocation: Coordinates (object, e.g., { "lat": 12.35, "long": 56.79 }).
* Urgency: Priority level (string, e.g., "High").
* Attachment: File URL (string, e.g., "[https://cloudstorage.example.com/waste.jpg](https://cloudstorage.example.com/waste.jpg)").
* Assigned\_Department: Department responsible (string, e.g., "Environment").
* Status: Current stage (string, e.g., "Registered", "Under Processing", "Completed").
* SLA: Resolution deadline (string, e.g., "5 days").
* Assigned\_Agent: Agent User ID (string, e.g., "USR-2025-000002") (only for operational categories like Infrastructure).
* Co\_Assigned\_Agents: Co-agent User IDs (array of strings, e.g., \["USR-2025-000003"]).
* Upvote\_Count: Community page upvotes (integer, e.g., 0).
* Is\_Public: Community page visibility (boolean, e.g., true).
* Feedback: Post-resolution feedback (object, e.g., { "rating": 4, "comments": "Resolved quickly" }).
* Resolution\_Notes: Notes from resolver (string, e.g., "Issue escalated to regulator").
* Escalation\_Level: Current escalation level (string, e.g., "DepartmentMunicipal", "DepartmentState", "SuperState", "Super").
* Date\_of\_Resolution: Timestamp of resolution (string, e.g., "2025-05-15T10:00:00+05:30").



### Sub\_Category\_Mappings Schema:

* Mapping\_ID: Unique identifier (string, e.g., "SCM-2025-000002").
* Category: The parent category (string, e.g., "Environment").
* Original\_Sub\_Category: User-provided sub-category (string, e.g., "Illegal dumping of waste").
* Standardized\_Sub\_Category: AI-standardized sub-category (string, e.g., "Waste Dumping").
* Created\_By: System or admin who created the mapping (string, e.g., "System").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T17:14:05+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T17:14:05+05:30").



### Agent Schema:

* User\_ID: Unique identifier (string, e.g., "USR-2025-000002").
* User\_Type: Role (string, e.g., "Agent").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").
* Full\_Name: Mandatory (string, e.g., "Priya Sharma").
* Employee\_ID: Government-issued ID (string, e.g., "EMP-98765").
* Contact:
  * Official\_Email: Mandatory (string, e.g., "priya.sharma@gov.in").
  * Phone: Optional (string, e.g., "+91-9123456789").
* Department: Assigned department (string, e.g., "Public Works").
* Municipality: Geographic area (string, e.g., "Mumbai Ward 5").
* Autonomy\_Level: Decision-making authority (string, e.g., "Can Resolve Independently").
* Assigned\_Complaints: Active complaints (array of strings, e.g., \["CMP-2025-123456"]).
* Co\_Assigned\_Complaints: Co-assigned complaints (array of strings, e.g., \["CMP-2025-123458"]).
* Access\_Level: Permissions (string, e.g., "Edit Assigned Complaints").
* Login:
  * Email: Unique (string, e.g., "priya.sharma@gov.in").
  * Password\_Hash: Securely stored (string, e.g., "$2b$10$...").
* Performance:
  * Resolution\_Rate: Percentage (float, e.g., 95.0).
  * Avg\_Resolution\_Time: Time in days/hours (string, e.g., "2.5 days").
  * Collaboration\_Metric: Cross-department resolutions (integer, e.g., 10).
* Workload:
  * Workload\_Limit: Max complaints (integer, e.g., 10).
  * Current\_Workload: Active complaints count (integer, e.g., 8).
  * Availability\_Status: Work status (string, e.g., "At Work").
* Training\_Completed: Completed training programs (array of strings, e.g., \["Complaint Handling 101"]).
* Last\_Login: Timestamp (string, e.g., "2025-05-13T10:00:00+05:30").
* API\_Key: For integrations (string, e.g., "abc123").



### &#x20;Department Municipal Admin Schema

* User\_ID: Unique identifier (string, e.g., "USR-2025-000009").
* User\_Type: Role (string, e.g., "Department Municipal Admin").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").
* Full\_Name: Mandatory (string, e.g., "Neha Patel").
* Admin\_ID: Unique identifier (string, e.g., "DEPTMUNA-12345").
* Contact:
  * Official\_Email: Mandatory (string, e.g., "neha.patel@gov.in").
  * Phone: Optional (string, e.g., "+91-9876543210").
* Department: Specific department overseen (string, e.g., "Environment").
* Municipality: Geographic scope (string, e.g., "Mumbai Ward 5").
* Managed\_Agents: Agent User IDs (array of strings, e.g., \["USR-2025-000002"]) (only for operational departments like Infrastructure).
* Managed\_Complaints: Complaint IDs in their department and area (array of strings, e.g., \["CMP-2025-123457"]).
* Community\_Moderation: Flagged complaints for review (array of strings, e.g., \["CMP-2025-123458"]).
* News\_Updates: Posted updates (array of objects, e.g., \[{ "title": "Waste Cleanup Planned", "content": "Cleanup scheduled for park", "date": "2025-05-13" }]).
* Access\_Level: Permissions (string, e.g., "Manage Department Complaints").
* Login:
  * Email: Unique (string, e.g., "neha.patel@gov.in").
  * Password\_Hash: Securely stored (string, e.g., "$2b$10$...").
* Performance:
  * Resolution\_Rate: Aggregate resolution rate (float, e.g., 90.0).
  * SLA\_Compliance\_Rate: SLA compliance (float, e.g., 85.0).
  * Escalation\_Count: Escalations to Department State Admin (integer, e.g., 3).
* Last\_Login: Timestamp (string, e.g., "2025-05-13T09:00:00+05:30").
* API\_Key: For integrations (string, e.g., "xyz789").



### Super Municipal Admin Schema:

* User\_ID: Unique identifier (string, e.g., "USR-2025-000011").
* User\_Type: Role (string, e.g., "Super Municipal Admin").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").
* Full\_Name: Mandatory (string, e.g., "Rahul Verma").
* Admin\_ID: Unique identifier (string, e.g., "SUPMUNA-54321").
* Contact:
  * Official\_Email: Mandatory (string, e.g., "rahul.verma@gov.in").
  * Phone: Optional (string, e.g., "+91-9988776655").
* Municipality: Geographic scope (string, e.g., "Mumbai Ward 5").
* Managed\_Department\_Admins: Department Municipal Admin User IDs (array of strings, e.g., \["USR-2025-000009"]).
* Cross\_Department\_Issues: Complaints requiring cross-department coordination (array of strings, e.g., \["CMP-2025-123459"]).
* Access\_Level: Permissions (string, e.g., "Manage Municipality").
* Login:
  * Username: Unique (string, e.g., "rahul.verma").
  * Password\_Hash: Securely stored (string, e.g., "$2b$10$...").
  * Two\_Factor\_Auth: Mandatory (boolean, e.g., true).
* Performance:
  * Municipality\_Resolution\_Rate: Aggregate resolution rate (float, e.g., 88.0).
  * Cross\_Department\_Success: Successful cross-department resolutions (integer, e.g., 2).
* Last\_Login: Timestamp (string, e.g., "2025-05-13T08:00:00+05:30").
* API\_Key: For integrations (string, e.g., "pqr456").



### Department State Admin Schema Schema:

* User\_ID: Unique identifier (string, e.g., "USR-2025-000010").
* User\_Type: Role (string, e.g., "Department State Admin").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").
* Full\_Name: Mandatory (string, e.g., "Arjun Mehta").
* Admin\_ID: Unique identifier (string, e.g., "DEPTSTATA-98765").
* Contact:
  * Official\_Email: Mandatory (string, e.g., "arjun.mehta@gov.in").
  * Phone: Optional (string, e.g., "+91-9765432100").
* Department: Specific department overseen (string, e.g., "Environment").
* State: Geographic scope (string, e.g., "Maharashtra").
* Managed\_Municipalities: Municipalities overseen (array of strings, e.g., \["Mumbai Ward 5", "Mumbai Ward 6"]).
* Managed\_Municipal\_Admins: Department Municipal Admin User IDs (array of strings, e.g., \["USR-2025-000009"]).
* Managed\_Categories: Categories overseen (array of strings, e.g., \["CAT-2025-000001"]).
* Escalated\_Complaints: Complaints escalated to them (array of strings, e.g., \["CMP-2025-123457"]).
* Regional\_Workflows: Custom workflows (array of objects, e.g., \[{ "category": "Waste Dumping", "sla": "5 days" }]).
* Access\_Level: Permissions (string, e.g., "Manage Department State Complaints").
* Login:
  * Username: Unique (string, e.g., "arjun.mehta").
  * Password\_Hash: Securely stored (string, e.g., "$2b$10$...").
  * Two\_Factor\_Auth: Mandatory (boolean, e.g., true).
* Performance:
  * State\_Resolution\_Rate: Aggregate resolution rate (float, e.g., 87.0).
  * Systemic\_Issues\_Identified: Systemic issues escalated (integer, e.g., 1).
* Last\_Login: Timestamp (string, e.g., "2025-05-13T07:00:00+05:30").
* API\_Key: For integrations (string, e.g., "lmn789").



### Super State Admin

* User\_ID: Unique identifier (string, e.g., "USR-2025-000005").
* User\_Type: Role (string, e.g., "Super State Admin").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").
* Full\_Name: Mandatory (string, e.g., "Vikram Singh").
* Admin\_ID: Unique identifier (string, e.g., "SUPSTATA-12345").
* Contact:
  * Official\_Email: Mandatory (string, e.g., "vikram.singh@gov.in").
  * Phone: Optional (string, e.g., "+91-9765432100").
* State: Geographic scope (string, e.g., "Maharashtra").
* Managed\_Department\_Admins: Department State Admin User IDs (array of strings, e.g., \["USR-2025-000010"]).
* Escalated\_Complaints: Complaints escalated to them (array of strings, e.g., \["CMP-2025-123457"]).
* Access\_Level: Permissions (string, e.g., "Manage State").
* Login:
  * Username: Unique (string, e.g., "vikram.singh").
  * Password\_Hash: Securely stored (string, e.g., "$2b$10$...").
  * Two\_Factor\_Auth: Mandatory (boolean, e.g., true).
* Performance:
  * State\_Resolution\_Rate: Aggregate resolution rate (float, e.g., 87.0).
  * Cross\_Department\_Success: Successful cross-department resolutions (integer, e.g., 2).
* Last\_Login: Timestamp (string, e.g., "2025-05-13T07:00:00+05:30").
* API\_Key: For integrations (string, e.g., "lmn789").



### Super Admin Schema

* User\_ID: Unique identifier (string, e.g., "USR-2025-000006").
* User\_Type: Role (string, e.g., "Super Admin").
* Creation\_Date: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Last\_Updated: Timestamp (string, e.g., "2025-05-13T14:22:00+05:30").
* Status: Account status (string, e.g., "Active").
* Full\_Name: Mandatory (string, e.g., "Suresh Kumar").
* Admin\_ID: Unique identifier (string, e.g., "SUPA-12345").
* Contact:
  * Official\_Email: Mandatory (string, e.g., "suresh.kumar@gov.in").
  * Phone: Optional (string, e.g., "+91-9654321098").
* Managed\_Categories: Categories overseen (array of strings, e.g., \["CAT-2025-000001"]).
* Managed\_Users: Users overseen (array of strings, e.g., \["USR-2025-000001"]).
* Managed\_Agents: Agents overseen (array of strings, e.g., \["USR-2025-000002"]).
* Managed\_Municipal\_Admins: Super Municipal Admin User IDs (array of strings, e.g., \["USR-2025-000011"]).
* Managed\_Department\_Municipal\_Admins: Department Municipal Admin User IDs (array of strings, e.g., \["USR-2025-000009"]).
* Managed\_State\_Admins: Super State Admin User IDs (array of strings, e.g., \["USR-2025-000005"]).
* Managed\_Department\_State\_Admins: Department State Admin User IDs (array of strings, e.g., \["USR-2025-000010"]).
* Managed\_Complaints: Complaints overseen (array of strings, e.g., \["CMP-2025-123457"]).
* Access\_Level: Permissions (string, e.g., "Full System Access").
* Login:
  * Username: Unique (string, e.g., "suresh.kumar").
  * Password\_Hash: Securely stored (string, e.g., "$2b$10$...").
  * Two\_Factor\_Auth: Mandatory (boolean, e.g., true).
* Last\_Login: Timestamp (string, e.g., "2025-05-13T06:00:00+05:30").
* API\_Key: For integrations (string, e.g., "stu123").



### Upvotes Schema:

* Upvote\_ID: Unique identifier (string, e.g., "UPV-2025-000001").
* User\_ID: User who upvoted (string, e.g., "USR-2025-000001").
* Complaint\_ID: Complaint being upvoted (string, e.g., "CMP-2025-123456").
* Timestamp: When upvoted (string, e.g., "2025-05-13T15:00:00+05:30").



### Audit Log Schema

* Log\_ID: Unique identifier (string, e.g., "LOG-2025-000001").
* Action: Action performed (string, e.g., "Complaint Assigned").
* User\_ID: User performing action (string, e.g., "USR-2025-000002").
* Complaint\_ID: Related complaint (string, e.g., "CMP-2025-123456").
* Timestamp: When action occurred (string, e.g., "2025-05-13T14:22:00+05:30").
* Details: Additional info (string, e.g., "Assigned to Agent USR-2025-000002").





