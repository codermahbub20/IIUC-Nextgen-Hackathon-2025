import  { useState } from "react";

export default function CareerBot({ userId }: { userId: string }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askBot() {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/careerbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, question })
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Ask CareerBot</h1>

      <textarea
        className="w-full p-3 border rounded mb-3"
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your question..."
      />

      <button
        onClick={askBot}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask CareerBot"}
      </button>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}
