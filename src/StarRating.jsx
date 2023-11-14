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
const textStyle = {
    lineHeight: "1",
    margin: "0",
};
const star = {
    display: "block",
};
import { useState } from "react";
function StarRating({ maxRating = 5 }) {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);
    function handleHoverEnter(ix) {
         setRating(ix + 1);
    }
    function handleHoverLeave() {
        
       setRating(tempRating)
    }
    function handleClick(ix) {
      
   setTempRating(ix+1)
          
       
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

function Star({ onClick, full, onHoverEnter, onHoverLeave }) {
    return (
        <span
            style={star}
            onClick={onClick}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
        >
            {full ? (
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/star--v1.png"
                    alt="star--v1"
                />
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
