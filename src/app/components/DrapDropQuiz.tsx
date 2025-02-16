"use client"

import { useState } from "react";
import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";

const words = [
  { id: "apple", word: "Apple", match: "Fruit" },
  { id: "carrot", word: "Carrot", match: "Vegetable" },
  { id: "banana", word: "Banana", match: "Fruit" },
];

const categories = ["Fruit", "Vegetable"];

export default function DragDropQuiz() {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveDrag(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveDrag(null);
    if (over) {
      setMatches((prev) => ({ ...prev, [active.id]: over.id }));
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="p-4">
        <h2 className="text-lg font-bold">Match the words with the correct category</h2>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2 p-4 border rounded-lg">
            <p className="font-semibold">Drag these words:</p>
            {words.map((word) => (
              <DraggableWord key={word.id} id={word.id} text={word.word} activeDrag={activeDrag} matches={matches} />
            ))}
          </div>

          <div className="w-1/2">
            {categories.map((category) => (
              <DroppableZone key={category} id={category} label={category} matches={matches} submitted={submitted} />
            ))}
          </div>
        </div>

        <button onClick={() => setSubmitted(true)} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md">
          Submit
        </button>
      </div>

      {createPortal(
        <DragOverlay>
          {activeDrag ? <DraggableWord id={activeDrag} text={words.find((w) => w.id === activeDrag)?.word || ""} isDragging /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

function DraggableWord({ id, text, isDragging = false, activeDrag, matches }: { id: string; text: string; isDragging?: boolean; activeDrag?: string | null; matches?: any }) {
  const { attributes, listeners, setNodeRef, isDragging: isCurrentlyDragging } = useDraggable({ id });

  const isMatched = matches?.[id] !== undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 mt-2 border cursor-pointer rounded-md transition-all duration-200 ease-in-out 
        ${isDragging || isCurrentlyDragging ? "bg-black text-white scale-110 opacity-90 shadow-lg" : ""}
        ${isMatched ? "text-gray-400 cursor-not-allowed" : "bg-gray-100"}
      `}
    >
      {text}
    </div>
  );
}

function DroppableZone({ id, label, matches, submitted }: { id: string; label: string; matches: any; submitted: boolean }) {
  const { setNodeRef } = useDroppable({ id });

  const matchedWord = Object.keys(matches).find((key) => matches[key] === id);
  const isCorrect = submitted && matchedWord && words.find((w) => w.id === matchedWord)?.match === id;
  const isWrong = submitted && matchedWord && !isCorrect;

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded-lg min-h-[50px] mt-4 transition-all duration-200 ease-in-out
        ${isCorrect ? "bg-green-500 text-white" : isWrong ? "bg-red-500 text-white" : "bg-gray-100"}
      `}
    >
      <p className="font-semibold">{label}</p>
      <div className="mt-2">{matchedWord ? words.find((w) => w.id === matchedWord)?.word : "Drop here"}</div>
    </div>
  );
}
