import React, { Component } from 'react';
import moment from '../node_modules/moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = theme => ({
  input: {
    display: 'none',
  },
});


class Suggested extends Component {

  constructor(props) {
      super(props);

      this.state = {
        events: props.events
      };
  }

  componentWillReceiveProps(props) {
    this.setState({events: props.events})
  }

  getDate(datetime) {
    return moment(datetime).format('dddd, MMM Do');
  }

  getTime(datetime) {
    return moment(datetime).format('h:mm a');
  }

  onEventSave = (evt, eventObj) => {
    this.props.onSave(eventObj);
  }

  onEventUnsave = (evt, eventObj) => {
    this.props.onUnsave(eventObj);
  }

  render() {
    let events = this.state.events.map((event, i) =>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i} >
        <div className="event">
          <img src={`./${event.image}`} alt="test" />

          <div className="event-tag">
            <Chip label={event.tag} color="secondary" />
          </div>

          <div className="event-text">
            <Link className="name" to={'/event/' + event.name}>{event.name}</Link>
            <div className="location">@ {event.location}</div>

            <div className="day">{this.getDate(event.start)}</div>
            <div className="time">{this.getTime(event.start)}</div>
          </div>

          <div className="event-save">
            {!event.saved &&
              <Button variant="contained" color="primary" className={styles.button} onClick={ (e) => this.onEventSave(e, event)}>
                Save
              </Button>}

            {event.saved &&
              <Button variant="contained" color="secondary" className={styles.button} onClick={ (e) => this.onEventUnsave(e, event)}>
                Unsave
              </Button>}
          </div>
        </div>
      </Grid>
    )

    return (
      <div>
        <Grid container spacing={24}>
          { events }
        </Grid>

      </div>
    );
  }
}


export default withStyles(styles)(Suggested);