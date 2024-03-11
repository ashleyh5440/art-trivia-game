import Categories from '../../components/Categories';
import homePic from '../../assets/nerd.gif';
import '../Home/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';

function Home() {
    return (
        <section className="home-page">
            <div>
                <h1 className="animate__animated animate__slideInDown"><strong>Know It All</strong></h1>
                <img id="home-pic" src={homePic} />
                <p className="animate__animated animate__flipInX animate__delay-3s">Trivia Game</p>
            </div>
            <div className="categories">
                <Categories />
            </div>
        </section>
    );
};

export default Home;
