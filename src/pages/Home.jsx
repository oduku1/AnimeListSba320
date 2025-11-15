import popularAnime from "/src/assets/Anime_pop.webp"

export default function Home(){
    return (<div className="main-content">
     
     <div className="home-main">


    
     <h2 style={{textAlign:"center", fontSize:"30px",marginBottom:"5px"}}>Anime List</h2>
     <p style={{textAlign:"center",fontSize:"10px",fontWeight:"lighter",fontStyle:"italic"}}>List All Your Favorite Anime</p>
     <img src={popularAnime} style={{width:"50%",borderRadius:"10px"}}></img>
     </div>
    
    
    
    </div>
    
    
    
   )
}