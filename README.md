# Digital Yann

A Next.js application with a Python FastAPI backend for AI-powered chat interactions using OpenRouter API.

## Features

- Modern UI with voice interface
- Integration with multiple AI models via OpenRouter
- Voice transcription (simulated in current version)
- Learning modules panel with course content
- Light/dark theme support

## Tech Stack

### Frontend
- Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons

### Backend
- Python FastAPI
- OpenRouter API integration

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- npm or yarn

### Step 1: Install Frontend Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Set up Python Backend
```bash
cd backend
pip install -r requirements.txt
```

### Step 3: Environment Configuration
Create a `.env.local` file in the root directory:
```
BACKEND_URL=http://localhost:8000
```

Optionally, create a `.env` file in the `backend` directory to override default values:
```
OPENROUTER_API_KEY=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
SITE_URL=https://digitalyann.app
SITE_NAME=Digital Yann
```

## Running the Application

### Start the Backend
```bash
cd backend
python main.py
```

### Start the Frontend
In a new terminal:
```bash
npm run dev
# or
yarn dev
```

Navigate to http://localhost:3000 to see the application.

## Available Models

The application supports the following models through OpenRouter:

1. **GPT-4o** - Advanced reasoning with web search capabilities
2. **Claude 3.7 Sonnet** - Exceptional comprehension with balanced performance
3. **DeepSeek** - Powerful language model with strong reasoning abilities
4. **Gemini 2.0 Flash** - Fast responses with solid multimodal capabilities
5. **Quasar Alpha** - Cutting-edge open-source model with broad capabilities

## License

MIT 