import Hero from "@/libs/components/hero/Hero";
import About from "@/libs/components/about/about";
import Description from "@/libs/components/description/description";
import Contacts from "@/libs/components/section-contacts/section-contacts";
import Partners from "@/libs/components/partners/partners";
import NewDevelopment from "@/libs/components/new-development/new-development";

export default async function Home() {

  var { data } = await (await fetch('https://www.admin-enfys.space/api/tests?populate=*&pagination[pageSize]=1000', { cache: 'no-cache' })).json();

  var { data: { attributes: { dollar } } } = await (await fetch('https://www.admin-enfys.space/api/course', { cache: 'no-cache' })).json();


  var newArrivals = data.filter(product => product?.attributes?.newArrivals === true);
  var bestSellers = data.filter(product => product?.attributes?.bestSellers === true);

  return (
    <>
      <Hero />
      <NewDevelopment newArrivals={newArrivals} bestSellers={bestSellers} dollar={dollar} dataBase={data} />
      <About />
      <Partners />
      <Description />
      <Contacts />
    </>
  );
}
