import React from 'react'
import './normalize.css'
import './skeleton.css'
import './main.css'
import ballons from './images/two-balloon-icons-68911.png'
import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}

console.log(process.env)
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name:'',
      holidays: []
    }
    this.deleteHoliday = this.deleteHoliday.bind(this)
    this.getHolidays = this.getHolidays.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    this.getHolidays()
  }
  getHolidays() {
    fetch(baseURL + '/holidays')
    .then(response => response.json())
    .then(jsonedresponse => {
      this.setState({ holidays: jsonedresponse })

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
 render () {
   return (
     <div className='container'>
       <h1>Holidays! Celebrate!</h1>
       <form onSubmit={this.handleSubmit}>
         <label htmlFor="name">Holiday</label>
         <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name}/>
         <input type="submit" value="Add a Reason to Celebrate"/>
       </form>
       <>
        <table>
          <tbody>
            {this.state.holidays.map((holiday, index) => {
              return (
                <tr key={index}>
                  <td>{holiday.name} </td>
                  <td>{holiday.likes}</td>
                  <td><img src={ballons} alt="ballons"/></td>
                  <td><img src={pencil} alt="pencil"/></td>
                  <td onClick={()=>this.deleteHoliday(holiday._id)}> x </td>
                </tr>
              )
            })}
          </tbody>
        </table>
       </>
     </div>
   )
 }
}

export default App
