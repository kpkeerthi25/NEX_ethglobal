import React from "react";
import img from './logo192.png'

const TradeTile = () => {
    return(
        <div>
            <div className="row shadow p-3 mb-5 bg-white rounded" style ={{display:"flex", justifyContent:"space-between", flexDirection:"row",marginTop:"15px"}}>
                <div style={{display:"flex", width:"50%",paddingLeft:"10%",paddingRight:"5%"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <img src={img} />
                    <div style={{justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
                        <button style={{margin:" 0 auto"}}>Remove </button>
                    </div>
                    </div>
                    <h3 style={{alignSelf:"center", marginLeft:"10px"}}>item1</h3>
                    
                    
                </div>
                <div style={{display:"flex", width:"50%",paddingLeft:"15%",paddingRight:"5%"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <img src={img} />
                    <div style={{justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
                        <button style={{margin:" 0 auto"}}>Remove </button>
                    </div>
                    </div>
                    <h3 style={{alignSelf:"center", marginLeft:"10px"}}>item1</h3>
                </div>
            </div>
        </div>
    )
}

export default TradeTile;