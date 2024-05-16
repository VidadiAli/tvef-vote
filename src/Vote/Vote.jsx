import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Vote = () => {

    const [mainData, setMainData] = useState([]);
    const [votingData, setVotingData] = useState([]);
    const [votingCountry, setVotingCountry] = useState('country');
    const [startRemove, setStartRemove] = useState('');
    const [givinPuans, setGivinPuans] = useState([]);
    const [givenCountry, setGivenCountry] = useState([]);


    const callData = async () => {
        const mainDataArray = (await axios.get('http://localhost:3000/country')).data;
        setMainData(mainDataArray);
        const votingDataArray = (await axios.get('http://localhost:3000/voted')).data;
        setVotingData(votingDataArray);
    }


    const start = () => {
        setVotingCountry(votingData[votingData.length - 1].countryName);
        setStartRemove('start-remove');
    }

    const addPoint = async (countrypoint) => {
        await axios.post('http://localhost:3000/puans', countrypoint)
    }
    const givePuan = (e) => {
        if (e.target.textContent == 12) {
            givinPuans.push(12);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 12
            }
            addPoint(countrypoint);
        }
        else if (e.target.textContent == 10) {
            givinPuans.push(10);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 8) {
            givinPuans.push(8);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 7) {
            givinPuans.push(7);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 6) {
            givinPuans.push(6);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 5) {
            givinPuans.push(5);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 4) {
            givinPuans.push(4);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 3) {
            givinPuans.push(3);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 2) {
            givinPuans.push(2);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }
        else if (e.target.textContent == 1) {
            givinPuans.push(1);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
        }

        const spanList = document.getElementsByTagName('span');
        for (let i = 0; i < spanList.length; i++) {
            if (spanList[i].textContent == e.target.textContent) {
                spanList[i].style.display = 'none';
            }
        }
        console.log(givenCountry)
        console.log(givinPuans);

        setGivinPuans(givinPuans);
        setGivenCountry(givenCountry);
    }


    useEffect(() => {
        callData();
    }, []);




    return (

        <div className='vote-system'>
            <div className={`start ${startRemove}`}>
                <button onClick={start}>start</button>
            </div>
            <h1>The Voice Of EuroFans</h1>
            <h3>Your Country: {votingCountry}</h3>
            <h5>
                <button>reset</button>
                <button>show my votes</button>
                <button>Send</button>
            </h5>
            <div>
                {
                    mainData && mainData.map((item) => {
                        if (item.countryName !== votingCountry) {
                            if (!givenCountry.includes(item.countryName)) {
                                if (item.result) {
                                    return <div key={item.id}>
                                        <div className='up'>
                                            <div className='artist'>
                                                <img src={item.flag} alt={`${item.countryName}'s flag`} />
                                                <div>
                                                    <span>{item.countryName}</span>
                                                    <span>{item.singerName}</span>
                                                    <span>{item.musicName}</span>
                                                </div>
                                            </div>
                                            <div className='points' onClick={givePuan}>
                                                <div className='upper'>
                                                    <span>12</span>
                                                    <span>10</span>
                                                    <span>8</span>
                                                </div>
                                                <div className='down'>
                                                    <span>7</span>
                                                    <span>6</span>
                                                    <span>5</span>
                                                    <span>4</span>
                                                    <span>3</span>
                                                    <span>2</span>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Vote