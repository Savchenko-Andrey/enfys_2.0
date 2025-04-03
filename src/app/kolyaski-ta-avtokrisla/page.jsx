import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import PriceList from "@/libs/pages/components/price-list/price-list";



export default async function PagePrice() {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000')).json();
  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();

  var universalniKolyaski = data.filter(product => product?.attributes?.category === 'УНІВЕРСАЛЬНІ КОЛЯСКИ');
  var progulyankoviKolyaski = data.filter(product => product?.attributes?.category === 'ПРОГУЛЯНКОВІ КОЛЯСКИ');
  var avtokrisla = data.filter(product => product?.attributes?.category === 'АВТОКРІСЛА');
  var kolyaskiDlyaDvijni = data.filter(product => product?.attributes?.category === 'КОЛЯСКИ ДЛЯ ДВІЙНІ');

  const list = [...progulyankoviKolyaski, ...universalniKolyaski, ...avtokrisla, ...kolyaskiDlyaDvijni];

  return (
    <>
      <HeroCards />
      <PriceList data={list} dollar={dollar} />
    </>
  );
}
