import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { AlertEvent } from '../alert-events/AlertEvent';




const Form = () => {

    const [data, setData] = useState([]);
    const [countryNamedata, setCountryNameData] = useState([]);
    const [removeClass, setRemoveClass] = useState('');
    const [chooseCountry, setChooseCuntry] = useState('');
    const [continueDisplay, setContinueDisplay] = useState('none');
    const [choosenAfter, setChoosenAfter] = useState("");
    const [votesSystem, setVotesSystem] = useState('')
    const [waitClass, setWaitClass] = useState('');
    const [closeSystem, setCloseSystem] = useState('');
    const [realTime, setRealTime] = useState('');

    const callData = async (getData1, getData2) => {
        setWaitClass('wait-vote-adding')
        const dataArray = ((await axios.get(getData1)).data);
        setData(dataArray.final);

        const nameDataArray = (await axios.get(getData2)).data;
        setCountryNameData(nameDataArray);
        setWaitClass('');
    }

    const addVoted = async (newCountry) => {
        localStorage.setItem("countryName", newCountry.countryName);
    }


    let count1 = 0;
    const voteNow = (e) => {
        e.preventDefault();
        if (chooseCountry !== '') {
            countryNamedata.forEach((f) => {
                if (chooseCountry === f.countryName) {
                    count1++;
                }
            });
            if (count1 === 0) {
                const element = {
                    "id": chooseCountry,
                    "countryName": chooseCountry
                }
                setContinueDisplay('inline-block');
                document.getElementsByClassName('continue')[0].style.display = 'none';
                if (localStorage.getItem('teleJuriChoosen') === 'juriVote') {
                    addVoted(element)
                }
                else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
                    addVoted(element)
                }
            }
            else {
                AlertEvent("Your votes are already exist", "red");
            }
        }
        else {
            AlertEvent("Choose your country", "red");
        }
    }


    const goSite = () => {
        setRemoveClass('form-div-remove');
    }

    const juriVote = () => {
        setChoosenAfter('choosen-after');
        localStorage.setItem('teleJuriChoosen', 'juriVote');
        callData('https://us-central1-api-tvef-vote.cloudfunctions.net/app/edition9', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readVotedCountry');
        setVotesSystem('Jury Votes')
    }

    const teleVote = () => {
        setChoosenAfter('choosen-after');
        localStorage.setItem('teleJuriChoosen', 'teleVote');
        callData('https://us-central1-api-tvef-vote.cloudfunctions.net/app/edition9', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTeleCountry');
        setVotesSystem('Public Votes')
    }


    let timer;

    useEffect(() => {

        const date = new Date();
        let hourse = 0, minutes = 0;

        date.getHours() < 10 ? hourse = `0${date.getHours()}` : hourse = date.getHours()
        date.getMinutes() < 10 ? minutes = `0${date.getMinutes()}` : minutes = date.getMinutes();

        if (Number(`${(date.getDate())}${(date.getMonth())}`) >= 135 && Number(`${(date.getDate())}${(date.getMonth())}${hourse}${minutes}`) <= 1852130) {
            setCloseSystem('');

            timer = setInterval(() => {
                setRealTime(`next - ${(18 - date.getDate()) > 0 ? 18 - date.getDate() : ''} 
                ${21 - date.getHours()} : 
                ${date.getMinutes() <= 50 ? (59 - date.getMinutes() === 59 ? '00' : 59 - date.getMinutes() - 30) : '0' + (59 - date.getMinutes())} : 
                ${date.getSeconds() <= 50 ? (60 - date.getSeconds() === 60 ? '00' : 60 - date.getSeconds()) : '0' + (60 - date.getSeconds())}`)
            }, 1000)

            return () => clearInterval(timer)
        }

        else {
            setCloseSystem('');
        }
    })


    return (
        <div className={`form-div ${removeClass}`}>
            <div className={`wait-vote ${waitClass}`}>
                <button >please wait ...</button>
            </div>

            <div className={`close-system ${closeSystem}`}>
                <span>{realTime}</span>
            </div>
            <div className={`choosen ${choosenAfter}`}>
                <h1>
                    Welocome to the Grand Final <br /> <br />
                    Choose voting system: Who are you?
                </h1>
                <div>
                    <button onClick={juriVote}>Jury</button>
                    <span>or</span>
                    <button onClick={teleVote}>Public</button>
                </div>
            </div>
            <h1>The Voice Of EuroFans</h1>
            <h1>{votesSystem}</h1>
            <form>
                <div>
                    <span>Choose Your Country</span>
                    <select name="country" id="" onChange={(e) => setChooseCuntry(e.target.value)}>
                        <option value="">Countries</option>
                        {
                            data && data.map((item) => (
                                <option value={item.countryName} key={item.countryName}>{item.countryName}</option>
                            ))
                        }
                    </select>
                </div>

                <p>Make Dream!</p>

                <button onClick={voteNow} className='continue'>Continue</button>
                <NavLink to={'/tvef-vote/vote'} style={{ display: continueDisplay, textDecoration: 'none', color: 'rgb(15, 92, 141)', backgroundColor: 'yellow', textAlign: 'center', padding: '15px', fontWeight: '700', borderRadius: '10px' }} onClick={goSite}>Vote Now</NavLink>
            </form>
        </div >
    )
}

export default Form
