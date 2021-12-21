import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Comeback from './images/Comeback.jpg';

const Button = styled.button`
  padding: 10px;
  border: 1px solid;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
`;

const ComebackImg = styled.img`
  width: 30px;
  height: 30px;
`;

const BottomWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  border: 1px solid;
  min-width: 600px;
  font-size: 14px;
  padding: 0 10px;
`;

const Status = styled.div`
  background-color: ${(p) => (p.isSuccess ? 'green' : 'red')};
  padding: 10px;
  margin-right: 10px;
`;

const Img = styled.img`
    height: calc(100% + 10px);
    width: 100px;
    right: 5px;
    top: -5px;
    position: absolute;
    box-shadow: 1px 1px 2px 3px #00000017;
`;

const Result = ({ result, reset }) => {
  const successRender = result.data.map((val) => (
    <ResultRow key={val.id}>
      <Status isSuccess>OK</Status>
      <div>{`${val.id} - ${val.name} - ${val.picture.width} x ${val.picture.height}`} </div>
      <Img src={val.picture.url}/>
    </ResultRow>
  ));

  const errorsRender = result.errors.map((val) => (
    <ResultRow key={val.id}>
      <Status>KO</Status>
      <div>{val.id}</div>
    </ResultRow>
  ));

  return (
    <div>
      <div>
        <Button onClick={reset}>
          <ComebackImg src={Comeback} alt='come back' />
        </Button>
      </div>
      <Navbar />
      <BottomWrapper>
        {successRender}
        {errorsRender}
      </BottomWrapper>
    </div>
  );
};

export default Result;
