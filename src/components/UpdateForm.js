import React from 'react'

class UpdateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      celebrated: false,
      likes: 0,
      description:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  componentDidMount() {
    if (this.props.holiday.name) {
      this.setState({
        name: this.props.holiday.name,
        celebrated: this.props.holiday.celebrated,
        likes: this.props.holiday.likes,
        description: this.props.holiday.description
      })
    }
  }
  handleChange (event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value})
  }
  handleUpdate(event) {
    event.preventDefault()
    this.props.handleUpdateHoliday({
      name: this.state.name,
      celebrated: this.state.celebrated,
      likes: this.state.likes,
      description: this.state.description,
      id: this.props.holiday._id
    })
    this.props.toggleUpdateForm()
  }
  render () {
    return (
      <div className="modal edit">
        <form onSubmit={this.handleUpdate}>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder={this.state.name}
              value={this.state.name}
              id="name"
              onChange={this.handleChange}
            />
            <label htmlFor="celebrated">Celebrated</label>
            <input
              type="text"
              placeholder={this.state.celebrated.toString()} value={this.state.celebrated.toString()}
              id="celebrated"
              onChange={this.handleChange}
            />
            <label htmlFor="likes">Likes</label>
            <input
              type="number"
              placeholder={this.props.holiday.likes}
              value={this.state.likes}
              id="likes"
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="u-full-width"
              placeholder={this.props.holiday.description}
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            >
            </textarea>
            <input type="submit" value="Update Holiday" className="button-primary" />
            <button className="button-red" onClick={this.props.toggleUpdateForm}> Don't Update </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateForm
