import React from 'react'
import './normalize.css'
import './skeleton.css'
import './main.css'
import ballons from './images/two-balloon-icons-68911.png'
import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
import Show from './components/Show.js'
import UpdateForm from './components/UpdateForm.js'

let baseURL = ''
if (process.env.REACT_APP_API_URL) {
  baseURL = process.env.REACT_APP_API_URL
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}


console.log(baseURL)
// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3004'
// } else {
//   baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
// }

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name:'',
      holidays: [],
      holiday: {},
      showForm: false
    }
    this.deleteHoliday = this.deleteHoliday.bind(this)
    this.getHoliday = this.getHoliday.bind(this)
    this.getHolidays = this.getHolidays.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleCelebrated  = this.toggleCelebrated.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateHoliday = this.updateHoliday.bind(this)
    this.updateLikes = this.updateLikes.bind(this)
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
  }
  componentDidMount(){
    this.getHolidays()
  }
  getHolidays() {
    fetch(baseURL + '/holidays')
    .then(response => response.json())
    .then(jsonedresponse => {
      this.setState({ holidays: jsonedresponse })
      this.setState({ holiday: jsonedresponse[0]})
    })
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
  updateLikes(holiday) {
   fetch(baseURL + '/holidays/' + holiday._id, {
     method: 'PUT',
     body: JSON.stringify({likes: holiday.likes + 1}),
     headers: {
       'Content-Type' : 'application/json'
     }
   }).then(res => res.json())
   .then(resJson => {
        const copyHolidays = [...this.state.holidays]
         const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson._id)
         copyHolidays[findIndex].likes = resJson.likes
         this.setState({holidays: copyHolidays})
   })
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
  getHoliday(holiday) {
    this.setState({holiday: holiday})
  }
  toggleUpdateForm() {
    this.setState({showForm: !this.state.showForm})
  }
 render () {
   return (
     <div className="container">
       <h1>Holidays! Celebrate!</h1>
       <form onSubmit={this.handleSubmit}>
         <label htmlFor="name"></label>
         <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="add a holiday"/>
         <input type="submit" value="Add a Reason to Celebrate"/>
       </form>
       <>
        <table>
          <tbody>
            {this.state.holidays.map((holiday, index) => {
              return (
                <tr key={index} onMouseOver={() => this.getHoliday(holiday)}>
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
                  <td onClick={()=>this.deleteHoliday(holiday._id)}> x </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        { this.state.holiday
          ? <Show holiday={this.state.holiday}
          : null />}
       </>
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
