import { Loader } from "components";
import dynamic from "next/dynamic";

const LandingPageHero = dynamic(() =>
  import("sections").then((el) => el.LandingPageHero)
);
const Section1 = dynamic(() => import("sections").then((el) => el.Section1), {
  loading: () => <Loader />,
});
const Section2 = dynamic(() => import("sections").then((el) => el.Section2), {
  loading: () => <Loader />,
});
const Section3 = dynamic(() => import("sections").then((el) => el.Section3), {
  loading: () => <Loader />,
});
const Section4 = dynamic(() => import("sections").then((el) => el.Section4), {
  loading: () => <Loader />,
});

export default function Home() {
  return (
    <>
      <LandingPageHero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}
