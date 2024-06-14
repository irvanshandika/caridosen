import React from "react";

interface BannerProps {
  apiKey: string;
}

const GeminiApiBanner: React.FC<BannerProps> = ({ apiKey }) => {
  const action = "enter it at the top of main.js";
  if (apiKey === "TODO") {
    return (
      <div className="api-key-banner">
        To get started with the Gemini API,
        <a href="https://g.co/ai/idxGetGeminiKey" target="_blank" rel="noopener noreferrer">
          get an API key
        </a>{" "}
        and {action}
      </div>
    );
  }
  return null;
};

export default GeminiApiBanner;
