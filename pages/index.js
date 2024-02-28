import Searchhome1 from "@/components/searchhome1";
import Searchcategory from "@/components/searchcategory";
import Featuerdjob from "@/components/featuerdjob";
import Opportunity from "@/components/opportunity";
import { Image } from "react-bootstrap";
import axios from "axios";
export default function Home(props) {

  return (
    <>
      <main>
        <Searchhome1 locations={props.dataLocation} />
        <Searchcategory category={props.dataCategory} />
        <section className="bg-featuerd"> <Featuerdjob allData={props.getAllData} /> </section>
        <section>
          <Image src="/images/perry.webp" width={"100%"} />
        </section>
        <section className="bg-yellow py-5">
          <Opportunity locations={props.dataLocation} category={props.dataCategory} />
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  var { query } = context;
  var keyword = query?.keyword || '';
  var location = query?.location || '';
  var category = query?.category || '';

  var params = {};
  params.keyword = keyword;
  params.location = location;
  params.category = category;
  params.t1 = "Web Location";
  params.t1Category = "Web Expertise";
  params.jobid = query.jobid;
  try {
    const response1 = await axios.get('http://localhost:3000/api/getRequirementid', { params });
    const RequirementID = response1.data.results[0].ID;
    params.RequirementID = RequirementID;

    const allData = await axios.get('http://localhost:3000/api/getData', { params });
    const response = await axios.get(`http://localhost:3000/api/getLocation`, { params });
    const response3 = await axios.get(`http://localhost:3000/api/getCategories`, { params });


    const getAllData = allData.data.results.slice(0, 3);
    const dataCategory = response3.data.results;
    const dataLocation = response.data.results;


    return {
      props: {
        dataLocation,
        dataCategory,
        getAllData,

      },
    };
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      dataLocation: [],
      dataCategory: [],
      getAllData: [],
    },
  };
}





