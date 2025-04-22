import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [file, setFile] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMcqs([]);
    setError('');
    setSelectedAnswers({});
    setRevealedAnswers({});
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');
    setMcqs([]);
    setSelectedAnswers({});
    setRevealedAnswers({});

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = response.data;
      if (result.mcqs && Array.isArray(result.mcqs)) {
        setMcqs(result.mcqs);
      } else {
        setError('Unexpected response format.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (qIndex, selectedLabel) => {
    if (selectedAnswers[qIndex]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: selectedLabel,
    }));
    setRevealedAnswers((prev) => ({
      ...prev,
      [qIndex]: true,
    }));
  };

  return (
    <div className="app-container stylish-bg">
      <div className="upload-box card">
        <h1 className="title">📚 AI MCQ Generator</h1>

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileChange}
          className="file-input"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="upload-button"
        >
          {loading ? 'Processing...' : 'Upload & Generate'}
        </button>

        {error && <div className="error-message">❌ {error}</div>}

        {mcqs.length > 0 && (
          <div className="mcq-container">
            <h2 className="subtitle">✅ Generated MCQs</h2>
            <ul className="mcq-list">
              {mcqs.map((item, index) => (
                <li key={index} className="mcq-item">
                  <p className="question">Q{index + 1}: {item.question}</p>
                  <ul className="options">
                    {item.options.map((opt, i) => {
                      const label = opt.slice(0, 2);
                      const selected = selectedAnswers[index];
                      const isCorrect = label[0] === item.answer;
                      let optionClass = '';
                      if (revealedAnswers[index]) {
                        if (label[0] === selected) {
                          optionClass = isCorrect ? 'correct' : 'wrong';
                        } else if (isCorrect) {
                          optionClass = 'correct';
                        }
                      }
                      return (
                        <li
                          key={i}
                          className={`option button-style ${optionClass}`}
                          onClick={() => handleOptionClick(index, label[0])}
                        >
                          {opt}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
