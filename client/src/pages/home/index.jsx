import styles from "./home.module.css"
import Card from "../../components/Card"
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import allrecipes from "../../redux/actions/actions"



const Home = () => {

const dispatch = useDispatch();
const allRecipes = useSelector((state) => state.recipes)
const [current, setCurrent] = useState()

useEffect(() => {
    
    dispatch(allrecipes())
    
},[dispatch]) 
    

function handeleReset (e){
e.preventDefault()
dispatch(allrecipes())
}


    return (
        
        <div className={styles.container}>
            <nav className={styles.nav}>
                <input  type="text" placeholder="Search..."/>
            </nav>
            
            
        <div className={styles.container_filtros}>
            <button onClick={e => {handeleReset(e)}}>RESETEAR</button>
            <select>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>
            <select>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
            </select>
        </div>
        <div className={styles.container_cards}>
    {
        allRecipes.map(el => (
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