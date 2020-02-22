import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { listStatus } from '../../redux/actions/orderAction'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))

export default function OrderStep({ currentStatus }) {
  const classes = useStyles();

  // Redux
  const { status } = useSelector(state => state.orderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listStatus())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Stepper activeStep={currentStatus - 1} alternativeLabel nonLinear>
        {status.map((value) => (
          <Step key={value.id}>
            <StepLabel>{value.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}