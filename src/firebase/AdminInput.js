import React from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import Button from '@material-ui/core/Button'
import SimpleCard from '../ui/SimpleCard'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import InputDropzone from '../ui/InputDropzone'
import Thumbnails from '../ui/Thumbnails';
import AlertBox from '../ui/AlertBox'

class AdminInput extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            files:[],
            open:false,
            inputCaption:"",
            nameCaption:"",
            emailCaption:"",
        })
        this.emptyRecord = {title:"", date:""};
        this.record = {...this.emptyRecord};
        this.uploadedImages = [];
        this.submit=this.submit.bind(this);
    }

    getFormattedDate = (timestamp) => {
        var date = timestamp.toDate()
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    componentDidMount(){
        this.collectionRef = firebase.firestore().collection("posts");
        this.storageRef = firebase.storage().ref();
        this.imagesRef = this.storageRef.child('images');
    }

    _uploadFiles = () => {
        console.log(1)
        return Promise.all(
            [...this.state.files].map(async (file, idx)=>{
                console.log(file)
                await this.imagesRef.child(Date.now()+idx+'.jpeg').put(file).then(async snapshot => {
                    console.log(snapshot)
                    await snapshot.ref.getDownloadURL().then(url => {
                        console.log(url)
                        this.uploadedImages.push(url)
                    })
                })
            })
        )
    }

    async submit(){
        if(!(this.state.inputCaption&&this.state.nameCaption&&this.state.emailCaption)){
            this.setState({open:true})
            return false
        }
        if(this.state.files && this.state.files.length>0){
            await this._uploadFiles().then(async() => {
                console.log(this.uploadedImages)
                this.record.files = this.uploadedImages;
                this.record.timestamp = firebase.firestore.Timestamp.now();
                if(this.state.inputCaption){
                    this.record.title = this.state.inputCaption
                } 
                this.record.date = this.getFormattedDate(firebase.firestore.Timestamp.now())
                this.record.author = this.state.nameCaption;
                this.record.email = this.state.emailCaption;
                //this.record.uid = this.props.user.uid;
                await this.collectionRef.add(this.record).then((docRef)=>{
                    // firebase.firestore().collection('users').doc(this.props.user.uid).update( {
                    //     posts: firebase.firestore.FieldValue.arrayUnion(docRef)
                    //  }).then(()=>{
                    //     this.record={...this.emptyRecord};
                    
                    //     this.setState({inputCaption:""})
                    //     console.log(docRef.id)
                    //     window.location.reload()
                    //  })
                    this.record={...this.emptyRecord};
                    this.uploadedImages =[];
                    this.setState({
                        inputCaption:"",
                        nameCaption:"",
                        emailCaption:"",
                        files:[]
                    })
                    console.log(docRef.id)
                    
                });
            })
        } else{
            this.record.timestamp = firebase.firestore.Timestamp.now();
            this.record.title = this.state.inputCaption
            this.record.date = this.getFormattedDate(firebase.firestore.Timestamp.now())
            this.record.author = this.state.nameCaption;
            this.record.email = this.state.emailCaption;
            //this.record.uid = this.props.user.uid;
            await this.collectionRef.add(this.record).then((docRef)=>{
                // firebase.firestore().collection('users').doc(this.props.user.uid).update( {
                //     posts: firebase.firestore.FieldValue.arrayUnion(docRef)
                //  }).then(()=>{
                //     this.record={...this.emptyRecord};
                
                //     this.setState({inputCaption:""})
                //     console.log(docRef.id)
                //     window.location.reload()
                //  })
                this.record={...this.emptyRecord};
                    this.uploadedImages=[];
                    this.setState({
                        inputCaption:"",
                        nameCaption:"",
                        emailCaption:"",
                        files:[]
                    })
                    console.log(docRef.id)
                
            });
        }
    }

    _addFile = (e) => {
        let combinedFiles = this.state.files.concat(e)
        this.setState({files:combinedFiles})
    }


    render(){
        return(
            <SimpleCard>
                <Grid container direction="column" spacing="2">
                    <Grid item>
                        <Typography variant="h5" align="left">New Post:</Typography>
                    </Grid>
                    <Grid item alignItems="flex-start">
                        <TextField id="outlined-basic" 
                        label="Name:" 
                        variant="outlined" 
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={this.state.nameCaption}
                        onChange={(e) => this.setState({nameCaption:e.target.value})}
                        />
                    </Grid>
                    <Grid item alignItems="flex-start">
                        <TextField id="outlined-basic" 
                        label="User Email:" 
                        variant="outlined" 
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={this.state.emailCaption}
                        onChange={(e) => this.setState({emailCaption:e.target.value})}
                        />
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
                        value={this.state.inputCaption}
                        onChange={(e) => this.setState({inputCaption:e.target.value})}
                    />
                    </Grid>

                    <Grid item>
                    {/* <input
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={this._addFile}
                        />
                        <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                        </label>  */}
                    <InputDropzone callback={this._addFile}/>
                    <Thumbnails files={this.state.files}/>
                    </Grid>
                    
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.submit}>
                            Submit
                        </Button>
                    </Grid>
                    
                </Grid>
                <AlertBox open={this.state.open} callback={(x)=>{this.setState({open:x})}}>Make sure you have entered name, caption, and email!</AlertBox>
            </SimpleCard>
        )
    }
   
}

export default AdminInput;