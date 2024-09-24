import { useNavigate } from 'react-router-dom';
import he from 'he';

export default function ResultsPage({ questionsAnswered }) {
  const navigate = useNavigate();

  // Calculate the number of correct answers
  const correctAnswersCount = questionsAnswered.reduce((acc, answer) => {
    return acc + (answer.selectedAnswer === answer.correct_answer ? 1 : 0);
  }, 0);

  // Determine the color for the score based on the correct answers
  const getScoreColor = () => {
    if (correctAnswersCount <= 1) return 'red';
    if (correctAnswersCount <= 3) return 'yellow';
    return 'green';
  };

  // Handle the "Create New Quiz" button click
  const handleCreateNewQuiz = () => {
    navigate('/');
  };

  if (!questionsAnswered.length) {
    return <p>No results to display yet. Please answer the questions first.</p>;
  }

  return (
    <div>
      <h1>Results</h1>
      {questionsAnswered.map((answer, index) => {
        const isCorrect = answer.selectedAnswer === answer.correct_answer;
        return (
          <div key={index}>
            <p>{he.decode(answer.question)}</p>
            <div>
              {answer.shuffledAnswers.map((option, i) => {
                const isSelected = answer.selectedAnswer === option;
                const isAnswerCorrect = option === answer.correct_answer;
                return (
                  <button
                    key={i}
                    style={{
                      backgroundColor: isSelected
                        ? (isAnswerCorrect ? 'green' : 'red')
                        : (isAnswerCorrect ? 'green' : 'white')
                    }}
                  >
                    {he.decode(option)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Final score display */}
      <div style={{ backgroundColor: getScoreColor() }}>
        <h2>Your Score: {correctAnswersCount} / {questionsAnswered.length}</h2>
      </div>

      {/* Button to create a new quiz */}
      <button onClick={handleCreateNewQuiz}>
        Create New Quiz
      </button>
    </div>
  );
}
