import axios from "axios";

export const getGames = async () => {
  const result = await axios.get(
    `https://api.rawg.io/api/games?key=857f2e5638fa4fdfa2d9a6e94af738bf&dates=2023-12-01,2023-12-31&ordering=-added`
  );
  const arr = result.data.results;
  //   console.log(result.data.results, " 게임정보");
  return arr;
};

// const fetchProjects = async ({ pageParam = 0 }) => {
//   const res = await fetch('/api/projects?cursor=' + pageParam)
//   return res.json()
// }
