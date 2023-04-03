import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado ({cardsPage, allRecipes, paginado}){
    const pageNumbers = []
    console.log(allRecipes)
for(let i = 1; i<= Math.ceil(allRecipes/cardsPage); i++){
    pageNumbers.push(i)
}

console.log(pageNumbers)
return(
    <nav className={styles.pag}>
        <ul>
            
            {pageNumbers &&
            pageNumbers.map(number =>{
            return <li key={number}>
                    <a  onClick={() => paginado(number)}>{number}</a>
                </li>
                
            })
            }
        </ul>
    </nav>
)


}