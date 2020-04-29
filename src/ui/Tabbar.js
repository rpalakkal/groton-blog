import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Login from '../firebase/Login'
import Link from '@material-ui/core/Link'
import Tab from '@material-ui/core/Tab';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function redirect(path,history){
  if(history.location.pathname!==path){
    history.push(path)
  }
}

export default function ButtonAppBar(props) {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid
            justify="space-around" // Add it here :)
            alignItems="center"
            container 
          >
            <Grid item>
              <Link href="https://groton2021.com" className={classes.title} variant="h6" type="title" color="inherit">
              {/* <Typography className={classes.title} variant="h6" type="title" color=""> */}
                Groton Online Lounge
              {/* </Typography> */}
              </Link>

            </Grid>

            <Grid item>
              <Tab label="Student Updates" onClick={()=>{redirect('/',  history)}}/>
              <Tab label="Submit an Update"  onClick={()=>{redirect('/addupdate',history)}}/>
            </Grid>

            <Grid item>
              <div>
                <Login callback={props.callback}></Login>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
