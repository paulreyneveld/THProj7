import React from 'react';

const Photo = (props) => {
    return (
        <li> 
            <img src={props.url} alt="File not found"/>
        </li>
    );
}
export default Photo;