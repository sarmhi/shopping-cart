import React, { CSSProperties } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface Props {
  rating: number;
  onClick: (i: number) => void;
  style: CSSProperties | undefined;
}
const Rating = ({ rating, onClick, style }: Props) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
