import OnboardingTimeline from "./ApplicationProcess";
import CareerHome from "./CareerHome";
import OpenPositions from "./JobPosition";
import ValuesSection from "./ValuesSection";


const Career = () => {
    return (
        <div>
            <CareerHome/>
            <OpenPositions/>
            <OnboardingTimeline/>
            <ValuesSection/>
        </div>
    );
};

export default Career;