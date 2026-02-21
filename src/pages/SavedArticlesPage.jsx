import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

const SavedArticlesPage = () => {
  const { getUserSavedArticles } = useArticles();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <h2 className="page-heading">Saved Articles</h2>
        <div className="warning-banner">
          <p>Please log in to view your saved articles.</p>
        </div>
      </div>
    );
  }

  const savedArticles = getUserSavedArticles();

  return (
    <div>
      <h2 className="page-heading">Saved Articles</h2>

      {savedArticles.length === 0 ? (
        <div className="message">
          No saved articles yet.
        </div>
      ) : (
        <div className="articles-grid">
          {savedArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticlesPage;