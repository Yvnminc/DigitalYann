# Backend Structure Document

This document provides a comprehensive overview of the backend architecture, hosting solutions, and infrastructure components for our SaaS educational application. The points are described in everyday language to ensure clarity for everyone, regardless of technical background.

## Backend Architecture

- **Design Pattern:** Our backend uses a modular service-oriented design, built with Python to handle AI model integrations, data processing, and common server operations.
- **Separation of Concerns:** Specific modules are responsible for handling AI interactions (via the OpenRouter and OpenAI APIs), data storage interactions, real-time processing (like speech-to-text), and other services like email notifications (via MCP).
- **Scalability & Maintainability:** The modular design means that each component or service is self-contained. This makes it easier to update or replace individual parts, ensuring our system scales efficiently as user numbers or data volumes grow.
- **Performance Optimization:** Real-time processing capabilities for functions like voice dialogue and AI interactions are prioritized. Each service runs independently, helping distribute workload evenly across the system.

## Database Management

- **Database Technology:** We use Superbase, which is built on PostgreSQL, for all text data storage needs.
- **Data Types:** The database primarily handles text-based data including user interactions, course materials, and other educational content.
- **Data Management Practices:**
  - Data is structured to optimize quick retrieval for real-time AI and speech-to-text processes.
  - Regular backups and redundancy protocols ensure data safety and availability.
  - The schema is designed for efficient querying, vital for immediate responses required by our real-time applications.

## Database Schema

Since we are using an SQL-based solution (Superbase built on PostgreSQL), the database schema can be understood as follows:

- **Users Table:** Contains fields for user ID, email, authentication details (e.g., Google OAuth tokens), subscription tier, and profile settings.
- **Interactions Table:** Captures all interactions including AI conversations, classroom note entries, and general Q&A sessions.
- **Content Table:** Stores educational content and course materials, which serve as the data source for the RAG system.
- **Payment Transactions Table:** Logs for payment details processed via Stripe, including subscription status and transaction history.
- **Email Notifications Table:** Holds records of email notifications sent out via MCP.

*Example SQL Schema Outline (Human-readable description):*

- Users
  - id: Primary key, unique identifier for each user
  - email: Email address (and Google OAuth token reference)
  - subscription_tier: Free or Paid (with corresponding limits)
  - created_at: Date and time the user was created

- Interactions
  - id: Primary key
  - user_id: Foreign key linking to Users
  - interaction_text: The content of the conversation or note
  - timestamp: When the interaction occurred

- Content
  - id: Primary key
  - title: Title of the content
  - body: Full text/course content
  - updated_at: Latest update timestamp

- Payment_Transactions
  - id: Primary key
  - user_id: Foreign key linking to Users
  - stripe_transaction_id: Stripe's unique transaction identifier
  - amount: Payment amount
  - status: Payment status (success, failed, pending)
  - created_at: Transaction date and time

- Email_Notifications
  - id: Primary key
  - user_id: Foreign key linking to Users
  - email_subject: Subject line of the email
  - sent_at: Timestamp when the email was sent

## API Design and Endpoints

- **API Style:** Our backend APIs follow the RESTful design principles.
- **Endpoints:**
  - **/api/auth:** Manages login and registration via Google OAuth.
  - **/api/ai:** For all AI interactions, including conversational queries and text generation through the OpenRouter API.
  - **/api/rag:** Retrieves relevant educational content and historical conversation data from Superbase for enhanced AI responses.
  - **/api/voice:** Processes real-time speech-to-text requests and facilitates voice dialogue using OpenAI models.
  - **/api/payments:** Handles the Stripe payment integrations, subscription management, and transaction logging.
  - **/api/email:** Manages backend email functionalities, sending notifications via MCP.
- **Purpose:** These endpoints allow seamless communication between the Node.js frontend and the Python backend, ensuring each function (authentication, AI response, payment processing) is isolated and maintains its data integrity.

## Hosting Solutions

- **Primary Hosting Environment:** Cloud hosting is used to ensure high reliability, scalability, and cost effectiveness.
- **Cloud Providers:** The backend is hosted on a cloud platform that supports flexible scaling, consistent uptime, and easy integration with our technology stack.
- **Benefits:**
  - **Reliability:** Managed services ensure fault tolerance and automatic backups.
  - **Scalability:** The infrastructure can dynamically support increased traffic and processing loads as the user base expands.
  - **Cost-effectiveness:** Pay-as-you-go models minimize unnecessary spending and align costs with actual usage.

## Infrastructure Components

- **Load Balancers:** Distribute incoming requests across multiple backend servers to prevent bottlenecks and ensure smooth, continuous service.
- **Caching Mechanisms:** Use of in-memory caches (like Redis) to temporarily hold frequently accessed data, reducing database load and speeding up response times.
- **Content Delivery Network (CDN):** Although primarily used for static content for the frontend, a CDN helps ensure that assets load quickly, improving performance.
- **Microservices Coordination:** Each service (authentication, AI processing, payments, etc.) works harmoniously through well-defined API endpoints, supported by robust load balancing and caching to enhance overall performance.

## Security Measures

- **Authentication & Authorization:**
  - Use Google OAuth for single sign-on and secure user validation.
  - Role-based access controls to restrict access to certain endpoints based on user tier (free or paid).
- **Data Encryption:** Data is encrypted at rest and during transit. Sensitive information like tokens and payment details is strictly secured.
- **API Security:** Rate limiting, input validation, and regular security audits safeguard against common threats.
- **Compliance:** Adheres to privacy best practices and relevant compliance standards to ensure user data is kept safe and private.

## Monitoring and Maintenance

- **Monitoring Tools:** Utilizes monitoring solutions to track server health, API response times, and real-time usage data. This includes logging services and health-check endpoints.
- **Alerts and Notifications:** Automatic alerts are generated for anomalies such as high error rates or performance bottlenecks, ensuring timely response by the engineering team.
- **Regular Maintenance:** Scheduled downtime for updates, security patches, and system optimization to keep the backend efficient and secure.
- **Dashboard:** An internal dashboard provides an at-a-glance view of system metrics to easily spot issues and trends.

## Conclusion and Overall Backend Summary

- **Recap:**
  - The backend is built on a modular, service-oriented architecture leveraging Python and PostgreSQL (via Superbase).
  - It integrates with key external services such as OpenRouter, OpenAI, Google OAuth, Stripe, and MCP, each isolated via clear RESTful APIs.
  - Infrastructure components like load balancers, caching systems, and CDNs work together to provide a reliable, fast, and scalable backend.
- **Alignment with Project Goals:** This setup supports interactive educational use, efficient real-time processing for voice and AI interactions, and secure handling of user data and payments.
- **Unique Aspects:** The integration of advanced AI functionalities with structured data storage and cloud-hosted microservices distinguishes the project, laying a strong foundation for scalability and responsiveness.

This document should provide a clear and comprehensive understanding of the backend structure, ensuring that anyone involved in the project can understand the architecture, from the modular design and APIs to the secure hosting environment and infrastructure components.