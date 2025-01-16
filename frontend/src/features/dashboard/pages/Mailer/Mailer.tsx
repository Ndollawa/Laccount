import React, { useState, useEffect, useTransition } from "react";
import LightGallery from "lightgallery/react";
import { useDispatch, useSelector } from "react-redux";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import Swal from "sweetalert2";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import MainBody from "../../components/MainBody";
import {
  CreateEMailTemplateForm,
  EditEMailTemplateForm,
} from "./E-mail/components";
import {
  useGetMailTemplatesQuery,
  useDeleteMailTemplateMutation,
  useGetEMailTemplatesQuery,
  useDeleteEMailTemplateMutation,
} from "./slices/mailerApi.slice";
import { setPreloader } from "@components/preloader/slices/preloader.slice";
import PageProps from "@props/pageProps";
import { ModalDataProps } from "@props/modalProps";
import GeneralPreloader from "@components/preloader/GeneralPreloader";
import DataTableComponent from "@components/DataTableComponent";
import { MailTemplateProps, EMailTemplateProps } from "@props/mailerProps";
import showToast from "@utils/showToast";
import {
  CreateMailTemplateForm,
  EditMailTemplateForm,
} from "./Mail/components";
const SERVICE_ASSETS = import.meta.env.VITE_SERVICE_ASSETS;

