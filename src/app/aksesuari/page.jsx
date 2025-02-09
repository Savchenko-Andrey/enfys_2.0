import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import PriceList from "@/libs/pages/components/price-list/price-list";

export default async function PagePrice() {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000', { cache: 'no-cache' })).json();

  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();

  var doshoviki = data.filter(product => product?.attributes?.category === 'ДОЩОВИКИ');
  var moskitniSitki = data.filter(product => product?.attributes?.category === 'МОСКІТНІ СІТКИ');
  var sumkiTaTermosumki = data.filter(product => product?.attributes?.category === 'СУМКИ ТА ТЕРМОСУМКИ');
  var konverti = data.filter(product => product?.attributes?.category === 'КОНВЕРТИ');
  var mufti = data.filter(product => product?.attributes?.category === 'МУФТИ');


  const list = [...doshoviki, ...moskitniSitki, ...sumkiTaTermosumki, ...konverti, ...mufti];

  return (
    <>
    <HeroCards />
      <PriceList data={list} dollar={dollar} />
    </>
  );
}
