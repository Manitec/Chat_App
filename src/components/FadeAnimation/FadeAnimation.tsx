import { FadeIn } from "react-slide-fade-in";

interface FadeAnimationProps {
  children: string | JSX.Element | JSX.Element[] | "() => JSX.Element";
}

const FadeAnimation: React.FC<FadeAnimationProps> = ({ children }) => {
  return (
    <FadeIn
      from="top"
      positionOffset={200}
      triggerOffset={-100}
      delayInMilliseconds={300}
      durationInMilliseconds={500}
    >
      {children}
    </FadeIn>
  );
};

export default FadeAnimation;
