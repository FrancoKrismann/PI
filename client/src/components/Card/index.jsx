import styles from "./card.module.css"
import {Link} from "react-router-dom"

 const Card = ({image, name , diets, id }) => {
 
    return (
        <div className={styles.container}>
            <img src={image} alt={image} />
            <p>Name:{name}</p>
            <h3>Diets:</h3>
            {diets?.map((diet, index) => <h3 key={index}> {diet}, </h3> )}
            <Link to="/detail">
                <p>Detail</p>
            </Link>
            
        </div>
    )
}


export default Card