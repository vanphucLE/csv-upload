import React from 'react';
import styled from 'styled-components';
import { AppContext } from './appContext';
import UploadCsv from './UploadCsv';

const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const Content = styled.div`
  padding: 15px;
`;

function App() {
  const [csvFile, setCsvFile] = React.useState();

  return (
    <AppContext.Provider
      value={{
        csvFile,
        setCsvFile,
      }}
    >
      <Header>Header</Header>
      <Content>{!csvFile ? <UploadCsv /> : <div />}</Content>
    </AppContext.Provider>
  );
}

export default App;
