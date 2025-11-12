
import OrbitOpsLanding from "./Future";
import HeroBanner from "./HeroBanner";

import ProcessSection from "./Process";
import ServicesSection from "./Service";



const Home = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <HeroBanner/>
            <ServicesSection/>
            <ProcessSection/>
            <OrbitOpsLanding/>
           
        </div>
    );
};

export default Home;