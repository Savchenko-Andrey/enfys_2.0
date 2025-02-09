import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import PriceList from "@/libs/pages/components/price-list/price-list";

export default async function PagePrice() {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000', { cache: 'no-cache' })).json();

  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();

  var lizhechka = data.filter(product => product?.attributes?.category === 'ЛІЖЕЧКА');
  var komodiPelenatori = data.filter(product => product?.attributes?.category === 'КОМОДИ-ПЕЛЕНАТОРИ');
  var krislaGojdalki = data.filter(product => product?.attributes?.category === 'КРІСЛА-ГОЙДАЛКИ');
  var manezhi = data.filter(product => product?.attributes?.category === 'МАНЕЖИ');
  var stilchikiDlyaGoduvannya = data.filter(product => product?.attributes?.category === 'СТІЛЬЧИКИ ДЛЯ ГОДУВАННЯ');


  const list = [...lizhechka, ...komodiPelenatori, ...krislaGojdalki, ...manezhi, ...stilchikiDlyaGoduvannya];

  return (
    <>
    <HeroCards />
      <PriceList data={list} dollar={dollar} />
    </>
  );
}
