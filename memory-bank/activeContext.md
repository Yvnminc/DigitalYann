# Active Context

## Current Work Focus
The project is in its initial development stage. The frontend environment has been set up with Next.js 15.2.4 and essential UI components from the shadcn/ui library. The focus is currently on establishing the foundation for further development.

## Recent Changes
1. Set up the basic Next.js project structure with TypeScript support
2. Installed necessary dependencies including:
   - React 19
   - Tailwind CSS for styling
   - shadcn/ui components based on Radix UI
   - Framer Motion for animations
   - Other utility libraries for form handling and UI components
3. Created a basic application layout

## Current Status
- The project has a functional Next.js development environment
- Basic folder structure is in place including app, components, hooks, and lib directories
- Tailwind CSS is configured for styling
- The landing page is minimally implemented
- Backend components have not yet been started

## Next Steps
1. **Frontend Development:**
   - Design and implement the landing page with authentication flow
   - Create user onboarding screens explaining service tiers
   - Build the main dashboard interface
   - Implement conversation UI for text and voice interactions
   - Develop RAG content display components

2. **Backend Development:**
   - Set up Python backend environment
   - Create folder structure for backend services
   - Implement RESTful API endpoints for:
     - Authentication with Google OAuth
     - Conversational AI with OpenRouter
     - Speech-to-text and voice dialogue with OpenAI
     - RAG storage and retrieval with Supabase
     - Payment processing with Stripe
     - Email functionality with MCP

3. **Integration Tasks:**
   - Connect frontend to backend APIs
   - Implement Google OAuth authentication flow
   - Integrate RAG system with conversational UI
   - Set up payment processing with Stripe
   - Connect email notification system

## Active Decisions and Considerations
1. **Authentication Flow:**
   - Decision needed on handling token storage and refresh
   - Consider whether to implement additional authentication methods

2. **AI Integration:**
   - Need to determine specific OpenRouter models to use
   - Consider rate limiting and fallback strategies for API calls

3. **Database Schema:**
   - Finalize Supabase table structure for users, content, and interactions
   - Decide on indexing strategy for efficient RAG retrieval

4. **UI/UX Design:**
   - Further refinement needed for the dashboard layout
   - Determine how to integrate voice recording interface seamlessly

5. **Subscription Management:**
   - Develop clear strategy for tracking free tier usage limits
   - Plan implementation of conversion funnel from free to paid tier 