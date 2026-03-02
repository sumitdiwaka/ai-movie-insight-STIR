# AI Movie Insight Builder 🎬

A professional full-stack web application that allows users to enter an IMDb ID to retrieve detailed movie metadata and AI-generated audience sentiment insights.

**Live Demo:** [https://ai-movie-insight-stir.vercel.app/](https://ai-movie-insight-stir.vercel.app/)

---

## 🚀 Features
- **Metadata Retrieval:** Fetches Title, Year, Rating, Cast, and Plot using the OMDb API.
- **AI Sentiment Analysis:** Uses Google Gemini AI to summarize audience sentiment and classify it as Positive, Mixed, or Negative.
- **Responsive Design:** Premium, modern UI built with Tailwind CSS that works seamlessly on mobile and desktop.
- **Smooth Animations:** Integrated Framer Motion for a high-end user experience.
- **Graceful Error Handling:** Validates IMDb IDs and handles API failures without crashing.

---

## 🛠️ Tech Stack & Rationale

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js 14** | Framework | Chosen for its unified Routing (App Router) and Server Actions, which align with the company's focus on scalable apps. |
| **TypeScript** | Language | Ensures type safety and reduces runtime errors, meeting the "Clean Code" requirement. |
| **Tailwind CSS** | Styling | Allows for rapid, consistent UI development with a "modern outlook". |
| **Framer Motion** | Animations | Provides the "premium" feel and smooth transitions requested in the brief. |
| **Google Gemini API** | AI Engine | Used for its high-performance natural language processing to extract insights from plot data. |
| **Vercel** | Hosting | Recommended for Next.js to ensure 1-click deployments and seamless environment variable handling. |

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/sumitdiwaka/ai-movie-insight-STIR]
   (https://github.com/your-username/ai-movie-insight.git)
   cd ai-movie-insight

2. **Install Dependencies:**
    npm install

3. **Environment Variables:**
Create a .env.local file in the root directory and add your API keys:

NEXT_PUBLIC_OMDB_API_KEY=your_omdb_key
GEMINI_API_KEY=your_gemini_key

3. **Run the Development Server:**
Bash
npm run dev
Open http://localhost:3000 in your browser.

🧠 Assumptions & Decisions
Data Sourcing: While the brief mentioned "scraping", I opted for the OMDb API to ensure data accuracy, stability, and adherence to legal best practices.
AI Context: Since real-time "audience reviews" often require heavy scraping that can be blocked, I prompted the AI to generate a "Sentiment Summary" based on the detailed Plot and Metadata to simulate audience reception accurately.UI Minimalism: Focused on a "Single Page" experience to avoid over-engineering while maximizing usability.

🧪 TestingUnit Tests: Basic validation tests ensure that empty or invalid IMDb IDs (e.g., tt0000000) trigger appropriate error messages.
Responsiveness: Verified using Chrome DevTools across mobile, tablet, and desktop breakpoints