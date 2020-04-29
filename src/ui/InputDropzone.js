import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import loadImage from 'blueimp-load-image';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

// async function imageProcess(img){

//   loadImage(img, async (canvas) => {
//       canvas.toBlob(async (blob)=>{
//           let currentFiles = files
//           currentFiles.push(URL.createObjectURL(blob))
//           setFiles(currentFiles)
//           console.log(files)
//       },'image/jpeg');
          
//   }, {orientation: true, canvas: false, maxHeight:1500})
// }

export default function InputDropzone(props) {
  async function imageProcess(imgFiles){
    let tempFiles = [];
    const process = imgFiles.map((img, idx)=>
      loadImage(img, async (canvas) => {
          await canvas.toBlob(async (blob)=>{
              tempFiles.push(blob)
              if(idx===imgFiles.length-1){
                setFiles(tempFiles)
                props.callback(tempFiles)
                console.log(tempFiles)
              }
              
          },'image/jpeg');
              
      }, {orientation: true, canvas: false, maxHeight: 700})
    )
    // Promise.all(process).then(()=>{setFiles(tempFiles); console.log(tempFiles)})
    
  }

  const [files, setFiles] = useState([]);
  const {getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      imageProcess(acceptedFiles)
      console.log(files)
      
      
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone', style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}