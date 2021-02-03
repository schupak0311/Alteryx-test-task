import React, { useState } from 'react'
import { Container, TextField, Grid, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  dispatchSignInRequest,
} from '../../store/auth/actions'

export default () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <p>Login</p>
      <Grid container direction="column">
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(dispatchSignInRequest())}
        >
          Log in
        </Button>
      </Grid>
    </div>
  )
}
