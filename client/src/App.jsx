import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { AppContext } from './appContext';
import UploadCsv from './UploadCsv';
import Loading from './Loading';

const API_URL = 'http://localhost:5000/upload';

const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const Content = styled.div`
  padding: 15px;
`;

function App() {
  const [isUploading, setIsUploading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState();

  const uploadFile = (csvFile) => {
    const formData = new FormData();
    formData.append('file', csvFile);

    setIsLoading(true);
    axios
      .post(API_URL, formData)
      .then((response) => {
        setIsLoading(false);
        setIsUploading(false);
        console.log(response);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <AppContext.Provider
      value={{
        isUploading,
      }}
    >
      {isLoading && <Loading />}
      <Header>Header</Header>
      <Content>
        {isUploading ? <UploadCsv uploadFile={uploadFile} /> : <div />}
      </Content>
    </AppContext.Provider>
  );
}

export default App;
