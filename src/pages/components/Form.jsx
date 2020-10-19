import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import AddIcon from '@material-ui/icons/Add'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import api from '../../services/api'

export function FormDialog (user) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [inputFields, setInputFields] = useState([
    { curse: '', level: '' }
  ])

  const levels = [{ level: 'iniciante' }, { level: 'intermediario' }, { level: 'avançado' }]

  const handleClickOpen = () => {
    setOpen(true)
    if (user) {
      setName(user.user.name)
      setAbout(user.user.about)
      setInputFields(user.user.skills)
    }
  }

  const handleClose = () => {
    setOpen(false)
    window.location.reload(true)
  }

  const handleAddFields = () => {
    const values = [...inputFields]
    values.push({ curse: '', level: '' })
    setInputFields(values)
  }

  const handleRemoveFields = i => {
    const values = [...inputFields]
    if (inputFields.length === 1) return
    values.splice(i, 1)
    setInputFields(values)
  }

  const handleInputChange = (index, event, key) => {
    const values = [...inputFields]
    if (key === 'curse') {
      values[index].curse = event.target.value
    } else {
      values[index].level = event.target.textContent
    }
    setInputFields(values)
  }

  const handleSubmit = () => {
    if (!user) {
      const skill = [...inputFields]
      const data = JSON.stringify({ name, about, skill })
      api.post('/api/customer', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(alert('Sucesso!'))
    } else {
      const skill = [...inputFields]
      const data = JSON.stringify({ name, about, skill, _id: user.user.id })
      api.put('/api/customer', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(handleClose)
    }
  }

  return (
    <div className="formDialog">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            onChange={event => setName(event.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            fullWidth
          />

          <TextareaAutosize
            value={about}
            onChange={event => setAbout(event.target.value)}
            rowsMin={3}
            className="about"
            aria-label="empty textarea"
            placeholder="About"
          />

          {inputFields.map((inputField, i) => (
            <section key={`${inputField}~${i}`}>
              <div className="form-group-skills">
                <TextField
                  className="level"
                  value={inputFields[i].curse}
                  margin="dense"
                  id="name"
                  label="Skill"
                  onChange={event => handleInputChange(i, event, 'curse')}
                />

                <Autocomplete
                  className="level"
                  id="debug"
                  defaultValue={inputFields[i].level}
                  inputValue={inputFields[i].level}
                  options={levels}
                  getOptionLabel={(option) => option.level}
                  debug
                  onChange={event => handleInputChange(i, event, 'level')}
                  renderInput={(params) => <TextField {...params} value={inputFields[i].level} label="Nivel" margin="dense" />}
                />
                <Button
                  onClick={() => handleRemoveFields(i)}
                  className="btn btn-link"
                  type="button"
                >
                  <DeleteOutlineIcon/>
                </Button>
                <Button
                  onClick={() => handleAddFields()}
                  className="btn btn-link"
                  type="button"
                >
                  <AddIcon/>
                </Button>
              </div>
            </section>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
