import React from 'react';
import Input from './firebase/Input';
import Container from '@material-ui/core/Container'
import Tabbar from './ui/Tabbar'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Typography from '@material-ui/core/Typography'

import Posts from './firebase/Posts'
import MyPosts from './firebase/MyPosts'
import AdminPosts from './firebase/AdminPosts' 

const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiAppBar: {
        // Name of the rule
        colorPrimary: {
            backgroundColor: "rgb(166,9,61)"
        }
      },

      MuiButton: {
        // Name of the rule
        containedPrimary: {
            backgroundColor: "rgb(166,9,61)",
            '&:hover': {
                backgroundColor: '#c90849',
                // Reset on mouse devices
                '@media (hover: none)': {
                  backgroundColor: 'rgb(166,9,61)',
                },
              },
        }

      },

      MuiOutlinedInput: {
        root: {
            position: 'relative',
            '& $notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                borderColor: 'rgb(166,9,61)',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
            },
            '&$focused $notchedOutline': {
                borderColor: 'rgb(166,9,61)',
                borderWidth: 1,
            },
        },
    },
    MuiFormLabel: {
        root: {
            '&$focused': {
                color: 'rgb(166,9,61)'
            }
        }
    }
    }
    
  });

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:null
        }
    }

    render(){
        return(
            <ThemeProvider theme={theme}>
                <Router>
                    <Tabbar callback={(currentUser)=>{this.setState({user:currentUser})}}/>

                    {/* {this.state.user&&
                        <Container maxWidth="md" style={{padding:"2rem"}}>
                            <Box pb={2}> 
                            <Input user={this.state.user}/>
                            </Box>   
                            <Posts user={this.state.user}/> 
                        </Container>
                    } */}

                        <Switch>
                            <Route path="/admin">
                                {this.state.user && this.state.user.admin ?
                                    <Container maxWidth="md" style={{padding:"2rem"}}>
                                        <AdminPosts user={this.state.user}/> 
                                    </Container>
                                    :
                                    <Redirect to="/" />
                                }
                            </Route>
                            <Route path="/myposts">
                                {this.state.user&&
                                    <Container maxWidth="md" style={{padding:"2rem"}}>
                                        <MyPosts user={this.state.user}/> 
                                    </Container>
                                }
                            </Route>
                            <Route path="/addupdate">
                                {this.state.user?
                                    <Container maxWidth="md" style={{padding:"2rem"}}>
                                        <Input user={this.state.user}/> 
                                    </Container>
                                    : 
                                    <Typography>Please login!</Typography>
                                }                                
                            </Route>

                            <Route path="/">
                                    <Container maxWidth="md" style={{padding:"2rem"}}>
                                        <Posts user={this.state.user}/> 
                                    </Container>
                            </Route>
                        </Switch>
                </Router>
            </ThemeProvider>
        )
    }
}

export default Main