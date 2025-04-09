# Tech Context

## Technologies Used

### Frontend
- **Next.js (v15.2.4)**: React framework for building the user interface with server-side rendering capabilities
- **React (v19)**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for improved developer experience and type safety
- **Tailwind CSS**: Utility-first CSS framework for styling components
- **shadcn/ui**: Component library built on Radix UI primitives
- **Framer Motion**: Animation library for React
- **React Hook Form**: Form handling library with validation

### Backend
- **Python**: Core language for backend development
- **RESTful API**: Architecture style for API endpoints
- **OpenRouter API**: Interface for accessing large language models
- **OpenAI API**: Used for speech-to-text and voice dialogue capabilities

### Database
- **Supabase**: PostgreSQL-based backend as a service
- **RAG System**: Retrieval-augmented generation system built on Supabase

### Authentication
- **Google OAuth**: Authentication service for user login

### Payment Processing
- **Stripe**: Payment and subscription management service

### Email
- **MCP (Mail Control Protocol)**: Handles email sending functionality

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- npm or pnpm package manager
- Git version control

### Local Development Environment
1. Clone the repository
2. Install frontend dependencies:
   ```
   pnpm install
   ```
3. Set up environment variables:
   - Create `.env.local` with necessary API keys and configuration
4. Start the development server:
   ```
   pnpm dev
   ```
5. For backend development, set up a Python virtual environment and install dependencies
6. Configure Supabase connection

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `OPENAI_API_KEY`: OpenAI API key
- `OPENROUTER_API_KEY`: OpenRouter API key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `MCP_EMAIL_CONFIG`: Configuration for email sending via MCP

## Technical Constraints

### Performance Requirements
- Real-time responses for voice-to-text conversion
- Prompt loading times on dashboard and during key interactions
- Efficient data retrieval from Supabase for RAG system

### Security Constraints
- Secure authentication using Google OAuth
- Encryption of sensitive data in transit and at rest
- Compliance with privacy guidelines for educational data
- Secure handling of payment information through Stripe

### Scalability Considerations
- System design to handle growing number of concurrent users
- Efficient management of resource demands
- Architecture to accommodate increases in data volume stored in Supabase

## Dependencies

### Frontend Dependencies
The project uses numerous UI components from Radix UI, along with utility libraries:
- Radix UI components (@radix-ui/react-*)
- class-variance-authority for component variants
- clsx and tailwind-merge for conditional class names
- date-fns for date manipulation
- react-hook-form and zod for form validation
- next-themes for theme switching

### Backend Dependencies
- Python libraries for AI integration
- Supabase client for database operations
- Authentication libraries for token validation
- Payment processing libraries for Stripe integration

### External API Dependencies
- Google OAuth API for authentication
- OpenRouter API for conversational AI
- OpenAI API for speech-to-text and voice features
- Stripe API for payment processing
- MCP for email functionality

## Integration Points

### Frontend-Backend Integration
- RESTful API endpoints for all functionality
- Secure token-based authentication for requests

### Third-Party Service Integration
- Google OAuth for authentication flow
- OpenRouter and OpenAI for AI capabilities
- Stripe for payment processing
- Supabase for data storage and retrieval

### Potential Integration Challenges
- Managing rate limits on external APIs
- Ensuring consistent data flow between services
- Handling token expiration and refresh for authentication
- Synchronizing state between frontend and backend 