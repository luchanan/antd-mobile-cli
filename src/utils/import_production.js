import React from 'react';
import loadable from '@loadable/component'
export default (component, viewPath = 'views') => {
  return loadable(
    () => import(`@/${viewPath}/${component}`),
    {
      fallback: <div>Loading...</div>
    }
  );
}