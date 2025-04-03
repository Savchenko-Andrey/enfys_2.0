import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import PriceList from "@/libs/pages/components/price-list/price-list";

export default async function PagePrice() {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000', { cache: 'no-cache' })).json();

  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();

  var selectedCategory = 'ХОДУНКИ';
  var filteredProducts = data.filter(product => product?.attributes?.category === selectedCategory);

  return (
    <>
      <HeroCards selectedCategory={selectedCategory} />
      <PriceList data={filteredProducts} dollar={dollar} />
    </>
  );
}
