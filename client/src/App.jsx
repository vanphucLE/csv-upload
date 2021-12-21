import React from 'react';
import styled from 'styled-components';

import UploadCsv from './UploadCsv';
import Result from './Result';

const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const Content = styled.div`
  padding: 15px;
`;

function App() {
  const [result, setResult] = React.useState();

  return (
    <div>
      <Header>Header</Header>
      <Content>
        {!result ? (
          <UploadCsv setResult={setResult} />
        ) : (
          <Result
            result={result}
            reset={() => {
              setResult(null);
            }}
          />
        )}
      </Content>
    </div>
  );
}

export default App;
