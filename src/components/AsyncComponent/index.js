import React from 'react';
import loadable from '@loadable/component'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
function AsyncComponent (props) {
  const {component, viewPath = 'views', showLoading = false} = props
  if (showLoading) NProgress.start()
  const LoadComponent = loadable(
    () => import(`@/${viewPath}/${component}`),
    {
      fallback: <div>Loading...</div>
    }
  )
  LoadComponent.load().then(() => {
    if (showLoading) NProgress.done()
  })
  return (
    <LoadComponent {...props} />
  )
}
export function renderAsyncComponent (props, component) {
  return (
    <AsyncComponent component={component} {...props} />
  )
}
export default AsyncComponent
