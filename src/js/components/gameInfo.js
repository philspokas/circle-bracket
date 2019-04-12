import { createImageUrlFromLogo } from "../utils";
import teams from "../../data/teams";

export default (game, displaySeeds = false, id = "info") => {
  const root = document.createElement("div");
  root.id = id;
  root.className = "game-info";

  const t1 = document.createElement("div");
  t1.className = "team team-1";
  const t1Img = document.createElement("img");
  t1Img.src = createImageUrlFromLogo(teams[game.home.code].logo.url)[0];
  const t1Title = document.createElement("div");
  t1Title.className = "title";
  let t1Name = document.createElement("h1");
  t1Name.innerText = teams[game.home.code].name;
  if (displaySeeds) {
    t1Name.innerText += ` (${game.home.seed})`;
  }
  const t1Mascot = document.createElement("h2");
  t1Mascot.innerText = teams[game.home.code].mascot;
  t1Title.appendChild(t1Name);
  t1Title.appendChild(t1Mascot);
  t1Title.style.color = teams[game.home.code].primaryColor;
  const t1Score = document.createElement("h1");
  t1Score.innerText = game.home.score;
  t1Score.className = game.home.winner ? "score winner" : "score";
  t1.appendChild(t1Img);
  t1.appendChild(t1Title);
  t1.appendChild(t1Score);

  const t2 = document.createElement("div");
  t2.className = "team team-2";
  const t2Img = document.createElement("img");
  t2Img.src = createImageUrlFromLogo(teams[game.away.code].logo.url)[0];
  const t2Title = document.createElement("div");
  t2Title.className = "title";
  let t2Name = document.createElement("h1");
  t2Name.innerText = teams[game.away.code].name;
  if (displaySeeds) {
    t2Name.innerText += ` (${game.away.seed})`;
  }
  const t2Mascot = document.createElement("h2");
  t2Mascot.innerText = teams[game.away.code].mascot;
  t2Title.appendChild(t2Name);
  t2Title.appendChild(t2Mascot);
  t2Title.style.color = teams[game.away.code].primaryColor;
  const t2Score = document.createElement("h1");
  t2Score.className = "score";
  t2Score.innerText = game.away.score;
  t2Score.className = game.away.winner ? "score winner" : "score";
  t2.appendChild(t2Img);
  t2.appendChild(t2Title);
  t2.appendChild(t2Score);

  const meta = document.createElement("div");
  meta.className = "meta";

  if (game.location) {
    const locElem = document.createElement("p");
    locElem.innerText = game.location;
    meta.appendChild(locElem);
  }

  if (game.date) {
    const date = new Date(game.date);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const day = date.getDate();
    const year = date.getFullYear();
    let dateElem = document.createElement("p");
    dateElem.innerText = `${month} ${day}, ${year}`;
    meta.appendChild(dateElem);
  }

  if (game.link.length) {
    const linkElem = document.createElement("p");
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = game.link;
    link.innerHTML = "View Game Summary";
    linkElem.appendChild(link);
    meta.appendChild(linkElem);
  }

  const close = document.createElement("div");
  close.innerText = "×";
  close.className = "close";
  close.title = "Close";

  root.appendChild(t1);
  root.appendChild(t2);
  root.appendChild(meta);
  root.appendChild(close);

  return root;
};
