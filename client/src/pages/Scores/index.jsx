import { useState } from 'react';
import homePic from '../../assets/homePic.jpg';

function Scores() {
    return (
        <>
       
        <section>
            <div>
                <h1>HIGH SCORES</h1>
                <img id="home-pic" src={homePic} />
            </div>
            
            <table> 
        <tr>
            <th>Name</th>
            <th>Score</th>
        </tr>
   {/* THE NAMES AND SCORES ARE TEMPORARY AND WILL BE REPLACED WITH ACTUAL USER NAMES... SOON.
       WHOEVER IS IN CHARGE OF THE USERNAMES, MAKE IT SO. */}   
        <tr>
            <td>Monkey D. Luffy</td>
            <td>1</td>
        </tr>

        <tr>
            <td>Roronoa Zoro</td>
            <td>3</td>
        </tr>

        <tr>
            <td>Nami</td>
            <td>43</td>
        </tr>

        <tr>
            <td>Usopp</td>
            <td>18</td>
        </tr>

        <tr>
            <td>Black-Leg Sanji</td>
            <td>18</td>
        </tr>

        <tr>
            <td>Tony Tony Chopper</td>
            <td>91</td>
        </tr>

        <tr>
            <td>Nico Robin</td>
            <td>130</td>
        </tr>

        <tr>
            <td>Franky</td>
            <td>322</td>
        </tr>

        <tr>
            <td>Brook</td>
            <td>381</td>
        </tr>

        <tr>
            <td>Jimbei</td>
            <td>876</td>
        </tr>

            </table>
  
            
        </section>
        </>
    );
};

export default Scores;