import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  for(const item of input){
    const d = new Date(`${item.createdAt} UTC`);
    const j = d.getTime() + 9 * 60 * 60 * 1000;
    item.createdAt = new Date(j).toISOString().slice(0,10);
  }
  const count = {};
  for(const item of input){
    if(!count[item.createdAt]){
      count[item.createdAt] = {tweet: 0,retweet: 0};
    }
    if(item.isRetweet){
      count[item.createdAt]["retweet"]++;
    }else{
      count[item.createdAt]["tweet"]++;
    }
  }
 /* const tw = Object.entries(count).map(([date,value]) =>{
    return{
      x: date,
      y: value.tweet
    }
  })
  const rtw = Object.entries(count).map(([date,value]) =>{
    return{
      x: date,
      y: value.rtweet
    }
  })  
  return [{id: "tweet",data: tw,},{id: "retweet",data:rtw}];*/
  return ["tweet","retweet"].map(item =>{
    return{
      id: item,
      data: Object.entries(count).map(([date,value]) =>{
        return{
          x: date,
          y: value[item]
        }})
      }        
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
