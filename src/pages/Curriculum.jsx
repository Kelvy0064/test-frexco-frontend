import React, { Component } from 'react'
import { FormDialog } from './components/Form'
import api from '../services/api'
import AddIcon from '@material-ui/icons/Add'

export class Curriculum extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        id: '',
        name: '',
        about: '',
        skills: [{
          curse: '',
          level: ''
        }]
      },
      open: false,
      url: []
    }
  }

  componentDidMount () {
    this.getData()
  }

  handleSelectImagem (event) {
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('urls', [...this.state.url])
    formData.append('id', this.state.user.id)
    api.post('/api/customer/img', formData)
  }

  getData () {
    api.get('/api/customer', {
      headers: { 'Content-Type': 'application/json' }
    }).then(res =>
      this.setState({
        user: {
          id: res.data.customer[0]._id,
          name: res.data.customer[0].name,
          about: res.data.customer[0].about,
          skills: [...res.data.customer[0].skill]
        },
        url: [...res.data.customer[0].url]
      }
      )
    )
  }

  render () {
    return (
      <section>
        <FormDialog
          user={this.state.user}
        />
        <section className="curriculum-main">
          <p> <strong>Sobre:</strong><br/> { this.state.user.about }</p>
          <h1>{ this.state.user.name }</h1>
          <div className='div-skills'>
            <section className="skills">
              <strong>Habilidades</strong>
              {
                this.state.user.skills.map((skill, index) => {
                  return (
                    <section key={skill._id} className='skills-container'>
                      <div className={skill.level} >
                        {skill.curse}
                      </div>
                    </section>
                  )
                })
              }
            </section>
          </div>
        </section>
        <strong>Certificados:</strong>
        <section className="curriculum-certified">
          {
            this.state.url.map(url => {
              return (
                <div
                  key={url}
                  className="certified"
                  onClick={() => window.open(url)}
                >
                  <img src={url}/>
                </div>
              )
            })
          }
          <label className="new-img" htmlFor="image">
            <input type="file" id="image" onChange={(event) => this.handleSelectImagem(event) }/>
            <AddIcon fontSize={'large'} className="plus-icon"/>
          </label>
        </section>
      </section>
    )
  }
}

export default Curriculum
