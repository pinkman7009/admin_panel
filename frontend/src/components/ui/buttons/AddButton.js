import React from 'react'
import {BsPlusLg} from "react-icons/bs"
import "../../../styles/Buttons.css"

const AddButton = ({resource}) => {
    return (
        <button className="add-button">
        <BsPlusLg/>
        Add {resource}
    </button>
    )
}

export default AddButton
