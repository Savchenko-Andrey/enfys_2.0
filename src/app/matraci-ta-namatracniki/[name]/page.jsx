import NotFound from "@/app/not-found";
import AboutCardsGallery from "@/libs/pages/components/about-cards-gallary/about-cards-gallary";
import AboutCards from "@/libs/pages/components/about-cards/about-cards";
import Advantages from "@/libs/pages/components/advantages/advantages";
import Card from "@/libs/pages/components/card-about-colors/card";
import Conditions from "@/libs/pages/components/conditions/conditions";
import HeroCards from "@/libs/pages/components/hero-cards/hero-cards";
import TableCards from "@/libs/pages/components/table-cards/table-cards";
import { slugify } from 'transliteration';

export default async function PageCard({ params }) {
  var { data } = await (
    await fetch("https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000", {
      cache: "no-cache",
    })
  ).json();


  var {
    data: {
      attributes: { dollar },
    },
  } = await (
    await fetch("https://www.admin-enfys.space/api/course", {
      cache: "no-cache",
    })
  ).json();

  var name = params.name;

  var updatedData = data.map(item => {
      const ukrainianName = item.attributes.title;
      const name = slugify(ukrainianName);
      return {
        ...item,
        attributes: {
          ...item.attributes,
          link: name
        }
      };
  });
  
  var card = updatedData.filter(product => product.attributes.link === name);


  var selectedCategory = 'МАТРАЦИ ТА НАМАТРАЦНИКИ';

  return (
    <>
      {card.length !== 0 ?
        <>
          <HeroCards selectedCategory={selectedCategory} />
          <AboutCardsGallery data={card} id={name} dollar={dollar} dataBase={updatedData} />
          <Conditions />
          <AboutCards data={card} id={name} dollar={dollar} />
          {/* <Advantages /> */}
          <TableCards data={card} id={name} />
          <Card dataBase={updatedData} />
        </>
        :
        <NotFound />
      }
    </>
  );
}
