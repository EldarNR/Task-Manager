// libraries
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage:FC = () => (
  <div className="not-found-page">
    <h1 className="not-found-page--title">404 - Not Found</h1>
    <Link className="not-found-page--back" to="/">Назад</Link>
  </div>
);

export default NotFoundPage;
