import IntegrationSection from "./IntegrationSection";
import MobileResponsivenessSection from "./MobileResponsiveSection";
import PlatformsSection from "./PaltformsSection";
import PricingSection from "./PricingSection";
import SeamlessIntegration from "./SystemIntegrationHero";
import SystemIntegrationInfo from "./SystemIntegrationInfo";
import WhatWeDesignSection from "./whatWeDesign";


const SystemIntegration = () => {
    return (
        <div>
            <SeamlessIntegration />
            <SystemIntegrationInfo />
            <PlatformsSection/>
            <IntegrationSection/>
            <MobileResponsivenessSection/>
            <PricingSection/>
            <WhatWeDesignSection/>
        </div>
    );
    
};

export default SystemIntegration;