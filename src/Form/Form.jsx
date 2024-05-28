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

    const callData = async (getData1, getData2) => {
        const dataArray = (await axios.get(getData1)).data;
        setData(dataArray);
        const nameDataArray = (await axios.get(getData2)).data;
        setCountryNameData(nameDataArray);
    }

    const addVoted = async (addData, newCountry) => {
        await axios.post(addData, newCountry)
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
                    addVoted('https://us-central1-api-tvef-vote.cloudfunctions.net/app/createVotedCountry', element)
                }
                else if (localStorage.getItem('teleJuriChoosen') === 'teleVote') {
                    addVoted('https://us-central1-api-tvef-vote.cloudfunctions.net/app/createTeleCountry', element)
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
        callData('https://api-esc.onrender.com/country', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readVotedCountry');
        setVotesSystem('Juri Votes')
    }

    const teleVote = () => {
        setChoosenAfter('choosen-after');
        localStorage.setItem('teleJuriChoosen', 'teleVote');
        callData('https://api-esc.onrender.com/country-tele', 'https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTeleCountry');
        setVotesSystem('Public Votes')
    }

    return (
        <div className={`form-div ${removeClass}`}>
            <div className={`choosen ${choosenAfter}`}>
                <h1>Choose voting system: Who are you?</h1>
                <div>
                    <button onClick={juriVote}>Juri</button>
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
