import React from 'react';
import config from "./config" 
import firebase from "@firebase/app"
import "@firebase/firestore";
import "@firebase/auth"
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import {withRouter} from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props)
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }

        this.state={
            listOfUsers:[],
            currentUser:null,
            anchorEl:null
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this); 
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.collectionRef = firebase.firestore().collection("users");
        this.blankUser = {name:"",firstName:"",uid:""}
        this.userTemplate = {...this.blankUser}
    };

    componentDidMount(){
        console.log(process.env)
        firebase.auth().onAuthStateChanged((user) => {
            let users;
            if (user) {
            // User is signed in.

                this.collectionRef
                    .get()
                    .then(snap => {
                    users = {}
                    snap.docs.map(d => users[d.id]=d.data()) 
                    //this.props.callback(users, user)
                    console.log(user.uid)
                    console.log(users)
                    console.log(users[user.uid])
                    this.setState({
                        currentUser: users[user.uid],
                        //listOfUsers: users
                    })
                    this.props.callback(users[user.uid])
                });

                
            

            } else {
            // No user is signed in.
                this.collectionRef
                    .get()
                    .then(snap => {                     
                        users= snap.docs.map(d => d.data())
                        console.log(users)
                        //this.props.callback(users, user)
                        this.setState({
                            listOfUsers: users
                        })
                    });
                    
                    
            }
        });
    }   

    logout() {
        firebase.auth().signOut()
          .then(() => {
            this.setState({
              anchorEl: null,
              currentUser: null
            });
            window.location.reload()
          });
          
    }

    async login(){
        const result = await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider());
        var user=result.user;
        
        this.userTemplate.name=user.displayName;
        this.userTemplate.firstName= user.displayName.split(" ")[0];
        this.userTemplate.uid=user.uid;
        this.userTemplate.email=user.email
        console.log(this.userTemplate)
        if(!this.state.listOfUsers.some(item => item.uid === this.userTemplate.uid)){
            await this.collectionRef.doc(user.uid).set(this.userTemplate);
        } else{
            console.log("why")
        }
    }

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget});
      };
    
    handleClose = () => {
        this.setState({anchorEl: null});
    };

    redirect(path,history){
        if(history.location.pathname!==path){
          history.push(path)
        }
    }



    render(){
        const { history } = this.props
        return(
            <div>
            {this.state.currentUser
                ?         
                <div>
                <Tab color="inherit" label="My Account" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenu}/>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    
                >
                    <MenuItem disabled>{this.state.currentUser.firstName}</MenuItem>
                    <MenuItem onClick={()=>{this.handleClose(); this.redirect('/myposts',history)}}>My Posts</MenuItem>
                    {this.state.currentUser.admin &&
                        <MenuItem onClick={()=>{this.handleClose(); this.redirect('/admin',history)}}>Admin</MenuItem>
                    }
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>                    
              </div>
                :
                    <Tab color="inherit" label="Login" onClick={this.login}/>
            }
            </div>
        )
    }
}

export default withRouter(Login);