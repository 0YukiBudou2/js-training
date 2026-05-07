import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart10";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const degree = {}; //次数
  for (const { id } of input.nodes) {
    degree[id] = 0; //すべてのidの次数を0で初期化
  }
  for (const { source, target } of input.links) {
    degree[source] += 1;
    degree[target] += 1;
  }

  const removedTags = new Set( //削除するtagの収集
    input.nodes.map(({ id }) => id).filter((tag) => degree[tag] <= 1)
  );
  const nodes = input.nodes.filter(({ id }) => !removedTags.has(id)); //removedNodeの中に入っていないノードの格納
  const links = input.links.filter(
    ({ source, target }) => !removedTags.has(source) && !removedTags.has(target)
  );//両方とも削除するものだけ消す

  const neighbors = {}; //グラフ探索用
  for (const { id } of nodes) {
    neighbors[id] = []; //
  }
  for (const { source, target } of links) {
    neighbors[source].push(target); //sourceのところにtargetを格納
  }

  const visited = new Set();
  const queue = ["福島"];
  while (queue.length > 0) {
    const u = queue.shift();
    if (visited.has(u)) {
      continue;
    }
    visited.add(u);
    for (const v of neighbors[u]) {//今見ているidに関連しているものをpushする
      queue.push(v);
    }
  }

  const maxFrequency = Math.max(
    ...input.nodes.map(({ frequency }) => frequency)
  );
  for (const node of nodes) {
    node.radius = Math.sqrt(node.frequency / maxFrequency) * 20;
    node.color = visited.has(node.id) ? "red" : "blue"; //visited(福島に関連している)に含まれているならば赤、青
  }

  return { nodes, links };
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer10"
      convertData={convertData}
      dataUrl="data/topic-graph.json"
      instruction={instruction}
      title="Lesson 10"
      Chart={Chart}
    />
  );
};

export default Lesson;
