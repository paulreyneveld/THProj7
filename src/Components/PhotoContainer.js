import React from 'react';
import Photo from './Photo'

const PhotoContainer = (props) => {
    const results = props.data;
    let images = results.map(image => 
        <Photo 
            key={image.id} 
            url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} 
        />
    );
    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>{images}</ul>
        </div>
    );
}

export default PhotoContainer;