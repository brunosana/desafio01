const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url , techs } = request.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoID = repositories.findIndex(repo => repo.id == id);
  if (repoID < 0 ){
    return response.status(400).json({message: "Not found"});
  }
  const {title, url, techs} = request.body;

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoID].likes
  }
  repositories[repoID] = repo;
  return response.json(repositories[repoID]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoID = repositories.findIndex(repo => repo.id == id);
  if (repoID < 0 ){
    return response.status(400).json({message: "Not found"});
  }
  repositories.splice(repoID, 1);
  return response.status(204).json({})
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoID = repositories.findIndex(repo => repo.id == id);
  if (repoID < 0 ){
    return response.status(400).json({message: "Not found"});
  }
  repositories[repoID].likes += 1;
  return response.json(repositories[repoID]);
});

module.exports = app;
