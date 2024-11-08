// 도넛 가챠~~
export default function getRandomDonut() {
  const DONUT_URL = [
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/boss.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/angry_choco.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/choco.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/choco_ring.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/cute_strawberry.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/egg.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/glazed.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/happy_soda.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/lemon.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/pistachio.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/smile_lemon.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/soda.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/strawberry.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1006/strawberry2.png',
  ];

  const getRandomDonutImage = () => {
    const randomIndex = Math.floor(Math.random() * DONUT_URL.length);
    return DONUT_URL[randomIndex];
  };

  const randomDonut = getRandomDonutImage();

  return randomDonut;
}
