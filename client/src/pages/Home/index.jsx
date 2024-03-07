import { useState } from 'react';
import Categories from '../../components/Categories';
import Scores from '../Scores';
import homePic from '../../assets/nerd.gif';
import '../Home/style.css'

function Home() {
    return (
        <section>
            <div>
                <h1>Know It All</h1>
                <img id="home-pic" src={homePic} />
                <p>The Trivia Game To End All Trivia Games</p>
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
