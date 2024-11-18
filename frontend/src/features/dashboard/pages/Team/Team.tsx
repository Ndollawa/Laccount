import React, { useState, useEffect, useTransition } from 'react';
import LightGallery from 'lightgallery/react';
import { useDispatch, useSelector } from 'react-redux';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import Swal from 'sweetalert2';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import MainBody from '../../components/MainBody'
import CreateTeamForm from './components/CreateTeamForm'
import EditTeamForm from './components/EditTeamForm'
import {useGetTeamsQuery,useDeleteTeamMutation } from './slices/teamsApi.slice'
import { setPreloader } from '@components/preloader/slices/preloader.slice'
import PageProps from '@props/pageProps'
import { ModalDataProps } from '@props/modalProps';
import GeneralPreloader from '@components/preloader/GeneralPreloader';
import DataTableComponent from '@components/DataTableComponent';   
import TeamProps from '@props/teamProps'
import showToast from '@utils/showToast';
    const TEAM_ASSETS = import.meta.env.VITE_TEAM_ASSETS;
   
    const Team = ({ pageData }: PageProps) => {
    
      const [modalData, setModalData] = useState<ModalDataProps<TeamProps>["modalData"]>({
        data: null,
        showModal: false,
      });
      const [isPending, startTransition] = useTransition();
      const dispatch = useDispatch();
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
      const [deleteTeam, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }]:any = useDeleteTeamMutation()

      const showEditForm = (modalData: ModalDataProps<TeamProps>["modalData"]) => {
        setModalData(modalData);
      };
      // Function to handle delete slide
      const onDeleteTeam = async (id: string) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
               await deleteTeam({ id: id })
             if (isDelError) return showToast('error', JSON.stringify(delError?.data));
            Swal.fire('Deleted!', 'Team record has been deleted.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Operation aborted, entry is safe :)', 'error');
          }
        });
      };
 
    
      const tableHead = ["S/N", "Image","Name", "Position", "Bio",  "Status","Date Created", "Action"];
      const renderTeamStatus = (status: string) => {
        switch (status) {
          case 'PENDING':
            return <span className="badge badge-primary">{status}</span>;
          case 'ACTIVE':
            return <span className="badge badge-success">{status}</span>;
          case 'INACTIVE':
            return <span className="badge badge-warning">{status}</span>;
          default:
            return null;
        }
      };
    
      const slots = {
        1: (data: any, row: any) => (
          <LightGallery plugins={[lgZoom]}>
            <a href={`${TEAM_ASSETS}${row.image}`} data-lightbox={`image-${row.id}`} data-exthumbimage={TEAM_ASSETS + row.image} data-src={TEAM_ASSETS + row.image} data-title={row.title}>
              <img src={`${TEAM_ASSETS}${row.image}`} alt={row.title} width="150" />
            </a>
          </LightGallery>
        ),
        // 4: (data: any, row: any) => (
        //   <div className="text-wrap text-left w-40" dangerouslySetInnerHTML={{ __html: row.body }}></div>
        // ),
        6: (data, row) => <div>
                {row.status ? renderTeamStatus(row.status) : 'No Status Available'}
              </div>, 
        7: (data: any, row: any) => (
          <div className="d-flex">
            <button type="button" className="btn btn-info light shadow btn-xs sharp me-1" onClick={() => showEditForm({ data: row.team, showModal: true })}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={() => onDeleteTeam(row.team.id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      };
    
      const teamTableData =  teams?.entities && Object.values(teams?.entities)?.map((team: TeamProps, i: number) =>( {
        i:(i + 1),
        image:team.image,
        name:team?.firstName+" "+team?.lastName,
        position:team.position,
        bio:team.bio,
        status:team.status,
        createdAt:  new Date(team?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' }),
        team:team
    })) || [];
    
      const tprops = {
        data: teamTableData,
        slots,
        options: {
        columns: [
                { data: 'i', name: 'i', width:'5%' },
                { data: 'image',name:'image', width:'15%' },
                { data: 'name',name:'name', width:'15%'  },
                { data: 'position',name:'position', width:'15%'  },
                { data: 'bio', name:'bio', width:'30%' },
                { data: 'status',name:'status', width:'5%'  },
                { data: 'createdAt',name:'createdAt', width:'5%'  },
                { data: 'team', name:'actions', width:'10%' },
              ],
          autoWidth: true,
          processing: true,
          scrollX: true,
          scrollY: 'true',
          stateSave: true,
          select: false,
        },
      };
      return (
        <>
          <MainBody>
            <div className="container-fluid">
              <div className="col-12 mt-5">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Team Members</h4>
                  </div>
                  <div className="card-body">
                    <div className="mb-5 d-flex">                                    
                        <CreateTeamForm/>
                    </div>
                        <EditTeamForm modalData={modalData}/>
                    <div className="table-responsive table-scrollable">
                      {isPending ? <GeneralPreloader /> : <DataTableComponent tableHead={tableHead} dataTableProps={tprops} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MainBody>
        </>
      );
    };
    
    export default React.memo(Team);
    