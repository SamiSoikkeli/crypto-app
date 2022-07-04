import {css} from "styled-components"

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 768px) {
            ${props}
        }
    `
}

export const smallMobile = (props) => {
    return css`
        @media only screen and (max-width: 425px) {
            ${props}
        }
    `
}