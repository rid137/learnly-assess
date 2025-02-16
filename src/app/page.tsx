import DragDropQuiz from "./components/DrapDropQuiz";
import Quiz from "./components/Quiz";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Mini Quiz App</h1>
      <Quiz />
      <DragDropQuiz />
    </div>
  );
}