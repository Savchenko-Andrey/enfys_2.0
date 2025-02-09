import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import PriceList from "@/libs/pages/components/price-list/price-list";

export default async function PagePrice() {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000', { cache: 'no-cache' })).json();

  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();

  var velosipediISamokati = data.filter(product => product?.attributes?.category === 'ВЕЛОСИПЕДИ І САМОКАТИ');
  var dityachiElektromobili = data.filter(product => product?.attributes?.category === 'ДИТЯЧІ ЕЛЕКТРОМОБІЛІ');
  var begoveli = data.filter(product => product?.attributes?.category === 'БЕГОВЕЛИ');
  var hodunki = data.filter(product => product?.attributes?.category === 'ХОДУНКИ');


  const list = [...velosipediISamokati, ...dityachiElektromobili, ...begoveli, ...hodunki];

  return (
    <>
      <HeroCards />
      <PriceList data={list} dollar={dollar} />
    </>
  );
}
