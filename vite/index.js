import Vara from "vara";

let vara = new Vara(
  "#container",
  "./fonts/font.json",
  [
    {
      text: "Lisset Mis XV años",
      textAlign: "center",
      strokeWidth: 2.5,
      color: "#ffffff",
      y: 35,
      duration: 7500,
      id: "sphinx",
    },
  ],
  {
    fontSize: 52,
  }
);

vara.ready(function () {
  vara.draw("sphinx");
  document.getElementsByTagName("g")[0].style.filter =
    "drop-shadow(3px 5px 2px  rgba(0, 188, 128, 15))";
});

window.onresize = function () {
  location.reload();
};

let audio = document.getElementById("miAudio");

document.getElementById("startAudio").addEventListener("click", () => {
  audio.play();
});
