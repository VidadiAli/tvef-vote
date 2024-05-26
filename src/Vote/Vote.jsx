import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoMdCloseCircle } from "react-icons/io";
import { AlertEvent } from '../alert-events/AlertEvent';

const Vote = () => {


    const [mainData, setMainData] = useState([]);
    const [votingData, setVotingData] = useState([]);
    const [votingCountry, setVotingCountry] = useState('country');
    const [startRemove, setStartRemove] = useState('');
    const [givinPuans, setGivinPuans] = useState([]);
    const [givenCountry, setGivenCountry] = useState([]);
    const [showElementClass, setShowElementClass] = useState('');
    const [pointsArray, setPointsArray] = useState([]);


    const callData = async (getData1, getData2) => {
        const mainDataArray = (await axios.get(getData1)).data;
        setMainData(mainDataArray);
        const votingDataArray = (await axios.get(getData2)).data;
        setVotingData(votingDataArray);
    }


    const start = async () => {
        let startArray = [];
        console.log(votingData)
        const lastExamplePuans = [];
        if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
            startArray = (await axios.get('https://us-central1-api-tvef-vote.cloudfunctions.net/app/readPuans')).data;
        }
        else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
            startArray = (await axios.get('https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTelePuans')).data;
        }
        startArray.forEach((e) => {
            if (!lastExamplePuans.includes(e.givinCountry)) {
                lastExamplePuans.push(e.givinCountry);
            }
        });

        votingData.forEach((e) => {
            if (!lastExamplePuans.includes(e.countryName)) {
                setVotingCountry(e.countryName);
                setStartRemove('start-remove');
            }
        })

    }

    const addPoint = async (addData, countrypoint) => {
        await axios.post(addData, countrypoint);
        AlertEvent("Your points saved", "rgb(15, 92, 141)");
    }


    const givePuan = (e) => {
        if (e.target.textContent == 12) {
            givinPuans.push(12);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 12,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 12
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 10) {
            givinPuans.push(10);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 10,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 10
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 8) {
            givinPuans.push(8);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 8,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 8
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 7) {
            givinPuans.push(7);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 7,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 7
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 6) {
            givinPuans.push(6);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 6,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 6
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 5) {
            givinPuans.push(5);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 5,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 5
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 4) {
            givinPuans.push(4);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 4,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 4
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 3) {
            givinPuans.push(3);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 3,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 3
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 2) {
            givinPuans.push(2);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 2,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 2
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }
        else if (e.target.textContent == 1) {
            givinPuans.push(1);
            givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
            e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = "none";
            const countrypoint = {
                "id": votingCountry + 1,
                "givinCountry": votingCountry,
                "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                "puan": 1
            }
            pointsArray.push(countrypoint);
            setPointsArray(pointsArray)
        }

        const spanList = document.getElementsByTagName('span');
        for (let i = 0; i < spanList.length; i++) {
            if (spanList[i].textContent == e.target.textContent) {
                spanList[i].style.display = 'none';
            }
        }

        setGivinPuans(givinPuans);
        setGivenCountry(givenCountry);
    }


    if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
        callData('https://api-esc.onrender.com/country', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readVotedCountry')
    }
    else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
        callData('https://api-esc.onrender.com/country-tele', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTeleCountry')
    }


    const showMyVotes = () => {
        const showList = document.getElementsByClassName('show-list')[0];
        showList.innerHTML = '';
        pointsArray.forEach((e) => {
            const box = document.createElement('div');
            const country = document.createElement('span');
            country.textContent = e.getingCountry;
            const puan = document.createElement('span');
            puan.textContent = e.puan;

            box.append(country, puan);
            showList.append(box);
        })
        setShowElementClass('show-element');
    }

    const closePoints = () => {
        setShowElementClass('');
    }

    let count1 = 0
    const sendBaza = async () => {
        if (pointsArray.length === 10) {
            let puanData = [];

            if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
                puanData = (await axios.get('https://us-central1-api-tvef-vote.cloudfunctions.net/app/readPuans')).data
            }
            else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
                puanData = (await axios.get('https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTelePuans')).data
            }

            puanData && puanData.forEach((e) => {
                if (e.givinCountry === pointsArray[0].givinCountry) {
                    count1++
                }
            });
            if (count1 === 0) {
                const sure = confirm("Are you sure submiting your votes?\nIf you send it, you will can't change it!");
                if (sure) {
                    pointsArray.forEach((f) => {
                        if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
                            addPoint('https://us-central1-api-tvef-vote.cloudfunctions.net/app/createPuans', f);
                        }
                        else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
                            addPoint('https://us-central1-api-tvef-vote.cloudfunctions.net/app/createTelePuans', f);
                        }
                    })
                }
                else {
                    return;
                }
            }
            else {
                AlertEvent("Your votes are already exist", "red");
            }
        }
        else if (pointsArray.length === 0) {
            AlertEvent("Please, add your votes", "red");
        }
        else {
            AlertEvent("Please, give your points to 10 countries!", "red");
        }
    }

    return (

        <div className='vote-system'>
            <div className={`start ${startRemove}`}>
                <button onClick={start}>start</button>
            </div>
            <h1>The Voice Of EuroFans</h1>
            <h3>Your Country: {votingCountry}</h3>
            <h5>
                <button onClick={showMyVotes}>show my votes</button>
                <button onClick={sendBaza}>Send</button>
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

            <div className={`dont-show ${showElementClass}`}>
                <IoMdCloseCircle onClick={closePoints} className='list-close-icon' />
                <div className='show-list'>

                </div>
            </div>
        </div>
    )
}

export default Vote