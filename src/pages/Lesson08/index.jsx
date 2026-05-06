import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart08";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const tagSet = new Set(); //tagを重複なしで保管
  for(let item of input){
    item.tags.sort();
    for(const tag of item.tags){
      tagSet.add(tag);
    }
  }
  const count = {} //全tagの各tagとの関連している数
  for(let i of tagSet){
    count[i] = {};
    for(let j of tagSet){
        count[i][j] = 0; //初期化
    }
  }
  for(let item of input){
    const n = item.tags.length;
    for (let j = 0; j < n; ++j) {
      for (let i = 0; i < j; ++i) {
        count[item.tags[i]][item.tags[j]] += 1; //数を数える
      }
    }
  }
  const links = [];
  for(const tag1 of tagSet){
    for(const tag2 of tagSet){
      if(count[tag1][tag2] >= 2 && tag1 < tag2){ //関連が1個以下と入れ替えた要素の牽制
        links.push({
          source:tag1,
          target: tag2
        });
      }
    }
  }
  const nodeSet = new Set();//2個以上入るものの牽制
  for(const {source,target} of links){
    nodeSet.add(source);
    nodeSet.add(target);
  } 
  const nodes = Array.from(nodeSet).map(tag =>{
    return {
      id: tag
    };
  });
  return {nodes, links};
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer08"
      convertData={convertData}
      dataUrl="data/qiita-articles.json"
      instruction={instruction}
      title="Lesson 08"
      Chart={Chart}
    />
  );
};

export default Lesson;
