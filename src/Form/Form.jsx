import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { AlertEvent } from '../alert-events/AlertEvent';




const Form = () => {

    const [data, setData] = useState([]);
    const [countryNamedata, setCountryNameData] = useState([]);
    const [removeClass, setRemoveClass] = useState('');
    const [chooseCountry, setChooseCuntry] = useState('');
    const [continueDisplay, setContinueDisplay] = useState('none')

    const callData = async () => {
        const dataArray = (await axios.get('https://api-esc.onrender.com/country')).data;
        setData(dataArray);
        const nameDataArray = (await axios.get('https://api-esc.onrender.com/voted')).data;
        setCountryNameData(nameDataArray);
    }

    const addVoted = async (newCountry) => {
        await axios.post('https://api-esc.onrender.com/voted', newCountry)
    }

    useEffect(() => {
        callData();
    }, []);


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
                    "countryName": chooseCountry
                }
                setContinueDisplay('inline-block');
                addVoted(element);
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



    return (
        <div className={`form-div ${removeClass}`}>
            <h1>The Voice Of EuroFans</h1>
            <h1>Jury Votes</h1>
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

                <button onClick={voteNow}>Continue</button>
                <NavLink to={'/tvef-vote/vote'} style={{ display: continueDisplay, textDecoration: 'none', color: 'rgb(15, 92, 141)', backgroundColor: 'yellow', textAlign: 'center', padding: '15px', fontWeight: '700', borderRadius: '10px' }} onClick={goSite}>Vote Now</NavLink>
            </form>
        </div >
    )
}

export default Form
