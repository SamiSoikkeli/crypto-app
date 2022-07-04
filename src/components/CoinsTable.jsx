import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useNavigate  } from "react-router-dom"
import { CoinList } from '../config/api';
import { CryptoState } from "../contexts/CryptoContext";
import { numberWithCommas } from "../components/TrendingMarquee"
import styled from "styled-components"
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import {mobile} from "../utils/responsive";

const TableWrapper = styled.div`
    width: 60%;
    margin: auto;
    text-align: center;
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${mobile({ width: "100%" })}
`

const Title = styled.h1`
    font-size: 4.375rem;
    margin-bottom: 3rem;
    width: 70%;
    margin: auto;
    ${mobile({ width: "100%", fontSize: "2rem" })}
`

const Search = styled.input`
    margin-top: 5rem;
    margin-bottom: 6rem;
    width: 100%;
    padding: 1.5rem 1rem;
    border-radius: 2rem;
`

const TableContainer = styled.div`
    width: 100%;
    font-size: 3rem;

    table {
        width: 100%;
        border-collapse: collapse;
        ${mobile({ width: "10%" })}
    }

    thead {
        font-size: 1.5rem;
        border-bottom: 1px solid var(--black);
        ${mobile({ fontSize: "1rem" })}

        th {
            padding-bottom: 2rem;
        }
    }

    tbody {
        font-size: 1.25rem;
        ${mobile({ fontSize: "1rem" })}

        tr {
            cursor: pointer;
            margin-bottom: 1rem;
            border-bottom: 1px solid var(--black);

            td {
                padding: 3.5rem 1rem 3.5rem 1rem;
                transition: background-color 1s;
                text-align: right;
            }

            &:hover {
                background-color:#eeeeee;
                background-image:linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 100%);
                background-repeat:no-repeat;
                background-size: 200% 100%;
                transition:background-size 1s, background-color 1s;
            }
        }
    }
`

const CoinMain = styled.div`
    display: flex;
`

const CoinNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
`

const CoinSymbol = styled.div`
    text-transform: uppercase;
`

const CoinName = styled.div`
    font-size: 0.897rem;
`

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState([]);
    const [search, setSearch] = useState([]);
    const [page, setPage] = useState(1);
    const [coinsPerPage] = useState(10);

    const indexOfLastCoin = page * coinsPerPage
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage

    const paginate = (pageNumber) => setPage(pageNumber)

    const navigate = useNavigate()

    const { currency, symbol } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);


    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }


    const [cursorText, setCursorText] = useState("");
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
        });
        const [cursorVariant, setCursorVariant] = useState("default");


        useEffect(() => {
            const mouseMove = e => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
            }

            window.addEventListener("mousemove", mouseMove);

            return () => {
            window.removeEventListener("mousemove", mouseMove);
            }
        }, []);

        const variants = {
            default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            },
            text: {
            height: 150,
            width: 150,
            x: mousePosition.x - 75,
            y: mousePosition.y - 75,
            backgroundColor: "#111",
            //mixBlendMode: "difference"
            }
        }

        const textEnter = () => {
            setCursorVariant("text");
            setCursorText("View");
        };
        const textLeave = () => {
            setCursorVariant("default");
            setCursorText("");
        };


    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <TableWrapper>
            <motion.div
                className='cursor'
                variants={variants}
                animate={cursorVariant}
            >
                <span className="cursorText">{cursorText}</span>
            </motion.div>
            <Title id="CoinTable">Cryptocurrency Prices by Market Cap</Title>
            <Search
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer>
                <table>
                    <thead>
                        <tr>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <th key={head} align={head === "Coin" ? "" : "right"}>
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {handleSearch()
                            .slice(indexOfFirstCoin, indexOfLastCoin)
                            .map((row) => {
                            const profit = row.price_change_percentage_24h > 0

                            return (
                                <tr
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    key={row.name}
                                >
                                    <td>
                                        <CoinMain>
                                            <img
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                            />
                                            <CoinNameWrapper>
                                                <CoinSymbol>{row.symbol}</CoinSymbol>
                                                <CoinName>{row.name}</CoinName>
                                            </CoinNameWrapper>
                                        </CoinMain>
                                    </td>
                                    <td>
                                        {symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </td>
                                    <td style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red"
                                        }}>
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                    </td>
                                    <td>
                                        {symbol}{" "}
                                        {numberWithCommas(
                                            row.market_cap.toString().slice(0, -6)
                                        )}
                                        M
                                    </td>
                                </tr>
                                )
                        })}
                    </tbody>
                </table>
            </TableContainer>
            <Pagination
                coinsPerPage={coinsPerPage}
                totalCoins={coins.length}
                paginate={paginate}
            />
        </TableWrapper>
    )
}

export default CoinsTable