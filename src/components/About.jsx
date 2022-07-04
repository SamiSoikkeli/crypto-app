import React from 'react'
import styled from 'styled-components'
import {mobile} from "../utils/responsive";

const Container = styled.div`
    width: 100%;
    margin: 10rem 0rem 15rem 0rem;
    display: flex;
    position: relative;
    overflow: hidden;
    text-align: center;
    justify-content: center;
`

const Wrapper = styled.div`
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    ${mobile({ width: "80%" })}
`

const Title = styled.h1`
    font-size: 4.375rem;
    margin-bottom: 4rem;
`

const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ flexDirection: "column" })}

    img {
        width: 30%;
        ${mobile({ width: "100%" })}
    }
`

const Description = styled.p`
    margin: 3.125rem 5rem;
    font-size: 1.5rem;
    line-height: 2.25rem;
    font-weight: 400;
    width: 50%;
    text-align: left;
    ${mobile({ width: "100%" })}
`

const About = () => {
    return (
        <Container>
            <Wrapper>
                    <Title id="about">About us</Title>
                    <InfoContainer>
                        <img src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Phone App"/>
                        <Description>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl magna, blandit non augue at, consequat tincidunt libero. Curabitur eget dignissim purus. In congue eget neque sed feugiat. Nam cursus ex rhoncus aliquam pretium. Donec placerat felis turpis, fringilla hendrerit risus feugiat mattis. Pellentesque finibus magna lorem, vitae elementum nibh convallis eu. In sollicitudin lacus eget metus cursus, non molestie nunc blandit. Nam dapibus ultricies leo, in posuere purus facilisis vel. Integer augue elit, ultricies in elementum in, tincidunt eget erat. Nullam cursus sit amet nulla at tempus. Donec tristique accumsan gravida.
                        </Description>
                    </InfoContainer>
            </Wrapper>
        </Container>
    )
}

export default About