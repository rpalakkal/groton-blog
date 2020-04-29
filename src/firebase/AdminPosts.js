import React from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import Button from '@material-ui/core/Button'
import SimpleCard from '../ui/SimpleCard'
import Grid from '@material-ui/core/Grid'
import ImageViewer from '../ui/ImageViewer'
import DeleteConfirm from '../ui/DeleteConfirm'
import AdminInput from './AdminInput'

class AdminPosts extends React.Component{

    constructor(props){
        super(props)
        this.state={
            records:[],
            open:false
        }
    }

    componentDidMount(){
        this.collectionRef = firebase.firestore().collection("postsToBeApproved");
        this.storageRef = firebase.storage().ref();
        this.sortedCollection = this.collectionRef.orderBy("timestamp", "desc")
        this.sortedCollection.onSnapshot(snap => {
            this.setState({
                records: snap.docs.map(d => [d.id, d.data()])
            }) 
        }); 
    }

    deleteRecord = () => {
        this.collectionRef.doc(this.state.clicked).delete().then(()=>{
            this.setState({
                open:false,
                clicked:null
            }) 
        })
    }

    approveRecord = (record) => {
        firebase.firestore().collection('posts').doc(record[0]).set(record[1]).then(()=>{
            this.collectionRef.doc(record[0]).delete()
        })
    }

    updateRecord = (value, idx, field) => {
        let recordCopy = this.state.records.slice();
        recordCopy[idx][1][field]=value;
        console.log(recordCopy)
        this.setState({records:recordCopy})
    }

    render(){
        return(
            <Grid container direction="column" spacing="3">
                <Grid item> 
                    <AdminInput/>
                </Grid>   
            {this.state.records.map((record, idx)=> 
                (
                    <Grid item key={idx}>
                <SimpleCard>
                    <Grid container direction="column" spacing="3">
                    
                        <Grid item>
                            <TextField id="outlined-basic" 
                            label="Name:" 
                            variant="outlined" 
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={record[1].author}
                            onChange={(e) => {this.updateRecord(e.target.value, idx, "author")}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" 
                            label="Name:" 
                            variant="outlined" 
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={record[1].email}
                            onChange={(e) => {this.updateRecord(e.target.value, idx, "email")}}
                            />
                        </Grid>
                        <Grid item>
                        {record[1].files &&
                            <ImageViewer images={record[1].files}/>
                        }
                        {/* <img src={record[1].file} style={{maxWidth:"100%", height:"auto"}} alt=""></img>  */}
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-multiline"
                                label="Caption"
                                multiline
                                rowsMax={5}
                                rows={2}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={record[1].title}
                                onChange={(e) => {this.updateRecord(e.target.value, idx, "title")}}
                            />
                        </Grid>
                        <Grid justify="space-between" item>
                            <Button onClick={()=>this.setState({open:true, clicked:record[0]})}>Delete</Button>
                            <Button onClick={()=>{this.approveRecord(record)}}>Approve</Button>
                        </Grid>
                        
                    </Grid>
                </SimpleCard>
                </Grid>
            ))}

            {!this.state.records.length && "No more posts to approve!"}

                <DeleteConfirm open={this.state.open} callback={(x)=>{this.setState({open:x})}} delete={this.deleteRecord}/>
            </Grid>
        )
    }
   
}

export default AdminPosts;