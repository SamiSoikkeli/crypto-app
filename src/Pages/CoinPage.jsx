import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { SingleCoin } from "../config/api";
import { CryptoState } from '../contexts/CryptoContext';
import styled from "styled-components"
import Header from "../components/Header";
import Footer from "../components/Footer"
import TrendingMarquee, { numberWithCommas } from "../components/TrendingMarquee";
import parse from 'html-react-parser';
import CoinChart from "../components/CoinChart";
import {mobile} from "../utils/responsive";

const CoinPageWrapper = styled.div`

`

const CoinInfoWrapper = styled.div`
    display: flex;
    padding: 5rem 3rem;
    margin-bottom: 3rem;
    ${mobile({ flexDirection: "column" })}
`

const Sidebar = styled.div`
    width: 30%;
    ${mobile({ width: "100%" })}
`

const Title = styled.h1`
    margin: 3rem 0;
    font-size: 3rem;
`

const SubTitle = styled.h1`
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
`

const CoinInformation = styled.h3`
    width: 80%;
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--black);
    ${mobile({ width: "100%" })}
`

const CoinInformationResult = styled.span`
    font-weight: 300;
`

const Description = styled.p`
    width: 80%;
    margin-bottom: 5rem;
    ${mobile({ width: "100%" })}
`

const CoinData = styled.div`
    display: flex;
    flex-direction: column;
`

const Chart = styled.div`
    width: 70%;
    ${mobile({ width: "100%" })}
`

const CoinPage = () => {
    const { id } = useParams()
    const [coin, setCoin] = useState();

    const { currency, symbol } = CryptoState()

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))

        setCoin(data)
    }

    useEffect(() => {
        fetchCoin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!coin) return <h1>Loading..</h1>

    return (
        <CoinPageWrapper>
            <TrendingMarquee />
            <Header />
            <CoinInfoWrapper>
                <Sidebar>
                    <img
                        src={coin?.image.large}
                        alt={coin?.name}
                        height="200"
                    />
                    <Title>{coin?.name}</Title>
                    <Description>
                        {/* {parse(coin?.description.en.split(". ")[0])}. */}
                        {coin?.description.en.split(". ")[0]}.
                    </Description>
                    <CoinData>
                        <SubTitle>Information</SubTitle>
                        <CoinInformation>
                            <span>Rank:</span>
                            &nbsp;
                            <CoinInformationResult>{coin?.market_cap_rank}</CoinInformationResult>
                        </CoinInformation>
                        <CoinInformation>
                            <span>Current Price:</span>
                            &nbsp;
                            <CoinInformationResult>
                                {symbol}{" "}
                                {numberWithCommas (
                                    coin?.market_data.current_price[currency.toLowerCase()]
                                )}
                            </CoinInformationResult>
                        </CoinInformation>
                        <CoinInformation>
                            <span>Market Cap:{" "}</span>
                            &nbsp;
                            <CoinInformationResult>
                                {symbol}{" "}
                                {numberWithCommas (
                                    coin?.market_data.market_cap[currency.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                                )}
                                M
                            </CoinInformationResult>
                        </CoinInformation>
                    </CoinData>
                </Sidebar>
                <Chart>
                    <CoinChart coin={coin}/>
                </Chart>
            </CoinInfoWrapper>
            <Footer />
        </CoinPageWrapper>
    )
}

export default CoinPage