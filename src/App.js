import React from 'react'
import './css/normalize.css'
import './css/skeleton.css'
import './css/index.css'
// import ballons from './images/two-balloon-icons-68911.png'
// import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
import NewForm from './components/NewForm.js'
// import Show from './components/Show.js'
// import UpdateForm from './components/UpdateForm.js'
let baseURL = process.env.REACT_APP_BASEURL

//alternate baseURL = 'https://fathomless-sierra-68956.herokuapp.com'

console.log('current base URL:', baseURL)

class App extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     holidays: []
   }
   this.deleteHoliday = this.deleteHoliday.bind(this)
   this.getHolidays = this.getHolidays.bind(this)
   this.handleAddHoliday = this.handleAddHoliday.bind(this)
 }
 componentDidMount(){
  this.getHolidays()
}
handleAddHoliday(holiday) {
  const copyHolidays = [...this.state.holidays]
  copyHolidays.unshift(holiday)
  this.setState({
    holidays: copyHolidays,
    name: ''
  })
}
deleteHoliday (id) {
fetch(baseURL + '/holidays/' + id, {
  method: 'DELETE'
}).then( response => {
  const findIndex = this.state.holidays.findIndex(holiday => holiday._id === id)
  const copyHolidays = [...this.state.holidays]
  copyHolidays.splice(findIndex, 1)
  this.setState({holidays: copyHolidays})
})
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
      <NewForm handleAddHoliday={this.handleAddHoliday}/>
      <table>
        <tbody>
          { this.state.holidays.map(holiday => {
              return (
                <tr key={holiday._id} >
                  <td> {holiday.name }</td>
                  <td onClick={()=>this.deleteHoliday(holiday._id)}>X</td>
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
