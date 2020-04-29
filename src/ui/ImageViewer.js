import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
 
class ImageViewer extends Component {
    arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        // width: 30,
        // height: 30,
        cursor: 'pointer',
    };

    render() {
        
        return (
            <Carousel dynamicHeight useKeyboardArrows
            showThumbs = {false}
            statusFormatter = {()=>{}}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <IconButton onClick={onClickHandler} title={label} style={{ ...this.arrowStyles, left: 15 }}>
                        <ChevronLeftIcon fontSize="large"/>
                    </IconButton>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <IconButton onClick={onClickHandler} title={label} style={{ ...this.arrowStyles, right: 15 }}>
                        <ChevronRightIcon fontSize="large"/>
                    </IconButton>
                )
            }>
                {this.props.images.map((src, idx)=>{
                    return(
                        <div  key={idx} style={{height:"60vh", backgroundColor:"#FFFFFF", justifyContent:"center", padding:"1rem"}}> 
                            {/* {src.width>src.height
                            ?
                            <img src={src}></img>
                            :
                            <img style={{maxHeight:"30%"}}src={src}></img>
                            } */}
                            <img key={idx} src={src} style={{maxHeight:"95%", objectFit:"contain"}}></img>
                            
                        </div>
                    )
                })}
            </Carousel>
        );
    }
};

export default ImageViewer;