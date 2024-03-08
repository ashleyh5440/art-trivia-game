import { useState } from 'react';
import homePic from '../../assets/homePic.jpg';
import './style.css'

function Scores() {
    return (
        <>
       
        <section>
            <div>
                <h1>HIGH SCORES</h1>
                <img id="home-pic" src={homePic} />
            </div>
            
            <table id = "table-container"> 
        <tr>
            <th id = "name-header">Name</th>
            <th id = "score-header">Score</th>
        </tr>
   {/* THE NAMES AND SCORES ARE TEMPORARY AND WILL BE REPLACED WITH ACTUAL USER NAMES... SOON.
       WHOEVER IS IN CHARGE OF THE USERNAMES, MAKE IT SO. */}   
        <tr>
            <td id = "name">Monkey D. Luffy</td>
            <td id = "score">1</td>
        </tr>

        <tr>
            <td id = "name">Roronoa Zoro</td>
            <td id = "score">3</td>
        </tr>

        <tr>
            <td id = "name">Nami</td>
            <td id = "score">43</td>
        </tr>

        <tr>
            <td id = "name">Usopp</td>
            <td id = "score">18</td>
        </tr>

        <tr>
            <td id = "name">Black-Leg Sanji</td>
            <td id = "score">18</td>
        </tr>

        <tr>
            <td id = "name">Tony Tony Chopper</td>
            <td id = "score">91</td>
        </tr>

        <tr>
            <td id = "name">Nico Robin</td>
            <td id = "score">130</td>
        </tr>

        <tr>
            <td id = "name">Franky</td>
            <td id = "score">322</td>
        </tr>

        <tr>
            <td id = "name">Brook</td>
            <td id = "score">381</td>
        </tr>

        <tr>
            <td id = "name">Jimbei</td>
            <td id = "score">876</td>
        </tr>

            </table>
  
            
        </section>
        </>
    );
};

export default Scores;