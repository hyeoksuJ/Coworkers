import angryChoco from '@images/angry_choco.png';
import boss from '@images/boss.png';
import chocoRing from '@images/choco_ring.png';
import choco from '@images/choco.png';
import cuteStrawberry from '@images/cute_strawberry.png';
import egg from '@images/egg.png';
import glazed from '@images/glazed.png';
import happySoda from '@images/happy_soda.png';
import lemon from '@images/lemon.png';
import pistachio from '@images/pistachio.png';
import smileLemon from '@images/smile_lemon.png';
import soda from '@images/soda.png';
import strawberry from '@images/strawberry.png';
import strawberry2 from '@images/strawberry2.png';

// 도넛 가챠~~
export default function getRandomDonut() {
  const DONUT_ARRAY = [
    angryChoco,
    boss,
    chocoRing,
    choco,
    cuteStrawberry,
    egg,
    glazed,
    happySoda,
    lemon,
    pistachio,
    smileLemon,
    soda,
    strawberry,
    strawberry2,
  ];

  const getRandomDonutImage = () => {
    const randomIndex = Math.floor(Math.random() * DONUT_ARRAY.length);
    return DONUT_ARRAY[randomIndex].src;
  };

  const randomDonut = getRandomDonutImage();

  return randomDonut;
}
