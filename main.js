import './style.css'
import gsap from "gsap";
import lottie from 'lottie-web';
import ScrollTrigger from "gsap/ScrollTrigger"; // プラグインを正しく読み込んでいるか確認
gsap.registerPlugin(ScrollTrigger);

const ScrollLottie = (obj) => {
  let anim = lottie.loadAnimation({
      container: document.querySelector(obj.target),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: obj.path,
  });

  let timeObj = { currentFrame: 0 };
  let endString =
      obj.speed === "slow"
          ? "+=2000"
          : obj.speed === "medium"
            ? "+=1000"
            : obj.speed === undefined
              ? "+=1250"
              : "+=500";
  ScrollTrigger.create({
      trigger: obj.target,
      scrub: true,
      markers: true,
      // pin: true,
      start: "top top",
      end: endString,
      onUpdate: (self) => {
          if (obj.duration) {
              gsap.to(timeObj, {
                  duration: obj.duration,
                  currentFrame: Math.floor(
                      self.progress * (anim.totalFrames - 1),
                  ),
                  onUpdate: () => {
                      anim.goToAndStop(timeObj.currentFrame, true);
                  },
                  ease: "expo",
              });
          } else {
              anim.goToAndStop(
                  self.progress * (anim.totalFrames - 1),
                  true,
              );
          }
      },
  });
};

ScrollLottie({
  target: "#animationWindow",
  path: "./sample_01.json",
  duration: 1,
  speed: "slow",
});