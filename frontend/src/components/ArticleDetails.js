import { useState } from 'react';
import { useArticlesContext } from '../hooks/useArticlesContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ArticleDetails = ({ article }) => {
  const { dispatch } = useArticlesContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`/api/articles/${article._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const deletedArticle = await response.json();
      dispatch({ type: 'DELETE_ARTICLE', payload: deletedArticle });
    }
    // Hide the confirmation modal whether the request is successful or not
    setShowConfirm(false);
  };

  return (
    <div className="article-details">
      <h4>{article.title}</h4>
      <p>{article.body}</p>
      <p>Author: {article.author}</p>
      <p>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={() => setShowConfirm(true)}>delete</span>

      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this article?</p>
            <button className="delete-button" onClick={handleDelete}>Yes, delete</button>
            <button className="cancel-button" onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
