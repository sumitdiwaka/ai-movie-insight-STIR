import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { imdbId } = await req.json();
  const OMDB_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  try {
    // 1. Fetch Movie Details from OMDb
    const movieRes = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_KEY}`);
    const movieData = movieRes.data;

    if (movieData.Response === "False") {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    // 2. AI Sentiment Analysis (Mocking the prompt for Gemini)
    // In a real app, you'd send movieData.Plot to Gemini here
    const aiInsight = {
      sentiment: "Positive", // This would come from Gemini
      summary: `The audience generally appreciates the ${movieData.Genre} elements and the performance of ${movieData.Actors}.`
    };

    return NextResponse.json({ ...movieData, aiInsight });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}