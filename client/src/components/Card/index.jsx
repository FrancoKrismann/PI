import styles from "./card.module.css"
import {Link} from "react-router-dom"

 const Card = ({image, name , diets, id }) => {
 
    return (
        // <Link to="/detail">
                
        //     </Link>
        <div className={styles.container}>
            <img src={image} alt={image} />
            <div className={styles.info}>
                <h3>Name:</h3>
            <p className={styles.name}>{name}</p>
            <h3>Diets:</h3>  
            
            <p className={styles.diets}>{diets?.map((diet, index) => 
            <p className ={styles.diet} key={index}> {diet}, </p> )} </p> 
            </div>
               
            
            
            
            
        </div>
    )
}


export default Card