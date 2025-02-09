import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import PriceList from "@/libs/pages/components/price-list/price-list";

export default async function PagePrice() {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000', { cache: 'no-cache' })).json();

  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();

  var postilniKomplekti = data.filter(product => product?.attributes?.category === 'ПОСТІЛЬНІ КОМПЛЕКТИ');
  var matraciTaNamatracniki = data.filter(product => product?.attributes?.category === 'МАТРАЦИ ТА НАМАТРАЦНИКИ');
  var kovdriTaPledi = data.filter(product => product?.attributes?.category === 'КОВДРИ ТА ПЛЕДИ');
  var podushki = data.filter(product => product?.attributes?.category === 'ПОДУШКИ');

  const list = [...postilniKomplekti, ...matraciTaNamatracniki, ...kovdriTaPledi, ...podushki];

  return (
    <>
      <HeroCards />
      <PriceList data={list} dollar={dollar} />
    </>
  );
}
