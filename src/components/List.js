import React from "react";
import clouds from "../assets/clouds.gif";
import plane from "../assets/plane.png";
import "../style/List.css";

function List({ waiting, animating }) {
  const style = {
    backgroundImage: `url(${clouds})`,
  };

  return (
    <div>
      {animating ? (
        <div
          className="container relative overflow-hidden w-full h-screen bg-blue-400 bg-no-repeat bg-center bg-cover"
          style={style}
        >
          <div className="runway">
            <img src={plane} alt="" className={`airplane animate`} />
          </div>
        </div>
      ) : waiting ? (
        <div>Veriler geldi</div>
      ) : (
        <div
          className="container relative overflow-hidden w-full h-screen bg-blue-400 bg-no-repeat bg-center bg-cover"
          style={style}
        >
          <div className="runway">
            <img src={plane} alt="" className={`airplane `} />
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
