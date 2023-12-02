import React, { useState } from 'react';
import { useArticlesContext } from '../hooks/useArticlesContext';

const ArticleForm = () => {
  const { dispatch } = useArticlesContext();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = { title, body, author };

    const response = await fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setTitle('');
      setBody('');
      setAuthor('');
      setEmptyFields([]);
      dispatch({ type: 'CREATE_ARTICLE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Article</h3>

      <label>Article Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Article Body:</label>
      <textarea
        onChange={(e) => setBody(e.target.value)}
        value={body}
        className={emptyFields.includes('body') ? 'error' : ''}
      ></textarea>

      <label>Author:</label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes('author') ? 'error' : ''}
      />

      <button>Add Article</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ArticleForm;
