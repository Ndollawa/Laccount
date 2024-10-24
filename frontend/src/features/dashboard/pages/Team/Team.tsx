import React,{useState,useEffect} from 'react'
import MainBody from '../../components/MainBody'
import CreateFaqModal from './components/CreateTeamForm'
import EditTeamForm from './components/EditTeamForm'
import { useDispatch } from 'react-redux'
import { useGetTeamsQuery } from './slices/teamsApi.slice'
import { setPreloader } from '../../../components/preloader/slices/preloader.slice'
import PageProps from '../../../../app/props/PageProps'
import TeamTableData from './components/TeamTableData'    
import $ from 'jquery'
import initDataTables,{destroyDataTables} from '../../../../app/utils/initDataTables'   
import TeamProps from '../../../../app/props/TeamProps'

interface modalDataProps {
       data:TeamProps | null,
      showModal:boolean,
    }
    const Team = ({pageData}:PageProps)  => {
        const dispatch =useDispatch()
        const [modalData,setModalData] = useState<modalDataProps>({
            data:null, 
            showModal:false,
           })
    const {
        data:teams,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTeamsQuery('teamList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const showEditForm = (modalData:modalDataProps)=>{
        setModalData(modalData);
        }

        useEffect(() => {
            dispatch(setPreloader(isLoading?true:false)) 
             
            }, [isLoading])
 useEffect(() => {

            destroyDataTables($('#dataTable'))
              initDataTables($('#dataTable'),"Our Team")
            return () => {
             destroyDataTables($('#dataTable'))
            }
          }, [teams])    

    
    let tableContent
    if (isSuccess) {
        const { ids } = teams
    
        tableContent = ids?.length
            ? ids.map((teamId:string|number ,i:number) => <TeamTableData key={teamId} teamId={teamId} index={i}
            showEditForm={showEditForm} />
        )
            : null
         
    }
    
     return (
        <>
        <MainBody>
        <div className="container-fluid">
            <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">All Teams</h4>
                                </div>
                                <div className="card-body">
    
                                    <div className="mb-5 d-flex">
                                    
                        <CreateFaqModal/>
                        <EditTeamForm modalData={modalData}/>
                                    </div>
                            <div className="table-responsive table-scrollable">
                                        <table id="dataTable" className="table table-striped mt-10 table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Position</th>
                                                    <th>Bio</th>
                                                    <th>Status</th>
                                                    {/* <th>Status</th> */}
                                                    <th>Date Created</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                               
                                               {tableContent}
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div>
        </MainBody>
        </>
      )
    }
    

export default React.memo(Team)