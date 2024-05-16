import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';




const Form = () => {

    const [data, setData] = useState([]);
    const [countryNamedata, setCountryNameData] = useState([]);
    const [removeClass, setRemoveClass] = useState('');
    const [chooseCountry, setChooseCuntry] = useState('');

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
                addVoted(element);
                setRemoveClass('form-div-remove');
                window.location = "https://vidadiali.github.io/esc-vote/vote"
            }
            else {
                alert('Your votes already exist')
            }
        }
        else {
            alert('choose your Country');
        }
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

                <button onClick={voteNow}>Vote Now</button>
                <NavLink to={'/esc-vote/vote'} style={{ display: 'none' }}></NavLink>
            </form>
        </div>
    )
}

export default Form
