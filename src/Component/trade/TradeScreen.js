import React from "react";
import TradeTile from "./TradeTile";

const TradeScreen = () => {
    return(
<div>
    <h1>Trade Screen</h1>

    <div className="container">
        <div>
            <h3>
                Trades Created
            </h3>
            <TradeTile/>
        </div>

        <div>
            <h3>
                Trades Participating
            </h3>
        </div>

    </div>
</div>
    )
}

export default TradeScreen;