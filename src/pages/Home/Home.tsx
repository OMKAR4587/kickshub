import Hero from "../../components/Home/Hero"
import FeaturedProduct from "../../components/Home/FeaturedProduct"
import Categories from "../../components/Home/Categories"
import NewArrivals from "../../components/Home/NewArrivals"
import Benefits from "../../components/Home/Benefits"

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProduct />
      <Categories/>
      <NewArrivals/>
      <Benefits/>
    </>
  )
}

export default Home