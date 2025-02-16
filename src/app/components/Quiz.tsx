"use client"

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
];

export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-4">
      {questions.map((q) => (
        <div key={q.id} className="mb-4 p-4 border rounded-lg">
          <p className="font-semibold">{q.question}</p>
          <div className="mt-2 space-y-2">
            {q.options.map((option) => {
              const isSelected = selectedAnswers[q.id] === option;
              const isCorrect = submitted && option === q.answer;
              const isWrong = submitted && isSelected && option !== q.answer;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(q.id, option)}
                  className={`w-full p-2 rounded-md border ${
                    isCorrect ? "bg-green-500 text-white" : 
                    isWrong ? "bg-red-500 text-white" :
                    isSelected ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md">
        Submit Answers
      </button>
    </div>
  );
}