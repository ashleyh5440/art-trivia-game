import { useState } from 'react';
import Categories from '../../components/Categories';
import homePic from '../../assets/nerd.gif';
import '../Home/style.css'

function Home() {
    return (
        <section>
            <div>
                <h1>Know It All</h1>
                <img id="home-pic" src={homePic} />
                <p>Trivia Game</p>
            </div>
            <div className="categories">
                <Categories />
            </div>
        </section>
    );
};

export default Home;