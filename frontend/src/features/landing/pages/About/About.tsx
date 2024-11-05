import React from 'react'
import { useSelector } from 'react-redux'
import { useLandingConfig } from '@dashboard/pages/Settings/slices/settings.slice'
import PageProps from '@props/PageProps'
import Breadcrum from '../../components/Breadcrum'
import CTASection from '../Home/Components/CTASection'
import { LandingConfig } from '@props/settingsProps'
import { useGetTeamsQuery } from '@dashboard/pages/Team/slices/teamsApi.slice'
import TeamMemberCard from '../Team/components/TeamMemberCard'
import TeamProps from '@props/teamProps'
import PerformanceMetric from '../../components/PerformanceMetric'
import BrandPartners from '../../components/BrandPartners'
import Testimonial from '../Home/Components/Testimonial'
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const About:React.FC<PageProps> = ({pageData}:PageProps) => {
    
const {settings:{landingPageConfig: { showTeam, showTestimonial, showPartners, showMetrics }={}, siteImages:{aboutUsBg, backgroundImage}={}, pages:{aboutUs}={}}={}} = useSelector(useLandingConfig); 
const { team } = useGetTeamsQuery("teamsList", {
    selectFromResult: ({ data }) => ({
      team: data?.ids?.map((id:string)=>data?.entities[id])		 
    }),
    })   

return (
    <>
<Breadcrum pageData={pageData}/>
<section className="about-two pt-120 pb-120">
    <div className="container">
        <div className="row row-gutter-y-50">
            <div className="col-lg-6">
                <div className="about-two__image">
                    <img src={BRAND_ASSETS+aboutUsBg} alt=""/>
                </div>
                {/* <!-- /.about-two__image --> */}
            </div>
            {/* <!-- /.col-lg-6 --> */}
            <div className="col-lg-6">
                <div className="about-two__content">
                    <div className="block-title text-left">
                        <p className="block-title__tagline">About Company</p>
                        {/* <!-- /.block-title__tagline --> */}
                        <h2 className="block-title__title">Get to know about our company</h2>
                        
                        {/* <!-- /.block-title__title --> */}
                    </div>
                    {/* <!-- /.block-title --> */} 
                    <p className="about-two__text" dangerouslySetInnerHTML={{__html:aboutUs as string}} ></p>
                    
                </div>
                {/* <!-- /.about-two__content --> */}
            </div>
            {/* <!-- /.col-lg-6 --> */}
        </div>
        {/* <!-- /.row --> */}
    </div>
    {/* <!-- /.container --> */}
</section>
{/* <!-- /.about-two --> */}
<CTASection/>
{showTestimonial && <Testimonial/>}
 {/* <!-- /.testimonials-one --> */}
{showMetrics && <PerformanceMetric/>}
 {/* <!-- /.fact-one --> */}
 {  showTeam && 
<section className="team-about pt-120 pb-120">
    <div className="container">
        <div className="block-title text-center">
            <p className="block-title__tagline">professional team</p>
             {/* <!-- /.block-title__tagline --> */}
            <h2 className="block-title__title">Meet the highly qualified <br/> team members</h2>
            
             {/* <!-- /.block-title__title --> */}
        </div>
         {/* <!-- /.block-title --> */}
        <div className="row row-gutter-y-30">
        
             {
             team && team.map((t:TeamProps)=>(<TeamMemberCard key={t.id} member={t} />))
            }
            {/* <!-- /.col-lg-4 col-md-6 col-sm-12 --> */}
        </div>
        {/* <!-- /.row --> */}
    </div>
    {/* <!-- /.container --> */}
</section>}
 {/* <!-- /.team-about --> */}
{showPartners && <BrandPartners/>
}
 {/* <!-- /.client-carousel --> */}
    </>
  )
}

export default React.memo(About)
