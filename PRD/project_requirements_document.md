# Project Requirements Document (PRD)

## 1. Project Overview

This project aims to create a SaaS application tailored for educational environments where students can interact with an AI-powered platform to enhance their learning. The application combines conversational AI, real-time speech-to-text transcription, and voice dialogue capabilities to support both students taking notes and teachers recording classroom events for review. It also features a retrieval-augmented generation (RAG) system that stores and recalls educational texts in Superbase, ensuring that every interaction builds a long-term memory of course content.

The purpose behind building this app is to provide an advanced, interactive, and user-friendly educational tool that elevates the learning experience. The key objectives are to ensure seamless integration of AI-driven communication tools (through OpenRouter and OpenAI APIs), secure user authentication via Google, and a scalable payment system using Stripe with clearly defined free and paid tiers. Success will be measured by the platform’s efficiency, usability for students, and the effectiveness of the AI in enhancing classroom learning and recording processes.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   Google account authorization for secure login.
*   Conversational AI integration using the OpenRouter API for interactive dialogue.
*   Real-time speech-to-text conversion and voice dialogue capabilities using OpenAI’s models.
*   A retrieval-augmented generation (RAG) system that stores all textual data in Superbase for long-term memory.
*   Frontend user interface developed with Node.js, focusing on a simple, intuitive design.
*   Backend processing and integrating various functionalities built in Python.
*   Email sending functionality managed via MCP (handled completely in the backend).
*   Payment and subscription system integrated with Stripe, including separate functionality for free and paid tiers.
*   A unified dashboard for accessing course content, initiating AI conversations, and note-taking features.

**Out-of-Scope:**

*   Advanced management or customization of teacher profiles; the focus is primarily on student usage.
*   Additional data types beyond text (e.g., multimedia or large file uploads) in Superbase.
*   Custom branding or detailed UI design guidelines beyond a simple, user-friendly layout.
*   Non-educational functionalities or integrations not directly related to the core educational tools.
*   Expanding beyond the defined feature set in the first version; subsequent phases may address additional functionalities.

## 3. User Flow

A typical user journey starts at a clean, simple landing page where users are prompted to log in or register using their Google account. Once authenticated, students are introduced to the service tiers during the onboarding process, giving them a clear understanding of the daily conversation limits for free users compared to the unlimited access provided in the paid subscription. After completing onboarding, students are directed to a central dashboard that serves as the home base for the entire application.

Within the dashboard, students can easily navigate between sections such as course content, interactive AI conversations, and a dedicated space for voice-based note-taking. Here, they engage with the conversational AI to ask questions or record classroom events. Throughout the session, the application transparently stores all textual interactions into the long-term memory via the RAG system while managing all backend operations like email notifications and payment processing seamlessly. The user journey is designed to be intuitive, ensuring that even those with minimal technical skills can effortlessly engage with and benefit from the educational tools provided.

## 4. Core Features

*   **Google Authentication:**

    *   Users log in or register using their Google account for secure access.

*   **Conversational AI:**

    *   Integration with the OpenRouter API enables interactive text-based dialogue.
    *   Supports intelligent responses for student inquiries and note-taking.

*   **Voice Interaction & Speech-to-Text:**

    *   Real-time speech-to-text conversion using OpenAI's model.
    *   Real-time voice dialogue feature allowing natural, spoken interactions.

*   **Retrieval-Augmented Generation (RAG):**

    *   All interactions and educational texts are stored in Superbase.
    *   The system leverages stored data as a long-term memory to provide contextually enriched responses.

*   **Dashboard & Navigational UI:**

    *   A simple yet engaging interface built with Node.js.
    *   Provides easy access to course content, AI interaction modules, and note-taking areas.

*   **Email Sending via MCP:**

    *   Automated background process to send notifications or confirmations without user intervention.

*   **Payment Integration:**

    *   Stripe integration handling subscriptions with two user tiers:

        *   Free Users: 10 daily conversations and limited course content.
        *   Paid Users: $50 monthly fee for unlimited conversations and full access to course content.

*   **Backend Processing:**

    *   All core processing and integration tasks built on Python to manage heavy computational tasks, including AI models and data storage.

## 5. Tech Stack & Tools

*   **Frontend:**

    *   Node.js for building a responsive and user-friendly interface.

*   **Backend:**

    *   Python to handle integrations, process AI requests, and manage server operations.

*   **Database:**

    *   Superbase for secure storage of textual data, user interactions, and course content.

*   **Authentication:**

    *   Google OAuth for login and authorization (login functionality only).

*   **AI Models & APIs:**

    *   OpenRouter API for conversational AI capabilities.
    *   OpenAI’s models for real-time speech-to-text conversion and voice dialogue.

*   **Payment:**

    *   Stripe for managing subscription payments and fee-based access.

*   **IDE & Plugin Integration:**

    *   Cursor, an advanced IDE with AI-powered suggestions.
    *   GPT 4o used for coding tasks and integration support.

## 6. Non-Functional Requirements

*   **Performance:**

    *   The application must provide real-time responses for voice-to-text conversion and interactive AI dialogue.
    *   Ensure prompt loading times on the dashboard and during key user interactions.

*   **Security:**

    *   Secure user authentication using Google OAuth.
    *   Data encryption in transit and at rest, especially for sensitive user and payment data.
    *   Compliance with relevant privacy guidelines, particularly regarding educational data.

*   **Usability:**

    *   The UI should be simple and intuitive for students, minimizing the learning curve.
    *   Ensure that navigation and core functionalities are accessible even for non-tech-savvy users.

*   **Scalability:**

    *   The system should handle a growing number of concurrent users while managing resource demands effectively.
    *   The architecture must accommodate potential increases in data volume stored in Superbase.

## 7. Constraints & Assumptions

*   The application relies on the continuous availability of external APIs (OpenRouter and OpenAI) without significant downtime.
*   Superbase is assumed to be reliable for long-term text data storage and retrieval.
*   It is assumed that the educational content primarily consists of text data; multimedia support is not included in this version.
*   Google login is used solely for user authorization, with no additional functionality.
*   The project is focused on an educational audience, primarily students, with a straightforward tiered subscription model.
*   The IPC (MCP for email functionality) and payment processing via Stripe must be integrated seamlessly as background processes.

## 8. Known Issues & Potential Pitfalls

*   **API Rate Limits:**

    *   External APIs (OpenRouter and OpenAI) might have rate limits; careful monitoring and handling of these limits is crucial.

*   **Real-Time Processing:**

    *   Real-time voice-to-text and interactive dialogue features may face performance challenges during peak usage. Robust error handling and possible caching strategies should be considered.

*   **Payment Complexities:**

    *   IntegratingStripe’s payment gateway requires careful testing to manage user subscription transitions smoothly. Handling possible payment failures should be planned.

*   **Data Storage Bottlenecks:**

    *   Storing and retrieving growing volumes of text data in Superbase may lead to performance issues if not optimized. Plan for scalable data structure design.

*   **Authentication Management:**

    *   Google OAuth token management and potential session expiration issues must be handled without impacting the user experience.

*   **Integration Challenges:**

    *   Syncing the interactions between Node.js frontend and Python backend requires robust API design to prevent miscommunication or lag between services.

This document serves as the comprehensive reference for building the described SaaS application, ensuring that all team members and subsequent AI models have a clear and precise understanding of what needs to be developed.
