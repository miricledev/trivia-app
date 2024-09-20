import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import he from 'he';

export default function QuestionBody({ category, difficulty, setQuestionsAnswered, questionsAnswered }) {
  const [questionArray, setQuestionArray] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // in the case at start where nothing selected
    if (!category || !difficulty) return;
    const questionUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    fetch(questionUrl)
      .then(res => res.json())
      .then(data => setQuestionArray(data.results.map(questionAttr => {
        const answers = [...questionAttr.incorrect_answers, questionAttr.correct_answer];
        const shuffledAnswers = shuffleArray(answers);
        questionAttr.question = he.decode(questionAttr.question);
        return { ...questionAttr, shuffledAnswers };
      })))
      .catch(error => console.log(`An error occurred: ${error}`));
  }, [category, difficulty]);

  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const handleAnswerClick = (questionObj, selectedAnswer) => {
    const updatedAnswers = { ...selectedAnswers, [questionObj.question]: selectedAnswer };
    setSelectedAnswers(updatedAnswers);

    setQuestionsAnswered(prev => {
      // Find if this question already exists in the list
      const existingQuestionIndex = prev.findIndex(q => q.question === questionObj.question);
      const updatedQuestionData = {
        question: questionObj.question,
        selectedAnswer,
        correct_answer: questionObj.correct_answer,
        shuffledAnswers: questionObj.shuffledAnswers
      };

      // Update the existing question or add a new one
      if (existingQuestionIndex >= 0) {
        const updatedQuestions = [...prev];
        updatedQuestions[existingQuestionIndex] = updatedQuestionData;
        return updatedQuestions;
      } else {
        return [...prev, updatedQuestionData];
      }
    });
  };

  const handleSubmit = () => {
    navigate('/results');
  };

  return (
    <div>
      {!category || !difficulty ? <h1>Select category and difficulty</h1> : <h1>Questions</h1>}
      {questionArray.length > 0 ? questionArray.map((questionObj, index) => (
        <div key={index}>
          <p className="question--text">{questionObj.question}</p>
          <div className="multiple--options">
            {questionObj.shuffledAnswers.map((option, i) => {
              const isSelected = selectedAnswers[questionObj.question] === option;
              return (
                <button
                  key={i}
                  style={{ backgroundColor: isSelected ? 'green' : 'white' }}
                  onClick={() => handleAnswerClick(questionObj, option)}
                >
                  {he.decode(option)}
                </button>
              );
            })}
          </div>
        </div>
      )) : <h2>No quizzes found for these settings</h2>}
      {questionsAnswered.length >= 5 && (
        <button className="submission--button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}
