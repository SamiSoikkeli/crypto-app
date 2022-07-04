import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import styled, { keyframes } from 'styled-components'
import { CryptoState } from "../contexts/CryptoContext"
import { TrendingCoins } from "../config/api"
import {mobile} from "../utils/responsive";

const MarqueeMove = keyframes`
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }
    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
`

const TrendingWrapper = styled.div`
    width: 100%;
    padding: 1rem 0 1rem 0;
    position: relative;
    overflow: hidden;
    --offset: 20vw;
    --move-initial: calc(-25% + var(--offset));
    --move-final: calc(-50% + var(--offset));
    border-bottom: 1px solid var(--black);
`

const TrendingInner = styled.div`
    width: fit-content;
    position: relative;
    display: flex;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: ${MarqueeMove} 12s linear infinite;
    animation-play-state: running;
    text-align: center;

    &:hover {
        animation-play-state: paused;
    }

    a {
        text-decoration: none;
        color: var(--black);
    }
`

const TrendingSymbol = styled.div`
    font-size: 0.579vw;
    padding: 0 5vw;
    white-space: nowrap;
    display: flex;
    text-align: center;
    justify-content: center;
    text-transform: uppercase;
    ${mobile({ fontSize: "2vw" })}
`

const TrendingDifference = styled.div`

`

const TrendingPrice = styled.div`
    font-size: 0.779rem;
    font-weight: 500;
`

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const TrendingMarquee = () => {
    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))

        setTrending(data)
    }

    useEffect(() => {
        fetchTrendingCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0

        return (
            <NavLink to={`/coins/${coin.id}`} key={coin.id}>
                {/* <img src={coin?.img} alt={coin.name} height="80"/> */}
                <TrendingSymbol>
                    {coin?.symbol}
                    &nbsp;
                    <TrendingDifference style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500}}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </TrendingDifference>
                </TrendingSymbol>
                <TrendingPrice>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </TrendingPrice>
            </NavLink>
        )
    })

    return (
        <TrendingWrapper id="top">
            <TrendingInner>
                {items}
                {items}
            </TrendingInner>
        </TrendingWrapper>
    )
}

export default TrendingMarquee