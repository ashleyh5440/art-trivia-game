import { useState } from 'react';
import Categories from '../../components/Categories';
import homePic from '../../assets/nerd.gif';

// import Art from '../../components/Categories/Art/index'; 
// import Books from '../../components/Categories/Books/index'; 
// import Computers from '../../components/Categories/Computers/index'; 
// import Film from '../../components/Categories/Film/index'; 
// import History from '../../components/Categories/History/index';
// import ScienceNature from '../../components/Categories/ScienceNature/index'; 
// import Sports from '../../components/Categories/Sports/index';  
// import TV from '../../components/Categories/TV/index'; 

function Home() {
    return (
        <section>
            <div>
                <h1>Know It All</h1>
                <img src={homePic} />
            </div>
            <div>
                <Categories />
            </div>
        </section>
    );
};

export default Home;