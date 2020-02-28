import React from "react"
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch } from "react-redux"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertComponent({ type, message }) {
  // Redux
  const dispatch = useDispatch()

  return (
    <Snackbar open={true} autoHideDuration={6000} onClose={() => dispatch({ type: "CLOSE_ALERT", payload: {} })}>
      <Alert severity={type} onClose={() => dispatch({ type: "CLOSE_ALERT", payload: {} })}>
        {message}
      </Alert>
    </Snackbar>
  )
}