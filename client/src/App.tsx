import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './PageRender'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import Alert from './components/notifications/Alert'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authActions'
import { getCategories } from './redux/actions/categoryActions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken())
    dispatch(getCategories())
  }, [dispatch])
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Alert />
        <Router>
          <Header />
          <div className='flex-1 container mx-auto px-4'>
            <Switch>
              <Route exact path='/' component={PageRender} />
              <Route exact path='/:page' component={PageRender} />
              <Route exact path='/:page/:slug' component={PageRender} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
