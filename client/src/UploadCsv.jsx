import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Loading from './Loading';

const API_URL = 'http://localhost:5000/upload';

const TopWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px;
  border: 1px solid;
  padding: 5px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const DropZone = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);

  padding: 20px;
  width: 80%;
  min-height: 300px;
`;

const UploadCsv = ({ setResult }) => {
  const [isLoading, setIsLoading] = React.useState();
  const [csvFile, setCsvFile] = React.useState();

  const uploadFile = () => {
    if(!csvFile){
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    setIsLoading(true);
    axios
      .post(API_URL, formData)
      .then((response) => {
        setIsLoading(false);
        setResult(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ([file]) => {
      setCsvFile(file);
    },
    multiple: false,
    accept: '.csv',
  });

  return (
    <div>
      {isLoading && <Loading />}
      <TopWrapper>
        <Button onClick={uploadFile} disabled={!csvFile}>Validate</Button>
      </TopWrapper>
      <Navbar isUploading />
      <BottomWrapper>
        <DropZone {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Upload CSV</p>
          <i>Drag csv here, or click to select files</i>
        </DropZone>
      </BottomWrapper>
    </div>
  );
};

export default UploadCsv;
