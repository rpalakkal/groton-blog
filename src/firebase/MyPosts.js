import React from 'react';
import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import SimpleCard from '../ui/SimpleCard'
import Grid from '@material-ui/core/Grid'
import ImageViewer from '../ui/ImageViewer'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

class MyPosts extends React.Component{

    constructor(props){
        super(props)
        this.state={
            records:[]
        }
    }

    componentDidMount(){
        this.collectionRef = firebase.firestore().collection("posts").where("email","==",this.props.user.email)
        this.storageRef = firebase.storage().ref();
        this.imagesRef = this.storageRef.child('images');
        this.sortedCollection = this.collectionRef.orderBy("timestamp", "desc")
        this.unsubscribe = this.sortedCollection.get().then(snap => {
            this.setState({
                records: snap.docs.map(d => [d.id, d.data()])
            }) 
        }); 
    }

    render(){
        return(
            <Grid container direction="column" spacing="3">
            {this.state.records.map((record, idx)=> 
                (
                    <Grid item key={idx}>
                <SimpleCard>
                    <Grid container direction="column" spacing="3">
                    
                        <Grid item>
                        <Typography align="left" variant="h5">
                        <Box fontWeight="fontWeightBold" m={1}>
                            {record[1].author}
                        </Box>
                        </Typography>
                        {record[1].files &&
                            <ImageViewer images={record[1].files}/>
                        }
                        {/* <img src={record[1].file} style={{maxWidth:"100%", height:"auto"}} alt=""></img>  */}
                        </Grid>
                        <Grid item>
                            <Typography style={{fontSize:"1.2rem"}}>{record[1].title}</Typography>
                        </Grid>
                        
                    </Grid>
                </SimpleCard>
                </Grid>
            ))}
            </Grid>
        )
    }
   
}

export default MyPosts;