const Mailer = ({ pageData }: PageProps) => {
  const [mailTemplateModalData, setMailTemplateModalData] = useState<
    ModalDataProps<MailTemplateProps>["modalData"]
  >({
    data: null,
    showModal: false,
  });
  const [emailTemplateModalData, setEMailTemplateModalData] = useState<
    ModalDataProps<EMailTemplateProps>["modalData"]
  >({
    data: null,
    showModal: false,
  });
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const {
    data: mailTemplates,
    isLoading: isLoadingMailTemplates,
    isSuccess: isSuccessMailTemplates,
    isError: isErrorMailTemplates,
    error: errorMailTemplates,
  } = useGetMailTemplatesQuery("mailerList", {
    // pollingInterval: 1500,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [
    deleteMailTemplate,
    {
      isSuccess: isDeleteMailTemplateSuccess,
      isError: isDeleteMailTemplateError,
      error: deleteMailTemplateError,
    },
  ] = useDeleteMailTemplateMutation();

  const {
    data: emailTemplates,
    isLoading: isLoadingEMailTemplates,
    isSuccess: isSuccessEMailTemplates,
    isError: isErrorEMailTemplates,
    error: errorEMailTemplates,
  } = useGetMailTemplatesQuery("mailerList", {
    // pollingInterval: 1500,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [
    deleteEMailTemplate,
    {
      isSuccess: isDeleteEMailTemplateSuccess,
      isError: isDeleteEMailTemplateError,
      error: deleteEMailTemplateError,
    },
  ] = useDeleteEMailTemplateMutation();

  const showMailTemplateEditForm = (
    modalData: ModalDataProps<MailTemplateProps>["modalData"]
  ) => {
    setMailTemplateModalData(mailTemplateModalData);
  };
  const showEMailTemplateEditForm = (
    modalData: ModalDataProps<EMailTemplateProps>["modalData"]
  ) => {
    setEMailTemplateModalData(emailTemplateModalData);
  };
  // Function to handle delete slide
  const onDeleteMailTemplate = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMailTemplate({ id: id });
        if (isDeleteMailTemplateError)
          return showToast(
            "error",
            JSON.stringify(deleteMailTemplateError?.data)
          );
        Swal.fire(
          "Deleted!",
          "Mail template record has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Operation aborted, entry is safe :)", "error");
      }
    });
  };
  // Function to handle delete slide
  const onDeleteEMailTemplate = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteEMailTemplate({ id: id });
        if (isDeleteEMailTemplateError)
          return showToast(
            "error",
            JSON.stringify(deleteEMailTemplateError?.data)
          );
        Swal.fire(
          "Deleted!",
          "E-Mail template record has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Operation aborted, entry is safe :)", "error");
      }
    });
  };

  const emailTempaltesTableHead = [
    "S/N",
    "Name",
    "Template",
    "Status",
    "Date Created",
    "Action",
  ];
  const mailTemplatesTableHead = [
    "S/N",
    "Name",
    "Status",
    "Date Created",
    "Action",
  ];
  const renderMailerStatus = (status: string) => {
    switch (status) {
      //   case '':
      //     return <span className="badge badge-primary">{status}</span>;
      case "ACTIVE":
        return <span className="badge badge-success">{status}</span>;
      case "INACTIVE":
        return <span className="badge badge-warning">{status}</span>;
      default:
        return null;
    }
  };

  const emailTemplatesSlots = {
    3: (data: any, row: any) => (
      <div>
        {row.status ? renderMailerStatus(row.status) : "No Status Available"}
      </div>
    ),
    5: (data: any, row: any) => (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-info light shadow btn-xs sharp me-1"
          onClick={() =>
            showEMailTemplateEditForm({
              data: row.emailTemplate,
              showModal: true,
            })
          }
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger light shadow btn-xs sharp"
          onClick={() => onDeleteEMailTemplate(row.emailTemplate.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    ),
  };

  const emailTemplatesTableData =
    (emailTemplates?.entities &&
      (Object.values(emailTemplates?.entities) as EMailTemplateProps[])?.map(
        (emailTemplate: EMailTemplateProps, i: number) => ({
          i: i + 1,

          name: emailTemplate?.name,
          templateId: emailTemplate.templateId,
          status: emailTemplate.status,
          createdAt: new Date(emailTemplate?.createdAt as Date).toLocaleString(
            "en-US",
            { day: "numeric", month: "long", year: "numeric" }
          ),
          emailTemplate: emailTemplate,
        })
      )) ||
    [];

  const emailTemplatesTprops = {
    data: emailTemplatesTableData,
    slots: emailTemplatesSlots,
    options: {
      columns: [
        { data: "i", name: "i", width: "5%" },
        { data: "name", name: "name", width: "15%" },
        { data: "templateId", name: "templateId", width: "35%" },
        { data: "status", name: "status", width: "5%" },
        { data: "createdAt", name: "createdAt", width: "5%" },
        { data: "emailTemplate", name: "actions", width: "10%" },
      ],
      autoWidth: true,
      processing: true,
      scrollX: true,
      scrollY: "true",
      stateSave: true,
      select: false,
    },
  };

  const mailTemplatesTableData =
    (mailTemplates?.entities &&
      (Object.values(mailTemplates?.entities) as MailTemplateProps[])?.map(
        (mailTemplate: MailTemplateProps, i: number) => ({
          i: i + 1,
          name: mailTemplate?.name,
          status: mailTemplate.status,
          createdAt: new Date(mailTemplate?.createdAt as Date).toLocaleString(
            "en-US",
            { day: "numeric", month: "long", year: "numeric" }
          ),
          mailTemplate: mailTemplate,
        })
      )) ||
    [];
  const mailTemplatesSlots = {
    // 4: (data: any, row: any) => (
    //   <div className="text-wrap text-left w-40" dangerouslySetInnerHTML={{ __html: row.body }}></div>
    // ),
    2: (data: any, row: any) => (
      <div>
        {row.status ? renderMailerStatus(row.status) : "No Status Available"}
      </div>
    ),
    4: (data: any, row: any) => (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-info light shadow btn-xs sharp me-1"
          onClick={() =>
            showMailTemplateEditForm({
              data: row.mailTemplate,
              showModal: true,
            })
          }
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger light shadow btn-xs sharp"
          onClick={() => onDeleteMailTemplate(row.mailTemplate.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    ),
  };
  const mailTemplatesTprops = {
    data: mailTemplatesTableData,
    slots: mailTemplatesSlots,
    options: {
      columns: [
        { data: "i", name: "i", width: "5%" },
        { data: "name", name: "name", width: "15%" },
        { data: "status", name: "status", width: "5%" },
        { data: "createdAt", name: "createdAt", width: "5%" },
        { data: "mailTemplate", name: "actions", width: "10%" },
      ],
      autoWidth: true,
      processing: true,
      // responsive: true,
      scrollX: true,
      scrollY: "true",
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
                <h4 className="card-title">All E-Mail Templates</h4>
              </div>
              <div className="card-body">
                <div className="mb-5 d-flex">
                  <CreateEMailTemplateForm />
                </div>
                <EditEMailTemplateForm modalData={emailTemplateModalData} />
                <div className="table-responsive table-scrollable">
                  {isPending ? (
                    <GeneralPreloader />
                  ) : (
                    <DataTableComponent
                      tableHead={emailTempaltesTableHead}
                      dataTableProps={emailTemplatesTprops}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">All Mail Templates</h4>
              </div>
              <div className="card-body">
                <div className="mb-5 d-flex">
                  <CreateMailTemplateForm />
                </div>
                <EditMailTemplateForm modalData={mailTemplateModalData} />
                <div className="table-responsive table-scrollable">
                  {isPending ? (
                    <GeneralPreloader />
                  ) : (
                    <DataTableComponent
                      tableHead={mailTemplatesTableHead}
                      dataTableProps={mailTemplatesTprops}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainBody>
    </>
  );
};

export default React.memo(Mailer);
