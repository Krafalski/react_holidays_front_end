import React from 'react'
import './css/normalize.css'
import './css/skeleton.css'
import './css/index.css'
import ballons from './images/two-balloon-icons-68911.png'
import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
import NewForm from './components/NewForm.js'
import Show from './components/Show.js'
import UpdateForm from './components/UpdateForm.js'
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
   this.getHoliday = this.getHoliday.bind(this)
   this.getHolidays = this.getHolidays.bind(this)
   this.handleAddHoliday = this.handleAddHoliday.bind(this)
   this.toggleCelebrated = this.toggleCelebrated.bind(this)
   this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
   this.updateHoliday = this.updateHoliday.bind(this)
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
getHoliday(holiday) {
  this.setState({holiday: holiday})
}
 getHolidays() {
   fetch(baseURL+ '/holidays')
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => this.setState({holidays: parsedData}),
      err=> console.log(err))
 }
 toggleCelebrated (holiday) {
  fetch(baseURL + '/holidays/' + holiday._id, {
    method: 'PUT',
    body: JSON.stringify({celebrated: !holiday.celebrated}),
    headers: {
      'Content-Type' : 'application/json'
    }
  }).then(res => res.json())
  .then(resJson => {
       const copyHolidays = [...this.state.holidays]
        const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson._id)
        copyHolidays[findIndex].celebrated = resJson.celebrated
        this.setState({holidays: copyHolidays})
  })
}
toggleUpdateForm() {
  this.setState({showForm: !this.state.showForm})
}
updateHoliday(holiday) {
 fetch(baseURL + '/holidays/' + holiday.id, {
   method: 'PUT',
   body: JSON.stringify(holiday),
   headers: {
     'Content-Type' : 'application/json'
   }
 }).then(res => res.json())
 .then(resJson => {
      const copyHolidays = [...this.state.holidays]
       const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson._id)
       copyHolidays[findIndex]= resJson
       this.setState({holidays: copyHolidays})
 })
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
                <tr key={holiday._id} onMouseOver={() => this.getHoliday(holiday)}>
                  <td
                    onDoubleClick={() => this.toggleCelebrated(holiday)}
                    className={holiday.celebrated
                      ? 'celebrated'
                      :
                      null}
                    >{holiday.name} Day</td>
                  <td>{holiday.likes}</td>
                  <td onClick={() => this.updateLikes(holiday)}><img src={ballons} alt="ballons"/></td>
                  <td><img src={pencil} alt="pencil" onClick={this.toggleUpdateForm}/></td>
                  <td onClick={()=>this.deleteHoliday(holiday._id)}>X</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      { this.state.holiday
        ? <Show holiday={this.state.holiday}/>
        : null }
        { this.state.showForm
          ? <UpdateForm holiday={this.state.holiday}             toggleUpdateForm={this.toggleUpdateForm}
          handleUpdateHoliday={this.updateHoliday}
          />
          : null }
     </div>
   )
 }
}

export default App
