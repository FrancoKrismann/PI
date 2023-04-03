import styles from "./home.module.css"
import Card from "../../components/Card"
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import {allrecipes, RecipeFilterByDiet, recipeFilterWhere, recipeFilterAS_DES, postRecipe} from "../../redux/actions/actions"
import Paginado from "../../components/Paginado";


const Home = () => {

const dispatch = useDispatch();
const allRecipes = useSelector((state) => state.recipes)
const [current, setCurrent] = useState(1)
const [cardsPage , setCardsPage] = useState(9)
const indexOflastRecipe = current * cardsPage
const indexofFirstRecipe = indexOflastRecipe - cardsPage
const currentRecipe = allRecipes.slice(indexofFirstRecipe, indexOflastRecipe)

const paginado = (pageNumber) => {
    setCurrent(pageNumber)
}

useEffect(() => {
    
    dispatch(allrecipes())
    dispatch(postRecipe())
    
},[dispatch]) 
    


function handeleReset (e){
e.preventDefault()
dispatch(allrecipes())
}

function handleFilterDiets (e){
dispatch(RecipeFilterByDiet(e.target.value))
}

function handleFilterWhere (e){
    dispatch(recipeFilterWhere(e.target.value))
}

function handleFilterAlfab (e){
    dispatch(recipeFilterAS_DES(e.target.value))
}

function handleSearchByName(e){
    
}
console.log("CurrentRecipe:" , currentRecipe[0] )
    return (
        
        <div className={styles.container}>
            <nav className={styles.nav}>
                <input name="SearchByName" type="text" placeholder="Search..."/>
            </nav>
            
            
        <div className={styles.container_filtros}>
            <button onClick={e => handeleReset(e)}>RESETEAR</button>
            <select onChange={e => handleFilterAlfab(e)}>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>
            <select onChange={e => handleFilterDiets(e)}>
                <option value="All">All</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
                <option value="ovo-vegetarian">Ovo-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="paleo">Paleo</option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Low FODMAP</option>
                <option value="whole 30">Whole30</option>
            </select>
            <select onChange={e => handleFilterWhere(e)}>
                <option value="All">All</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
            </select>
</div>
<Paginado className={styles.paginado}
        cardsPage={cardsPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
        />

         <div className={styles.container_cards}> 
    {
        currentRecipe?.map(el => (
            
        <Card 
        key={el.id}
        id ={el.id}
        name={el.title}
        diets={el.diets}
        image={el.image}
        ></Card>   
            ))
    }
        </div>

        </div>
        
        
    )

}
export default Home
console.log("Se renderiza")

// const mapStrateToProps = (state) =>{
//     console.log("mapStrateTopProps")
//     return{
//     allRecipes:state.allRecipes
//     }
// }


// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//     recipes: () => dispatch(recipes())
//     };
// };


// export default connect(mapStrateToProps,mapDispatchToProps)(Home)