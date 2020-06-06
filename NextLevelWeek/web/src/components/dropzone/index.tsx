import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.css';
import { FiUpload } from "react-icons/fi";

interface Props {
  onFileUploaded: (file: File) => void;
}

const MyDropzone: React.FC<Props> = ({ onFileUploaded }) => {

  const [selectedFileUrl, setselectedFileUrl] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setselectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        isDragActive ?
          <p>Agora solte a imagem</p> :
          selectedFileUrl ?
            <img src={selectedFileUrl} alt="Point thumbnail" /> :
            <p><FiUpload />Arraste aqui a imagem do estabelecimento</p>
      }

    </div>
  )
}

export default MyDropzone;