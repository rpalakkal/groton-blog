import React from 'react';
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    height:'100%'
};

const img = {
    maxHeight:"100%", 
    objectFit:"scale-down"
};

function processThumbs(listOfFiles){
    return (<div class="thumbsContainer">
        {listOfFiles.map(file => (
            <div style={thumb}>
            <div style={thumbInner}>
                <img
                src={URL.createObjectURL(file)}
                style={img}
                />
            </div>
            </div>
        ))}
    </div>)
}

// export default function Thumbnails(props){
//     const {thumbs, setThumbs} = useState([])
//     useEffect(()=>
//         // Update the document title using the browser API
//         setThumbs(processThumbs(props.files))
// , [thumbs]);

//     return(
//     <aside style={thumbsContainer}>
//         {thumbs}
//     </aside>
        
//     )
// }

class Thumbnails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            processedThumbs:[]
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps!==this.props){
            const thumbs = processThumbs(this.props.files)
            this.setState({processedThumbs: thumbs})
            
        }
        
    }

    render(){
        return(
            <div>
                {this.state.processedThumbs}
            </div>
            
        )
    }
}

export default Thumbnails