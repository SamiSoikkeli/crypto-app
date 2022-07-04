import React from 'react'
import styled from "styled-components"

const PaginationWrapper = styled.nav`
    margin: 2rem;
    display: flex;
    justify-content: center;

    ul {
        display: flex;

        li {
            list-style: none;
            margin: 1rem;

            a {
                text-decoration: none;
            }

            &:hover {
                text-decoration: underline;
            }
        }
    }
`

const Pagination = ({ coinsPerPage, totalCoins, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <PaginationWrapper>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a
                        onClick={() => {
                            paginate(number)
                            window.scroll(0, 200)
                        }}
                        href="#CoinTable"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </PaginationWrapper>
    )
}

export default Pagination