import { NextResponse } from 'next/server';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { imdbId } = await req.json();
    const OMDB_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    // 1. Fetch Movie Metadata from OMDb
    const movieRes = await axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_KEY}`);
    const movieData = movieRes.data;

    if (movieData.Response === "False") {
      return NextResponse.json({ error: "Movie not found in IMDb database." }, { status: 404 });
    }

    // 2. Initialize Gemini AI 
    const genAI = new GoogleGenerativeAI(GEMINI_KEY as string);
    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

    const prompt = `
      Analyze the audience sentiment for the movie: "${movieData.Title}".
      IMDb Rating: ${movieData.imdbRating}/10
      Plot: ${movieData.Plot}

      Instructions:
      - If the IMDb Rating is below 5.5, the sentiment MUST be "Negative".
      - If the IMDb Rating is between 5.5 and 7.2, the sentiment MUST be "Mixed".
      - If the IMDb Rating is above 7.2, the sentiment MUST be "Positive".
      - Provide a concise 2-sentence summary explaining this sentiment based on the plot and rating.

      Return ONLY a JSON object in this exact format:
      {
        "sentiment": "Positive" | "Mixed" | "Negative",
        "summary": "your analysis here"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const aiInsight = JSON.parse(cleanedText);

   
    return NextResponse.json({
      ...movieData,
      aiInsight
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to build movie insights. Check your API keys." }, { status: 500 });
  }
}