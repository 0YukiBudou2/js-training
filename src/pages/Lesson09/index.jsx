import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart09";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const ratio = 0.01;
  const ministryCount = {};
  const ministries = Array.from(
    new Set(input.map(({ ministry }) => ministry))
  ).map((ministry) => {
    const ministryProjects = input.filter((item) => item.ministry === ministry); //その省のデータを取り出す
    const bureauCount = {};
    const bureaus = Array.from(
      new Set(ministryProjects.map(({ bureau }) => bureau)) //今回の省の中から部局を重複なしで取得
    )
      .map((bureau) => { 
        const bureauProjects = ministryProjects.filter(
          (item) => item.bureau === bureau
        ); //その部局の事業を取り出す
        const departments = Array.from(
          new Set(bureauProjects.map(({ department }) => department))
        ) //課のデータだけを抽出
          .map((department) => {
            const departmentProjects = bureauProjects.filter(
              (item) => item.department === department
            ); //課の事業
            return {
              name: department,
              count: departmentProjects.length,
            };
          })
          .filter(({ count }) => count / input.length >= ratio); //1%以上
        departments.sort((item1, item2) => item2.count - item1.count); //降順
        departments.push({
          name: "その他",
          count:
            bureauProjects.length -
            departments.reduce((a, { count }) => a + count, 0),//部局の全体から表示しているものを引くと表示しなかったものが出る
        });
        bureauCount[bureau] = bureauProjects.length;//今回の部局の事業の数をobjに保管
        return {
          name: bureau,
          children: departments,
        };
      })
      .filter(({ name }) => bureauCount[name] / input.length >= ratio);
    bureaus.sort(
      (item1, item2) => bureauCount[item2.name] - bureauCount[item1.name]
    );
    bureaus.push({
      name: "その他",
      count:
        ministryProjects.length -
        bureaus.reduce((a, { name }) => a + bureauCount[name], 0),
    });
    ministryCount[ministry] = ministryProjects.length;
    return {
      name: ministry,
      children: bureaus,
    };
  });
  ministries.sort(
    (item1, item2) => ministryCount[item2.name] - ministryCount[item1.name]
  );
  return {
    children: ministries,
  };
};
/*const convertData = (input) => {
  const total = input.length;
  const ratio = 0.01;
  const ministries = [...new Set(input.map(item =>item.ministry))] //省の重複なし配列
  const ministriesData = [];
  const makeDepartments = (project) => {
    const counts = {};
    for (const p of project) {
      counts[p.department] = (counts[p.department] || 0) + 1;
    }

    let result = Object.entries(counts).map(([name, count]) => ({
      name,
      count
    }));

  const main = result.filter(d => d.count / project.length >= ratio);

  const otherCount =
    project.length - main.reduce((sum, d) => sum + d.count, 0);

  main.sort((a, b) => b.count - a.count);
  if(otherCount > 0){
    main.push({
      name: "その他",
      count: otherCount
    });
  }

  return main;
  }
  for(const ministry of ministries){
    const ministryProjects = input.filter(item => item.ministry === ministry);
    const bureaus = [...new Set(ministryProjects.map(item =>item.bureau))] //部局の重複なし配列
    const bureausData = [];
    for(const bureau of bureaus){
      const bureauProjects = ministryProjects.filter(item => item.bureau === bureau);

      const children = makeDepartments(bureauProjects);
      bureausData.push({
        name: bureau,
        children: children,
        count: bureauProjects.length
      });
    }
    const mainBureaus = bureausData.filter(d => d.count / ministryProjects.length >= ratio);
    const otherCount = ministryProjects.length - mainBureaus.reduce((sum,b) => sum + b.count,0);
    mainBureaus.sort((a,b) => b.count - a.count);
    if(otherCount > 0){
      mainBureaus.push({
        name: "その他",
        children: [
          {name: "その他",
            count: otherCount
          }
        ]
      });
    }
    const ministryCount = ministryProjects.length;
    ministriesData.push({
      name: ministry,
      children: mainBureaus,
      count: ministryProjects.length
    });
  }
  const mainMinistries = ministriesData.filter(d => d.count / total >= ratio);

  const otherCount = total - mainMinistries.reduce((sum, d) => sum + d.count, 0);
  mainMinistries.sort((a,b) => b.count - a.count);
  if (otherCount > 0) {
    mainMinistries.push({
      name: "その他",
      children: [
        {
          name: "その他",
          count: otherCount
        }
      ]
    });
  }
  return { children: mainMinistries.map(({count,...rest}) => rest) }; // ここを作りましょう！
};*/

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer09"
      convertData={convertData}
      dataUrl="data/judgit-departments.json"
      instruction={instruction}
      title="Lesson 09"
      Chart={Chart}
    />
  );
};

export default Lesson;
