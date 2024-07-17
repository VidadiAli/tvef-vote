import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoMdCloseCircle } from "react-icons/io";
import { AlertEvent } from '../alert-events/AlertEvent';
import mainVideo from '../videos/recap.mp4'

const Vote = () => {

    const [mainData, setMainData] = useState([]);
    const [votingData, setVotingData] = useState([]);
    const [votingCountry, setVotingCountry] = useState('country');
    const [startRemove, setStartRemove] = useState('');
    const [givinPuans, setGivinPuans] = useState([]);
    const [givenCountry, setGivenCountry] = useState([]);
    const [showElementClass, setShowElementClass] = useState('');
    const [pointsArray, setPointsArray] = useState([]);

    const [stopVideo, setStopVideo] = useState('')
    const [displayVideo, setDisplayVideo] = useState('')


    const callData = async (getData1, getData2) => {
        const mainDataArray = (await axios.get(getData1)).data;
        setMainData(mainDataArray.final);

        const votingDataArray = (await axios.get(getData2)).data;
        setVotingData(votingDataArray);
    }


    const start = () => {
        setVotingCountry(localStorage.getItem("countryName"));
        setStartRemove('start-remove');
    }


    const addCountry = async (addData, newCountry) => {
        await axios.post(addData, newCountry)
    }

    const addPoint = async (addData, countrypoint) => {
        await axios.post(addData, countrypoint);

        const element = {
            "id": localStorage.getItem("countryName"),
            "countryName": localStorage.getItem("countryName")
        }

        if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
            addCountry('https://us-central1-api-tvef-vote.cloudfunctions.net/app/createVotedCountry', element)
        }
        else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
            addCountry('https://us-central1-api-tvef-vote.cloudfunctions.net/app/createTeleCountry', element)
        }

        AlertEvent("Your points saved", "rgb(15, 92, 141)");
        document.getElementsByClassName('reset')[0].style.display = 'none';
    }


    const givePuan = (e) => {
        for (let i = 0; i < 13; i++) {
            if (e.target.textContent == i) {
                givinPuans.push(i);
                givenCountry.push(e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent);
                const countrypoint = {
                    "id": votingCountry + i,
                    "givinCountry": votingCountry,
                    "getingCountry": e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent,
                    "puan": i
                }
                pointsArray.push(countrypoint);

                e.target.parentElement.parentElement.previousElementSibling.parentElement.parentElement.style.display = 'none';
            }
        }


        setGivinPuans(givinPuans);
        setGivenCountry(givenCountry);
        setPointsArray(pointsArray);



        const spanList = document.getElementsByTagName('span');
        for (let i = 0; i < spanList.length; i++) {
            if (spanList[i].textContent == e.target.textContent) {
                spanList[i].style.display = 'none';
            }
        }
    }


    if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
        callData('https://us-central1-api-tvef-vote.cloudfunctions.net/app/edition9', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readVotedCountry')
    }
    else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
        callData('https://us-central1-api-tvef-vote.cloudfunctions.net/app/edition9', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTeleCountry')
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


    const reset = () => {
        setPointsArray([]);
        const spanList = document.getElementsByTagName('span');
        const mainBox = document.getElementsByClassName('main-box');
        for (let i = 0; i < spanList.length; i++) {
            spanList[i].style.display = 'flex';
        }
        for (let i = 0; i < mainBox.length; i++) {
            mainBox[i].style.display = 'flex';
        }
    }


    setTimeout(() => {
        setStopVideo('stop-voting-video')
    }, 787000)

    setTimeout(() => {
        setDisplayVideo('display-voting-video')
    }, 787000);

    const watched = () => {
        setDisplayVideo('')
        setStopVideo('stop-voting-video');
        document.getElementsByClassName('display-video')[0].style.display = "none"
    }

    return (

        <div className='vote-system'>
            <div className={`display-video ${displayVideo}`}>
                <button onClick={watched}>I watched video</button>
            </div>
            <div className={`voting-video ${stopVideo}`}>
                <h1>You will be able to vote after the video ends. Watch till the end and submit your votes</h1>
                <video src={mainVideo} autoPlay></video>
            </div>
            <div className={`start ${startRemove}`}>
                <button onClick={start}>start</button>
            </div>
            <h1>The Voice Of EuroFans</h1>
            <h3>Your Country: {votingCountry}</h3>
            <h5>
                <button onClick={reset} className='reset'>reset</button>
                <button onClick={showMyVotes}>show my votes</button>
                <button onClick={sendBaza}>Send</button>
            </h5>
            <div>
                {
                    mainData && mainData.map((item) => {
                        if (item.countryName !== votingCountry) {
                            if (item.result) {
                                return <div key={item.id} className='main-box'>
                                    <div className='up'>
                                        <div className='artist'>
                                            <img src={item.flag} alt={`${item.countryName}'s flag`} />
                                            <div>
                                                <span>{item.countryName}</span>
                                                <span>{item.singerName}</span>
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