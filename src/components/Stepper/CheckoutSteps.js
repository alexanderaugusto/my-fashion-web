import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Check from '@material-ui/icons/Check'
import StepConnector from '@material-ui/core/StepConnector'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import PaymentIcon from '@material-ui/icons/Payment'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
})

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    '& $line': {
      backgroundColor: "#fff"
    },
  },
  completed: {
    '& $line': {
      backgroundColor: "#fff"
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#ccc',
    borderRadius: 1,
  }
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: 'rgba(0, 153, 204, 1)',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#fff'
  },
  completed: {
    backgroundColor: '#fff'
  },
})

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocalOfferIcon />,
    2: <PaymentIcon />,
    3: <AssignmentTurnedInIcon />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
}

export default function CheckoutSteps({ step }) {
  return (
    <div>
      <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}
        style={{ backgroundColor: 'transparent', marginTop: -20, marginBottom: -20 }}>
        <Step>
          <StepLabel StepIconComponent={ColorlibStepIcon}>Escolha</StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={ColorlibStepIcon}>Pagamento</StepLabel>
        </Step>
        <Step >
          <StepLabel StepIconComponent={ColorlibStepIcon}>Confirmação</StepLabel>
        </Step>
      </Stepper>
    </div>
  )
}