import { useState, useEffect } from "react"

export default function TriviaMenu({ handleCreate }){

    // API URL for obtaining categories
    const categoryUrl = 'https://opentdb.com/api_category.php'
    // React state storing the array of categories for drop-down menu
    const [categories, setCategories] = useState([]);
    // Stores the form data for category and difficulty on changing
    const [formData, setFormData] = useState({
        category: "",
        difficulty: ""
    })

    // Runs only upon mount (empty dependencies array)
    useEffect(() => {
        fetch(categoryUrl)
        .then(res => res.json())
        .then(data => setCategories(data.trivia_categories))
        .catch(error => console.log(`Error occurred: ${error}`))
    }, [])

    useEffect(() => {
        console.log(formData);
    }, [formData])

    // Mapping each category in array to become option JSX
    const mappedCategories = categories.map(category => <option
          value={category.id}
          id={category.id}>
            {category.name}
            </option>)

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(prevFormData => {
            if(e.target.id === "categorySelect"){
                
                return{
                    ...prevFormData,
                    category: e.target.value
                }
            } else if(e.target.id === "difficultySelect"){
                return{
                    ...prevFormData,
                    difficulty: e.target.value.toLowerCase()
                }
            }
        })
    }
    
    return(
        <>
            {/* Category */}
            <select onChange={(event) => handleChange(event)} id="categorySelect">
                <option value={''}>-- Choose Category --</option>
                {mappedCategories}
            </select>

            {/* Difficulty */}
            <select onChange={(event) => handleChange(event)} id="difficultySelect">
                <option value={''}>-- Choose Difficulty --</option>
                <option value={'Easy'} >Easy</option>
                <option value={'Medium'} >Medium</option>
                <option value={'Hard'} >Hard</option>
            </select>

            {/* Create button */}
            <button id="createBtn" onClick={() => handleCreate(formData)}>Create</button>
        </>
    )
}