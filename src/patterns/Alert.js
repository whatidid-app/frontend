import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { Box, Flex } from '@rebass/grid/emotion';
import { EventEmitter } from '../lib';

const Animate = keyframes`
  100% {
    top: 100px;
  }
`;

const AlertBox = styled(Box)`
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-name: ${Animate};
  position: absolute;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -500px;
  max-width: 425px;
  min-width: 300px;
  padding: 12px;
  font-weight: 500;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 14px;
  ${props =>
    props.type === 'error' &&
    `
    background-color: #fddde1;
    box-shadow: 0px 2px 2px rgba(171, 9, 30, 0.25);
    color: #ab091e;
    `}
`;

const IconError = () => (
  <svg
    css={{ marginRight: '5px' }}
    width="16"
    height="16"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5C10 6.32608 9.47322 7.59785 8.53553 8.53553C7.59785 9.47322 6.32608 10 5 10C3.67392 10 2.40215 9.47322 1.46447 8.53553C0.526784 7.59785 0 6.32608 0 5H0ZM8.16 2.55L2.545 8.155C3.31436 8.75276 4.27543 9.04918 5.24783 8.98861C6.22023 8.92804 7.1371 8.51465 7.82633 7.82603C8.51556 7.13742 8.92977 6.22092 8.9912 5.24858C9.05264 4.27623 8.75708 3.31489 8.16 2.545V2.55ZM7.455 1.84C6.68558 1.2383 5.72259 0.938926 4.74764 0.998335C3.77269 1.05774 2.85317 1.47183 2.1625 2.1625C1.47183 2.85317 1.05774 3.77269 0.998335 4.74764C0.938926 5.72259 1.2383 6.68558 1.84 7.455L7.455 1.84V1.84Z"
        fill="#AB091E"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function Alert(props) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    let timeout;
    const emitter = EventEmitter.subscribe('alert', alert => {
      setAlerts([...alerts, alert]);

      timeout = setTimeout(
        () => {
          const index = alerts.indexOf(alert);
          setAlerts(alerts.filter((_, i) => i !== index));
        },
        alert.timeout ? alert.timeout : 5000
      );
    });

    return () => {
      clearTimeout(timeout);
      emitter();
    };
  }, []);

  return alerts.map((alert, index) => (
    <AlertBox type={alert.type} key={index} {...props}>
      <Flex alignItems="center">
        {alert.type === 'error' && <IconError />}
        {alert.message}
      </Flex>
    </AlertBox>
  ));
}
