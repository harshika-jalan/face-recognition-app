import React from 'react';

const FaceRecognition = ( {imgUrl }) => {
  return (
    <div className = 'center'>
      <img alt = "image" src = {imgUrl} />
    </div>
  );
}
export default FaceRecognition;
