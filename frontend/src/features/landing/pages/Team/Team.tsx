import React from 'react'
import PageProps from '../../../../app/props/PageProps'
import Breadcrum from '../../components/Breadcrum'
import { useGetTeamsQuery } from '../../../dashboard/pages/Team/slices/teamsApi.slice'
import TeamProps from '../../../../app/props/TeamProps'
import TeamMemberCard from './components/TeamMemberCard'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Team:React.FC<PageProps> = ({pageData}:PageProps) => {

   const { team } = useGetTeamsQuery("teamsList", {
            selectFromResult: ({ data }) => ({
              team: data?.ids?.map((id:string)=>data?.entities[id])		 
            }),
            }) 
    return (
      <>
  <Breadcrum pageData={pageData}/>

<section className="team-grid pt-120 pb-120">
    <div className="container">
        <div className="row row-gutter-y-30 g-5">
            {
                team && team.map((t:TeamProps)=>(<TeamMemberCard key={t.id} member={t} />))
            }
          
        </div>
        {/* <!-- /.row --> */}
    </div>
    {/* <!-- /.container --> */}
</section>
{/* <!-- /.team-grid --> */}

    </>
  )
}

export default React.memo(Team)
