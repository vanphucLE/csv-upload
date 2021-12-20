import React from 'react';
import styled from 'styled-components';

import LoadingIcon from './images/Loading_image.gif';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: #ffff;
  z-index: 10;
  top: 0px;
  left: 0px;
`;

const Img = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const ScreenLoader = () => {
  return (
    <Wrapper>
      <Img src={LoadingIcon} alt='' />
    </Wrapper>
  );
};

export default ScreenLoader;
