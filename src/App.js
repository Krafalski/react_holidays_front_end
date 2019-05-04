import React from 'react'
import './css/normalize.css'
import './css/skeleton.css'
import './css/index.css'
// import ballons from './images/two-balloon-icons-68911.png'
// import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
// import Show from './components/Show.js'
// import UpdateForm from './components/UpdateForm.js'
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3004'
} else {
  baseURL = 'your heroku bakend url here'
}

console.log('current base URL:', baseURL)

class App extends React.Component {
 render () {
   return (
     <div className='container'>
      <h1>Holidays! Celebrate!</h1>
     </div>
   )
 }

}

export default App
