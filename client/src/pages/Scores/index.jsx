import { useState } from 'react';
import Categories from '../../components/Categories';
import homePic from '../../assets/homePic.jpg';
import '../Home/style.css'

function Home() {
    return (
        <section>
            <div>
                <h1>HIGH SCORES</h1>
                <img id="home-pic" src={homePic} />
            </div>
            <div className="categories">
                <Categories />
            </div>
        </section>
    );
};