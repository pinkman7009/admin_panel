import React from 'react'
import "../../../styles/Categories.css"
import CategoriesList from './CategoriesList'
import AddButton from '../buttons/AddButton'

const CategoriesSection = () => {
    return (
        <div className="categories-container">
            <div className="categories-list">
                <div className="categories-list-header">
                <h3>Categories</h3>
                <AddButton resource="Category"/>
                </div>

                <CategoriesList/>
            </div>
        </div>
    )
}

export default CategoriesSection
