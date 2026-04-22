import { Composition } from "remotion";
import "./fonts";
import { ReelHero } from "./compositions/ReelHero";
import { ReelRobot } from "./compositions/ReelRobot";
import { ReelVideo } from "./compositions/ReelVideo";
import { ReelStats } from "./compositions/ReelStats";
import { ReelBTS } from "./compositions/ReelBTS";
import { ReelCTA } from "./compositions/ReelCTA";
import { CardOne } from "./compositions/CardOne";
import { CardTwo } from "./compositions/CardTwo";
import { CardThree } from "./compositions/CardThree";
import { CardFour } from "./compositions/CardFour";
import { CardFive } from "./compositions/CardFive";
import { CardSix } from "./compositions/CardSix";
import { CardSpecHardware } from "./compositions/CardSpecHardware";
import { CardSpecSoftware } from "./compositions/CardSpecSoftware";
import { CardSpecGestures } from "./compositions/CardSpecGestures";
import { CardSpecDances } from "./compositions/CardSpecDances";
import { CardSpecController } from "./compositions/CardSpecController";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="reel-01-hero"
        component={ReelHero}
        durationInFrames={6 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="reel-02-robot"
        component={ReelRobot}
        durationInFrames={8 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="reel-03-video"
        component={ReelVideo}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="reel-04-stats"
        component={ReelStats}
        durationInFrames={6 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="reel-05-bts"
        component={ReelBTS}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="reel-06-cta"
        component={ReelCTA}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-one"
        component={CardOne}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-two"
        component={CardTwo}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-three"
        component={CardThree}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-four"
        component={CardFour}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-five"
        component={CardFive}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-six"
        component={CardSix}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-spec-hardware"
        component={CardSpecHardware}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-spec-software"
        component={CardSpecSoftware}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-spec-gestures"
        component={CardSpecGestures}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-spec-dances"
        component={CardSpecDances}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="card-spec-controller"
        component={CardSpecController}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
