# HLD

The Complaint Management System is a web platform for citizens to submit, track, and resolve complaints, with a focus on:\
operational (e.g., Infrastructure) and \
regulatory (e.g., Environment, Revenue, Social) categories

### Key Features&#x20;

* Offline Complaint Submission: If a complaint is written and the internet is lost, it is automatically uploaded to the database when the internet reconnects.
* Local News and Updates on Community Page: Users can view local news and updates alongside public complaints on the community page.
* Complaint Tracking in 3 Stages: Users can track complaints in three stages: Registered, Under Processing, and Completed.
* Multilingual Support: The platform supports multiple languages for accessibility.
* Chatbot for Guidance: A chatbot guides users through the platform and conducts a post-complaint resolution survey.
* Community Engagement: Users can upvote public complaints.
* Audit Logging: Ensures transparency by logging all actions.

### Entities

* User (Citizen): Submits and tracks complaints.
* Category: Defines complaint categories and sub-categories.
* Complaint: Core entity representing a complaint.
* Sub\_Category\_Mappings: Stores AI-standardized sub-categories.
* Agent: Resolves operational complaints.
* DepartmentMunicipalAdmin: Handles department-specific complaints at the municipal level.
* SuperMunicipalAdmin: Manages cross-departmental issues at the municipal level.
* DepartmentStateAdmin: Handles escalated department-specific complaints at the state level.
* SuperStateAdmin: Manages cross-departmental issues at the state level.
* SuperAdmin: Oversees the entire system.
* Upvote: Tracks community engagement.
* AuditLog: Logs all actions.



### System Arch



1. Client Layer:

* Framework: Nextjs
* Multilingual Support: React-i18next for dynamic language switching based on User.preferred\_language (e.g., English, Hindi, Odia).
* Offline Support: Service Workers (Workbox) to cache complaint form data locally. When offline, complaints are stored in IndexedDB and synced when the internet reconnects using background sync.
* Community Page: Displays public complaints, upvotes (updated via WebSocket), and local news/updates fetched from DepartmentMunicipalAdmin.news\_updates.
* Complaint Tracking UI: Progress bar showing three stages (Registered, Under Processing, Completed) with real-time updates via WebSocket for status changes.
* Chatbot Integration: Embedded Dialogflow widget for user guidance (e.g., "How do I track my complaint?") and post-resolution surveys (e.g., "How satisfied are you?").



2.  Service Layer:

    * Complaint Service: Manages complaint creation, updates, and status tracking.
    * User Service: Handles user profiles and authentication.
    * Category Service: Manages categories and sub-categories.
    * Escalation Service: Manages the escalation hierarchy.
    * AI Service: Handles sub-category standardization and duplicate and abusive language detection&#x20;
    * Notification Service: Sends SMS/email notifications.
    * Audit Service: Logs all actions.
    * Chatbot Service: Guides users and conducts post-resolution surveys (using Dialogflow).
    * Community Service: Manages public complaints, upvotes, and local news/updates.


3. Database Layer:

* PostgreSQL Cluster (Cloud SQL):
  * Primary Database:
    * Tables: already mentioned&#x20;
* Redis Cluster:
  * Community Cache: Caches public complaints and news/updates for the community page.
  * WebSocket State: Stores WebSocket session data for broadcasting upvote updates.
* Google Cloud Storage:
  * Stores multimedia attachments (e.g., images, videos) uploaded with complaints.
  * Bucket structure: gs://complaint-attachments/\<complaint\_id>/file.jpg.



### Categories

categories are deived into 13 sectors and sub catogorites are devied my ai / suggerst by the system

1. Infrastructure
   * Covers physical infrastructure issues like roads, bridges, and public utilities.
   * Assigned\_Department: Public Works Department (PWD).
2. Education Department
   * Handles issues related to schools, colleges, and educational services.
   * Assigned\_Department: Education Department.
3. Revenue Department
   * Manages taxation, permits, licenses, and land-related grievances.
   * Assigned\_Department: Revenue Department.
4. Health Department
   * Addresses healthcare-related complaints, such as hospital services or public health violations.
   * Assigned\_Department: Health Department.
5. Water Supply and Sanitation
   * Covers water supply issues, drainage, and sanitation problems.
   * Assigned\_Department: Water Supply and Sanitation Department.
6. Electricity and Power
   * Manages complaints about power outages, billing issues, or electrical infrastructure.
   * Assigned\_Department: Electricity Board/Power Department.
7. Transportation
   * Handles public transportation issues, traffic management, and road safety.
   * Assigned\_Department: Transport Department.
8. Municipal Services
   * Covers general municipal issues like waste management, street cleaning, and local governance.
   * Assigned\_Department: Municipal Corporation.
9. Police Services
   * Addresses law enforcement issues, such as crime reports or public safety concerns.
   * Assigned\_Department: Police Department.
10. Environment
    * Manages complaints about pollution, illegal dumping, or environmental violations.
    * Assigned\_Department: Environment Department.
11. Housing and Urban Development
    * Handles housing schemes, urban planning, and construction-related grievances.
    * Assigned\_Department: Housing and Urban Development Department.
12. Social Welfare
    * Covers social services like pensions, welfare schemes, or support for marginalized groups.
    * Assigned\_Department: Social Welfare Department.
13. Public Grievances
    * A catch-all category for complaints that don’t fit other departments, such as administrative issues or corruption.
    * Assigned\_Department: Public Grievance Cell.
