import React from "react";
import { GetServerSideProps, NextPage } from "next";
import SuperAdminLayout from "layout/superadmin.layout";

import HeroSection from "./hero.section";
import FeatureSection from "./feature.section";
import AboutSection from "./about.section";
import AwardSection from "./award.section";
import Theme from "./theme";

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { landingPage: any };
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page`);
  const { landingPage } = await res.json();

  return {
    props: {
      landingPage,
    },
  };
};

interface LandingPageProps {
  landingPage: any;
}

const LandingPageUpdate: NextPage<LandingPageProps> = ({ landingPage }) => {
  return (
    <SuperAdminLayout title="Update App" tab={9}>
      <div>
        <HeroSection />
        <FeatureSection feature={landingPage.feature} />
        <AboutSection about={landingPage.about} />
        <AwardSection award={landingPage.award} />
        <Theme theme={landingPage.theme.lightTheme} />
      </div>
    </SuperAdminLayout>
  );
};

export default LandingPageUpdate;
