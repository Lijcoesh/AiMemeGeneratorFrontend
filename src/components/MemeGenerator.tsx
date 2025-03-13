"use client";

import { useState } from "react";
import axios from "axios";
import { Wand2, Loader2, AlertCircle } from "lucide-react";

const MemeGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [memeUrl, setMemeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMeme = async () => {
    if (!userInput.trim()) {
      setError("Please enter some text to generate a meme");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send POST request to backend with the user input
      const response = await axios.post("http://localhost:5000/generate-meme", {
        text: userInput,
      });

      // Update the memeUrl with the generated meme URL from the backend response
      setMemeUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating meme:", error);
      setError("Failed to generate meme. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Create Hilarious</span>
          <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-Powered Pictures
          </span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Type your idea and let our AI create the perfect meme for you!
        </p>
      </div>

      <div className="bg-gradient-to-br from-white to-indigo-50 shadow-xl rounded-2xl overflow-hidden border border-indigo-100">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a funny text for your meme..."
              className="flex-1 px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white shadow-inner"
            />
            <button
              onClick={generateMeme}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  <span>Generate Meme</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="mt-4 text-gray-500">
                  Creating your meme masterpiece...
                </p>
              </div>
            ) : memeUrl ? (
              <div className="flex flex-col items-center">
                <img
                  src={memeUrl || "/placeholder.svg"}
                  alt="Generated Meme"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <a
                    href={memeUrl}
                    download="ai-generated-meme.jpg"
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors font-medium"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(memeUrl);
                      alert("Meme URL copied to clipboard!");
                    }}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors font-medium"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-indigo-300 rounded-lg bg-indigo-50/50">
                <div className="text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Your meme will appear here after generation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
