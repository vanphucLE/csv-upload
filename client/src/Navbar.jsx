import React from 'react';
import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled(FlexWrapper)`
  padding: 10px 15px;
  justify-content: space-around;

  border: 1px solid;
  min-width: 300px;
`;

const StepNumber = styled(FlexWrapper)`
  height: 20px;
  width: 20px;
  border: 1px solid;
  border-radius: 50%;
  margin-right: 5px;

  background-color: ${(p) => p.isActive && `red; `};
`;

const UploadCsv = ({ isUploading }) => {
  return (
    <FlexWrapper>
      <ContentWrapper>
        <FlexWrapper>
          <StepNumber isActive={isUploading}>1</StepNumber>
          <div>Products</div>
        </FlexWrapper>
        <FlexWrapper>
          <StepNumber isActive={!isUploading}>2</StepNumber>
          <div>Results</div>
        </FlexWrapper>
      </ContentWrapper>
    </FlexWrapper>
  );
};

export default UploadCsv;
