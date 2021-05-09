import React from 'react';

const LandingPage = () => {

  const svgCount = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="page-wrap">
      {svgCount.map(e => <DisplaySVG svgIndex={e} key={e} />)}
    </div>
  )
}

const DisplaySVG = props => {

  const { svgIndex } = props;

  return (
    <img src={`svg/bg-svg/svg${svgIndex}.svg`}
      alt="bg-svg"
      className={`bg-svg${svgIndex}`}
    />
  )
}

export default LandingPage;