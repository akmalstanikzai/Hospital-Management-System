import React, { useEffect } from 'react';
import { useArticlesContext } from '../hooks/useArticlesContext'; // Import the custom hook for ArticlesContext
import { useAuthContext } from "../hooks/useAuthContext"

// Import necessary components (e.g., ArticleDetails, ArticleForm)
import ArticleDetails from "../components/ArticleDetails"
import ArticleForm from "../components/ArticleForm"

const Articles = () => {
  const { articles, dispatch } = useArticlesContext(); // Accessing articles state and dispatch from ArticlesContext
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles' , {
          headers: {'Authorization': `Bearer ${user.token}`},
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        dispatch({ type: 'SET_ARTICLES', payload: json }); // Dispatching action to set articles in the context
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Handle errors, set appropriate state or display error messages
      }
    };

    if ( user ) {
      fetchArticles();
    }
    
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="articles">
        {articles &&
          articles.map(article => (
            <ArticleDetails article={article} key={article._id} />
          ))}
      </div>
      <ArticleForm />
    </div>
  );
};

export default Articles;
