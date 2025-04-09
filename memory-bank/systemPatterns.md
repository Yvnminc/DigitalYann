# System Patterns

## System Architecture
DigitalYann follows a modern web application architecture with clear separation between frontend and backend components:

1. **Frontend Layer**: Built with Next.js, providing a responsive and interactive user interface.
   
2. **Backend Layer**: Python-based services that handle AI integration, data processing, and business logic.
   
3. **Database Layer**: Supabase (PostgreSQL) for structured data storage, particularly for the RAG system.
   
4. **External Services Layer**: Integration with third-party services including Google OAuth, OpenRouter, OpenAI, Stripe, and MCP.

The architecture employs a RESTful API approach for communication between frontend and backend services, ensuring clean separation of concerns.

## Key Technical Decisions

### Frontend Framework: Next.js
- **Rationale**: Next.js provides server-side rendering capabilities, improved SEO, and optimized performance through features like automatic code splitting.
- **Implementation**: Using the latest version (15.2.4) with TypeScript for type safety and improved developer experience.

### Backend Language: Python
- **Rationale**: Python offers robust libraries for AI and machine learning integration, making it ideal for the core backend functionality.
- **Implementation**: RESTful API endpoints to handle authentication, AI conversation, RAG operations, and payment processing.

### Database: Supabase
- **Rationale**: Supabase provides a PostgreSQL-based solution with real-time capabilities and built-in authentication, making it suitable for storing and retrieving educational content.
- **Implementation**: Tables for users, interactions, content, payment transactions, and email notifications.

### Authentication: Google OAuth
- **Rationale**: Leverages existing Google accounts for secure authentication without requiring users to create and remember new credentials.
- **Implementation**: Google OAuth flow for user sign-in, with tokens validated by the backend.

### AI Integration: OpenRouter and OpenAI
- **Rationale**: OpenRouter provides access to various large language models for text-based dialogues, while OpenAI's models enable speech-to-text and voice dialogue functionality.
- **Implementation**: API integrations with proper error handling and rate limiting considerations.

### Payment Processing: Stripe
- **Rationale**: Stripe offers a secure, well-documented payment system with subscription management capabilities.
- **Implementation**: Integration for handling both free tier (with limitations) and paid tier ($50/month) subscriptions.

## Design Patterns

### Service-Oriented Architecture
- Backend services are organized by functionality (auth, AI, RAG, payments) with clear boundaries.
- Each service exposes well-defined endpoints for the frontend to consume.

### Repository Pattern (for Data Access)
- Data access logic is encapsulated in repository classes that handle interactions with Supabase.
- This pattern provides a clean abstraction over the database layer.

### Dependency Injection
- Services are designed with dependency injection principles to facilitate testing and modularity.
- External dependencies (like API clients) are injected rather than directly instantiated.

### Observer Pattern (for Real-time Updates)
- Used for real-time features like speech-to-text conversion and conversation updates.
- Allows the UI to react to changes without constant polling.

## Component Relationships

### Frontend Components
- **Auth Module**: Handles Google OAuth flow and token management.
- **Dashboard Module**: Central hub for accessing all application features.
- **Conversation Module**: Interface for text and voice interactions with AI.
- **RAG Content Module**: Displays educational content retrieved from Supabase.
- **Payment Module**: Manages subscription status and upgrades.

### Backend Services
- **Auth Service**: Validates tokens, manages user sessions.
- **AI Service**: Interfaces with OpenRouter and OpenAI for conversation and speech processing.
- **RAG Service**: Stores and retrieves educational content and conversation history.
- **Payment Service**: Interfaces with Stripe for subscription management.
- **Email Service**: Handles notification delivery via MCP.

### Data Flow
1. User interactions from the frontend are sent to the appropriate backend service.
2. Backend services process requests, interact with external APIs as needed, and store/retrieve data from Supabase.
3. Responses are formatted and returned to the frontend for display.
4. All text interactions are stored in the RAG system to build context for future AI responses.

### Security Concerns
- Authentication tokens are validated for every request.
- API keys for external services are stored securely and never exposed to the frontend.
- User data is encrypted both in transit and at rest.
- Rate limiting is implemented to prevent abuse of AI services. 