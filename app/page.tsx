"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, AlertCircle, Loader2, Star, Calendar, Clock, Users, Sparkles, TrendingUp, Award, Zap } from 'lucide-react';

export default function Home() {
  const [imdbId, setImdbId] = useState('');
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMovie = async () => {
    if (!imdbId.trim()) {
      setError("Please enter an IMDb ID (e.g., tt0133093)");
      return;
    }

    setLoading(true);
    setError('');
    setMovie(null);

    try {
      const res = await fetch('/api/movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imdbId: imdbId.trim() }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Movie not found");
      }

      setMovie(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return 'from-emerald-500 to-green-500';
      case 'Negative': return 'from-rose-500 to-red-500';
      default: return 'from-amber-500 to-yellow-500';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return <TrendingUp className="w-4 h-4" />;
      case 'Negative': return <AlertCircle className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-300">AI-Powered Movie Insights</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Movie Insight
            </span>
            <br />
            <span className="text-white">Intelligence Platform</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Enter an IMDb ID to unlock AI-generated audience sentiment analysis and comprehensive movie insights
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:ring-0 text-white placeholder-slate-500"
                placeholder="Enter IMDb ID (e.g., tt0133093)"
                value={imdbId}
                onChange={(e) => setImdbId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchMovie()}
              />
            </div>
            <button 
              onClick={fetchMovie}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Movie</span>
                </>
              )}
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-slate-500 mt-3 text-center">
            Try: tt0133093 (The Matrix), tt1375666 (Inception), or tt0468569 (The Dark Knight)
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-rose-500/20 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                </div>
                <p className="text-rose-200 flex-1">{error}</p>
                <button 
                  onClick={() => setError('')}
                  className="text-rose-400/70 hover:text-rose-300 transition-colors"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movie Result Card */}
        <AnimatePresence mode="wait">
          {movie && (
            <motion.div 
              key={movie.imdbID}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              {/* Main Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8">
                  {/* Header with Poster and Basic Info */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Poster with 3D Effect */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="lg:w-64 flex-shrink-0"
                    >
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                        <img 
                          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                          alt={movie.Title} 
                          className="relative w-full rounded-2xl shadow-2xl border border-white/10"
                        />
                        
                        {/* Rating Badge */}
                        {movie.imdbRating !== "N/A" && (
                          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-yellow-500/30">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <span className="font-bold text-white">{movie.imdbRating}</span>
                              <span className="text-xs text-slate-400">/10</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Movie Details */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex-1"
                    >
                      <h2 className="text-4xl font-bold text-white mb-3">{movie.Title}</h2>
                      
                      {/* Metadata Chips */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {movie.Year && movie.Year !== "N/A" && (
                          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-300">{movie.Year}</span>
                          </div>
                        )}
                        {movie.Runtime && movie.Runtime !== "N/A" && (
                          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-300">{movie.Runtime}</span>
                          </div>
                        )}
                        {movie.Genre && movie.Genre !== "N/A" && (
                          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-sm">
                            <Film className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-300">{movie.Genre}</span>
                          </div>
                        )}
                        {movie.Rated && movie.Rated !== "N/A" && (
                          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-sm">
                            <Award className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-300">{movie.Rated}</span>
                          </div>
                        )}
                      </div>

                      {/* Plot */}
                      {movie.Plot && movie.Plot !== "N/A" && (
                        <div className="mb-6">
                          <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Synopsis</h3>
                          <p className="text-slate-300 leading-relaxed">{movie.Plot}</p>
                        </div>
                      )}

                      {/* Cast */}
                      {movie.Actors && movie.Actors !== "N/A" && (
                        <div className="mb-6">
                          <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Cast</h3>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-300">{movie.Actors}</p>
                          </div>
                        </div>
                      )}

                      {/* Director & Writer */}
                      {(movie.Director !== "N/A" || movie.Writer !== "N/A") && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {movie.Director !== "N/A" && (
                            <div>
                              <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-1">Director</h3>
                              <p className="text-slate-300">{movie.Director}</p>
                            </div>
                          )}
                          {movie.Writer !== "N/A" && (
                            <div>
                              <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-1">Writer</h3>
                              <p className="text-slate-300">{movie.Writer}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* AI Insights Section */}
                  {movie.aiInsight && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 pt-8 border-t border-white/10"
                    >
                      <div className={`bg-gradient-to-r ${getSentimentColor(movie.aiInsight.sentiment)}/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-xl bg-gradient-to-r ${getSentimentColor(movie.aiInsight.sentiment)}`}>
                            {getSentimentIcon(movie.aiInsight.sentiment)}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-400">AI Sentiment Analysis</h3>
                            <p className="text-xl font-bold text-white">{movie.aiInsight.sentiment}</p>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-2 top-0 text-6xl text-white/10 font-serif">"</div>
                          <p className="relative text-lg text-white/90 leading-relaxed pl-6">
                            {movie.aiInsight.summary}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Additional Info Grid */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
                  >
                    {movie.Language !== "N/A" && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Language</p>
                        <p className="text-sm font-medium text-white truncate">{movie.Language}</p>
                      </div>
                    )}
                    {movie.Country !== "N/A" && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Country</p>
                        <p className="text-sm font-medium text-white truncate">{movie.Country}</p>
                      </div>
                    )}
                    {movie.BoxOffice !== "N/A" && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Box Office</p>
                        <p className="text-sm font-medium text-white truncate">{movie.BoxOffice}</p>
                      </div>
                    )}
                    {movie.Awards !== "N/A" && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Awards</p>
                        <p className="text-sm font-medium text-white truncate">{movie.Awards.split('.').slice(0, 2).join('.')}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}