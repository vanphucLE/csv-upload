import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useDropzone } from 'react-dropzone';
import { useAppContext } from './appContext';

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

const UploadCsv = () => {
  const { setCsvFile } = useAppContext();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ([file]) => {
      setCsvFile(file);
    },
    multiple: false,
    accept: '.csv',
  });

  return (
    <div>
      <TopWrapper>
        <Button>Validate</Button>
      </TopWrapper>
      <Navbar />
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
