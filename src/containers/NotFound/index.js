import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config';

const NotFound = () => {
  const pageTitle = `404 not found - ${config.app.title}`;
  const styles = require('./styles.css');

  return (
    <div className="container">
      <Helmet title={pageTitle} />
      <div className={styles.notFound}>
        <h1>404</h1>
        <p>This is not the web page you are looking for.</p>
      </div>
    </div>
  );
};

export default NotFound;
