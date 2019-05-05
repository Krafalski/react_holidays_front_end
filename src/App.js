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

// baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
console.log('current base URL:', baseURL)



class App extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     holidays: []
   }
   this.getHolidays = this.getHolidays.bind(this)
   this.handleChange = this.handleChange.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
 }
 componentDidMount(){
  this.getHolidays()
}
handleChange (event) {
  this.setState({ [event.currentTarget.id]: event.currentTarget.value})
}
handleSubmit (event) {
  event.preventDefault()
  fetch(baseURL + '/holidays', {
    method: 'POST',
    body: JSON.stringify({name: this.state.name}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then (res => res.json())
    .then (resJson => {
    const copyHolidays = [...this.state.holidays]
    copyHolidays.push(resJson)
    this.setState({
      holidays: copyHolidays,
      name: ''
    })
  }).catch (error => console.error({'Error': error}))
}
 getHolidays() {
   fetch(baseURL+ '/holidays')
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => this.setState({holidays: parsedData}),
      err=> console.log(err))
 }
  render () {
   return (
     <div className='container'>
      <h1>Holidays! Celebrate!</h1>
      <table>
        <tbody>
          { this.state.holidays.map(holiday => {
              return (
                <tr>
                  <td key={holiday._id} > {holiday.name }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
     </div>
   )
 }
}

export default App
