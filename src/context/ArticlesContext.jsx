import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth();

  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
    return JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
  });

  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticlesByUser[user.username] || [];
  };
 const getAllUserArticles = () => {
  return savedArticlesByUser;
};
  const saveArticle = (article) => {
    if (!user) return;

    setSavedArticlesByUser(prev => {
      const userArticles = prev[user.username] || [];

      // Prevent duplicates
      if (userArticles.find(a => a.url === article.url)) {
        return prev;
      }

      const updated = {
        ...prev,
        [user.username]: [...userArticles, article]
      };

      localStorage.setItem(
        'savedArticlesByUser',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const removeArticle = (url) => {
    if (!user) return;

    setSavedArticlesByUser(prev => {
      const userArticles = prev[user.username] || [];

      const updatedUserArticles =
        userArticles.filter(a => a.url !== url);

      const updated = {
        ...prev,
        [user.username]: updatedUserArticles
      };

      localStorage.setItem(
        'savedArticlesByUser',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const isArticleSaved = (url) => {
    if (!user) return false;

    const userArticles = savedArticlesByUser[user.username] || [];
    return userArticles.some(a => a.url === url);
  };

  return (
    <ArticlesContext.Provider
  value={{
    saveArticle,
    removeArticle,
    isArticleSaved,
    getUserSavedArticles,
    getAllUserArticles
  }}
>
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};