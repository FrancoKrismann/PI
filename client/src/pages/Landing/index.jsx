
import styles from "./landing.module.css"
import image from "../../img/chef.jpg"
import image2 from "../../img/recetas-sanas.png"
import image3 from "../../img/Pasta.jpg"
import {Link} from "react-router-dom"
const Landing  = () => {




    
    return (
    <>
        
        <div className={styles.container}>
            <div className={styles.dessing}></div>
            <div className={styles.dessing_2}></div>
            <Link to="/home" >
                <button className={styles.button}>ENTER</button>
            </Link>
            
            <img  src={image} alt="chef" className={styles.img}/> 
            <img  src={image2} alt="recetas" className={styles.img_2}/>     
            <img  src={image3} alt="pasta" className={styles.img_3}/>
            <div className={styles.intro}>
                <p className={styles.paraf_1}>Spoonacular API</p>
                <p className={styles.paraf_2}>Henry Foods</p>
            </div>
            

        </div>
    
    </>
        // <div className={styles.body_second}></div>
    );
}


export default Landing