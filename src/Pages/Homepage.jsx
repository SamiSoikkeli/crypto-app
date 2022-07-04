import React from 'react'
import TrendingMarquee from '../components/TrendingMarquee'
import Hero from '../components/Hero'
import Header from '../components/Header'
import CoinsTable from '../components/CoinsTable'
import Footer from '../components/Footer'
import About from '../components/About'

const Homepage = () => {
    return (
        <>
            <TrendingMarquee />
            <Header />
            <Hero />
            <CoinsTable />
            <About />
            <Footer />
        </>
    )
}

export default Homepage