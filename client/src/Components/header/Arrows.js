/** @jsxRuntime classic */
/** @jsx jsx */
import { memo } from 'react'
import { css, jsx } from '@emotion/react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Arrows = ({ direction, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      css={css`
        display: flex;
        position: absolute;
        top: 43%;
        ${direction === 'right' ? `right: 25px` : `left: 25px`};
        justify-content: center;
        cursor: pointer;
        align-items: center;
        transition: transform ease-in 0.1s;
  
        &:hover {
          transform: scale(1.1);
        }
  
        img {
          transform: translateX(${direction === 'left' ? '-2' : '2'}px);
  
          &:focus {
            outline: 0;
          }
        }
      `}
    >
      {direction === 'right' ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
    </div>
  )
}

export default memo(Arrows)
