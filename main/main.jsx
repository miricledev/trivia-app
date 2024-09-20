import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TriviaMenu from '../components/menu';
import QuestionBody from '../components/questionBody';
import ResultsPage from '../components/resultsPage';  // Import ResultsPage
import { useState } from 'react';

function Main() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questionsAnswered, setQuestionsAnswered] = useState([]);  // Initialize questionsAnswered state

  const handleCreate = ({ category, difficulty }) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>App</h1>
              <TriviaMenu handleCreate={handleCreate} />
              <QuestionBody 
                category={selectedCategory} 
                difficulty={selectedDifficulty} 
                setQuestionsAnswered={setQuestionsAnswered}
                questionsAnswered={questionsAnswered}  // Pass setQuestionsAnswered function
              />
            </div>
          }
        />
        <Route 
          path="/results" 
          element={<ResultsPage questionsAnswered={questionsAnswered} />}  // Pass the populated questionsAnswered array
        />
      </Routes>
    </Router>
  );
}

export default Main;
