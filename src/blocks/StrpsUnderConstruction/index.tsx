import React from 'react'
import { Page } from "../../../../payload/payload-types"


type Props = Extract<Page['layout'][0], { blockType: 'StrpsHero' }>

export const StrpsUnderConstruction: React.FC<
Props & {
    id?: string
}> = ({text}) => {

    text = text || "Under Construction"

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "#000",
            fontSize: "2rem",
            textAlign: "center",
            background: "repeating-linear-gradient(45deg, #000, #000 20px, #ff0 20px, #ff0 40px)",
        }}>

            <h2 style={{
                fontSize: "1.5rem",
                backgroundColor: "#ff0",
                width: "fit-content",
                paddingLeft: "1em",
                paddingRight: "1em",
                margin: "0.25em 0"
            }}>{text}</h2>
        </div>
    )

}

