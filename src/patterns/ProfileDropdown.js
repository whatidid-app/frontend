import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import ProfileImage from './ProfileImage';
import useOnClickOutside from 'use-onclickoutside';
import { useMedia } from 'the-platform';
import { Link } from '.';

const ActiveArea = styled.button`
  position: relative;
  background: none;
  border: none;
  height: auto;
  width: auto;
  outline: 0;

  &:hover,
  &:focus {
    img {
      border: 2px solid #74b0fd;
    }
  }
`;

const DropDown = styled.div`
  top: 60px;
  right: 5px;
  width: 100px;
  position: absolute;
  text-align: left;
  box-shadow: -1px 0px 4px 1px rgba(100, 122, 203, 0.25);
  background-color: #ffffff;
  border-radius: 2px;

  hr {
    padding: 0;
    margin: 0;
    border: 0.5px solid #e4e7eb;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul li {
    padding: 8px 10px;
  }

  ul li,
  a {
    &:hover,
    &:focus,
    &:active {
      cursor: pointer;
      background-color: #e4e7eb;
    }
  }
  a {
    text-decoration: none;
  }
`;

export default function ProfileDropdown({ image }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));
  const small = useMedia({ minWidth: 550 });

  return (
    <ActiveArea onClick={() => setOpen(!open)}>
      {open && (
        <DropDown ref={ref}>
          <ul>
            {!small && (
              <>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/team">
                  <li>Team</li>
                </Link>
                <Link to="/settings">
                  <li>Settings</li>
                </Link>
              </>
            )}
            <Link to="/">
              <li>Switch Teams</li>
            </Link>
            <hr />
            <Link to="/logout">
              <li>Logout</li>
            </Link>
          </ul>
        </DropDown>
      )}
      <ProfileImage tabIndex={0} alt="profile image" src={image} />
    </ActiveArea>
  );
}
