import { useState } from 'react';
import Categories from '../../components/Categories';
import Scores from '../Scores';
import homePic from '../../assets/nerd.gif';
import '../Home/style.css'
import 'bootstrap/dist/css/bootstrap.css';



function Home() {
    return (
        <section>
            <div>
                <h1><strong>Know It All</strong></h1>
                <img id="home-pic" src={homePic} />
                <p>The Equivalent Of "Are You Smarter Than A 5th Grader?"</p>
            </div>
            <div className="categories">
                <Categories />
            </div>


            <div className="scores">
                <Scores />
            </div>

        </section>
    );
};

export default Home;
