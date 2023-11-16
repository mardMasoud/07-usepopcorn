const container = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    // backgroundColor: "red",
    // width: "500px",
    // height: "230px",
};
const styleStar = {
    display: "flex",

    gap: "4px",
};

import { useState } from "react";
function StarRating({ maxRating = 5, color = "#fcc419", size = 30 }) {
    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size / 1.5}px`,
    };
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);
    function handleHoverEnter(ix) {
        setRating(ix + 1);
    }
    function handleHoverLeave() {
        setRating(tempRating);
    }
    function handleClick(ix) {
        setTempRating(ix + 1);
    }
    return (
        <div style={container}>
            <div style={styleStar}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        rating={rating}
                        key={i}
                        onHoverEnter={() => handleHoverEnter(i)}
                        onHoverLeave={() => handleHoverLeave(i)}
                        onClick={() => handleClick(i)}
                        full={i < rating}
                    />
                ))}
            </div>
            <p style={textStyle}>{rating}</p>
        </div>
    );
}

function Star({ onClick, full, onHoverEnter, onHoverLeave, color, size }) {
    const star = {
        display: "block",
        color,
        fontSize: `${size / 1.5}px`,
    };
    return (
        <span
            style={star}
            onClick={onClick}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
        >
            {full ? (
               <svg
               xmlns="http://www.w3.org/2000/svg"
               
               width="50"
               height="50"
               viewBox="0 0 172 172"
               style=" fill:#26e07f;"
           >
              
           </svg>
           
            ) : (
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/star--v1.png"
                    alt="star--v1"
                />
            )}
        </span>
    );
}
export default StarRating;

