# RewriteFlow
RewriteFlow is an AI-powered writing assistant that rewrites text to match a user-defined goal while preserving the original meaning.

**Live app:** [https://rewriteflow.vercel.app/](https://rewriteflow.vercel.app/)

## Overview
RewriteFlow helps users improve writing quickly and consistently. Users paste text, choose a rewrite mode, and receive a streamed AI-generated rewrite tailored to their intent.

## Features

- AI-powered rewriting with Google Gemini
- 7 rewrite modes:
  - Improve
  - Professional
  - Friendly
  - Concise
  - Simplify
  - Fix grammar
  - Custom
- Custom user instructions
- Streaming responses
- Stop generation mid-stream
- Copy latest completed response
- Loading, error, empty, and failure states
- Light/dark theme with persistence
- Responsive layout for mobile and desktop
- Accessibility-focused UI
- Keyboard-accessible controls and visible focus states

## Architecture

```
User
  ↓
RewriteFlow UI
  ↓
/api/chat
  ↓
Vercel AI SDK
  ↓
Google Gemini 2.5 Flash
  ↓
Streamed response
  ↓
RewriteFlow UI
```
The frontend sends the source text, selected rewrite mode, and optional custom instruction to the `/api/chat` route. The API validates the input and constructs a system prompt before sending it to Gemini through the Vercel AI SDK.

The `GEMINI_API_KEY` is kept server-side and is never exposed to the client.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel AI SDK
- Google Gemini 2.5 Flash
- Vitest
- Testing Library
- Lucide React
- Vercel

## Getting Started

### Prerequisites

- Node.js
- npm
- Google Gemini API key

### Install

```
npm install
```

### Environment Variables
Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_gemini_api_key
```
Keep the API key server-side and do not commit `.env.local` to the repository.

### Run locally

```
npm run dev
```
Open:

```
http://localhost:3000
```

## Testing
Run the complete validation suite:

```
npm test
npm run lint
npx tsc --noEmit
npm run build
```
The project includes automated tests covering AI rewrite logic, API request validation, RewriteFlow interactions, custom instructions, and theme behavior.

## Accessibility and Responsive Design
Accessibility is treated as a core part of the product.

The application includes:

- Semantic HTML
- Proper form labeling
- Accessible button names
- Keyboard-accessible interactions
- Visible focus states
- Accessible loading and error feedback
- Responsive layouts for mobile and desktop
The interface is designed and tested for viewport sizes including approximately 375px and 1280px.

The repository also contains an accessibility playground with custom Modal, Tabs, and Disclosure implementations. Additional notes are documented in `NOTES.md`.

## Project Structure

```
src/
├── app/
│   ├── (rewriteflow)/
│   │   ├── about/
│   │   ├── health/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/
│       └── chat/
│           └── route.ts
├── components/
│   ├── rewriteflow-chat.tsx
│   └── theme-toggle.tsx
└── lib/
    └── ai/
        ├── rewriteflow.ts
        ├── rewriteflow-modes.ts
        └── rewriteflow-prompt.ts
```

## Deployment
RewriteFlow is deployed on Vercel.

**Production:** [https://rewriteflow.vercel.app/](https://rewriteflow.vercel.app/)

The application uses environment variables for the Gemini API key rather than committing credentials to source control.

## Internship Context
This project was developed as part of the FlyRank AI Frontend internship and focuses on accessible frontend engineering, AI integration, automated testing, and production deployment.

## Known Limitations and Future Improvements

- Gemini availability depends on API quota and provider availability.
- The application currently focuses on single-text rewriting rather than document-level editing.
- Future improvements could include rewrite history, additional AI models, richer editing controls, and more extensive end-to-end testing.
