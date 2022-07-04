import axios from "axios"
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../contexts/CryptoContext';
import styled from 'styled-components'
import { chartDays } from "../utils/data"
import {mobile} from "../utils/responsive";
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

const CoinChartWrapper = styled.div`
    ${mobile({ marginTop: "3rem" })}
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 3rem;
`

const ChartButton = styled.div`
    padding: 0.5rem 2.5rem;
    border: 1px solid var(--black);
    background-color: none;
    color: var(--black);
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    ${mobile({ padding: "0.5rem 1.25rem" })}

    &:hover {
        background-color: var(--black);
        color: var(--white);
    }
`

const CoinChart = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const { currency } = CryptoState()

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

        setHistoricData(data.prices)
    }

    useEffect(() => {
        fetchHistoricData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days]);

    return (
        <CoinChartWrapper>
            {!historicData ? (
                <h1>Loading..</h1>
            ) : (
                <>
                    <Line
                        data={{
                            labels: historicData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                                        : `${date.getHours()} : ${date.getMinutes()} AM`;

                                return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [{
                                data: historicData.map((coin) => coin[1]),
                                label: `Price ( Past ${days} Days) in ${currency}`,
                                borderColor: "black",
                            }]
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1
                                }
                            }
                        }}
                    />
                    <ButtonWrapper>
                        {chartDays.map(day => (
                            <ChartButton
                                key={day.value}
                                onClick={() => setDays(day.value)}
                            >
                                {day.label}
                            </ChartButton>
                        ))}
                    </ButtonWrapper>
                </>
            )}
        </CoinChartWrapper>
    )
}

export default CoinChart