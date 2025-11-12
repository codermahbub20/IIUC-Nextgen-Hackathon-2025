import KeyBenefits from "./Keybenifit";
import WorkFlowProcess from "./ProcessCard";
import WhatWeAutomate from "./WhatWeAutomate";
import WorkflowHero from "./WorkflowHero";
import WorkflowInfo from "./WorkflowInfo";
import PricingSection from "./WorkflowPricing";

const WorkFlowAutomation = () => {
    return (
        <div>
            <WorkflowHero/>
            <WorkflowInfo/>
            <PricingSection/>
            <WhatWeAutomate/>
            <WorkFlowProcess/>
            <KeyBenefits/>
        </div>
    );
};

export default WorkFlowAutomation;