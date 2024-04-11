import Vara from "vara";
var vara = new Vara(
    "#container",
    "./fonts/font.json",
    [
      {
        text: "Lisset Mis XV años",
        textAlign: "center",
        strokeWidth: 2.5,
        color: "#fff",
        y: 80,
        duration: 2500,
        id: "sphinx",
      },
    //   {
    //     text: " Cada día es un sueño que se puede tocar, cada día es un amor que sepuede sentir, cada día es una razón para vivir, con la bendición deDios y el amor de mi familia me siento muy feliz de llegar a este díatan especial en mi vida, gracias por formar parte de él",
    //     width: 500,
    //     strokeWidth: 2.5,
    //     y: 40,
    //     x: 80,
    //     duration: 4000,
    //   },
    //   {
    //     text: "Sphinx of black quartz, judge my vow.",
    //     strokeWidth: 2,
    //     color: "blue",
    //     id: "sphinx",
    //     autoAnimation: false,
    //     x: 80,
    //     duration: 4500,
    //   },
    ],
    {
      fontSize: 76,
    }
  );
  vara.ready(function () {
    vara.draw("sphinx");
  });