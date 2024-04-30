import Hero from "@/libs/components/hero/Hero";
import AboutCardsGallery from "@/libs/pages/components/about-cards-gallary/about-cards-gallary";
import AboutCards from "@/libs/pages/components/about-cards/about-cards";
import Advantages from "@/libs/pages/components/advantages/advantages";
import Card from "@/libs/pages/components/card-about-colors/card";
import Conditions from "@/libs/pages/components/conditions/conditions";
import TableCards from "@/libs/pages/components/table-cards/table-cards";

export default async function PageCard(id) {
  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*', { cache: 'no-cache' })).json();
  
  return (
    <>
      <Hero />
      <AboutCardsGallery data={data} id={id} />
      <Conditions />
      <AboutCards data={data} id={id} />
      {/* <Advantages /> */}
      <TableCards data={data} id={id} />
      <Card />
    </>
  );
}
