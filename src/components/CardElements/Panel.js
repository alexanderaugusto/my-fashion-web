import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: 20,
    height: '30%',
  },
});

export default function ActionsInExpansionPanelSummary({ body, expansionSumary, expansionDetails, expansive }) {
  const classes = useStyles();

  if (expansive)
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <div onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}>
              {expansionSumary}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ width: "100%"}}>
              {expansionDetails}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )

  else
    return (
      <Card className={classes.root}>
        <CardContent>
          {body}
        </CardContent>
      </Card>
    )
}