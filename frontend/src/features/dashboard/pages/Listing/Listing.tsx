import React, { useState, useEffect, useTransition, useMemo } from "react";
import LightGallery from "lightgallery/react";
import { useDispatch, useSelector } from "react-redux";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import Swal from "sweetalert2";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import MainBody from "@dashboard/components/MainBody";
import CreateCategoryModal from "./components/CreateCategoryForm";
import EditCategoryForm from "./components/EditCategoryForm";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "./slices/listingApi.slice";

import showToast from "@utils/showToast";
const CATEGORY_ASSETS = import.meta.env.VITE_CATEGORY_ASSETS;
import { setPreloader } from "@components/preloader/slices/preloader.slice";
import PageProps from "@props/pageProps";
import { CategoryIconType, CategoryForEnum } from "@enums/index";
import CategoryProps from "@props/categoryProps";
import { ModalDataProps } from "@props/modalProps";
import GeneralPreloader from "@components/preloader/GeneralPreloader";
import DataTableComponent from "@components/DataTableComponent";

const Listing = ({ pageData }: PageProps) => {
  const [modalData, setModalData] = useState<
    ModalDataProps<CategoryProps>["modalData"]
  >({
    data: null,
    showModal: false,
  });
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const {
    data: allCategories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery("categoryList", {
    // pollingInterval: 1500,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [
    deleteCategory,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteCategoryMutation();
  // Function to handle delete category
  const onDeleteCategory = async (id: string) => {
    Swal.fire({
      name: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory({ id });

        if (isDelError) return showToast("error", delError?.data.message);
        Swal.fire("Deleted!", "category has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Operation aborted, entry is safe :)", "error");
      }
    });
  };

  const showEditForm = (
    modalData: ModalDataProps<CategoryProps>["modalData"]
  ) => {
    setModalData(modalData);
  };

  const tableHead = [
    "S/N",
    "Title",
    "Category",
    "Price",
    "Status",
    "Attachments",
    "Created Date ",
    "Action",
  ];

  const renderCategoryStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="badge badge-primary">{status}</span>;
      case "ACTIVE":
        return <span className="badge badge-success">{status}</span>;
      case "INACTIVE":
        return <span className="badge badge-danger">{status}</span>;
      default:
        return null;
    }
  };

  const ParentCategoryName = (categoryId: string) => {
    return allCategories?.entities
      ? (Object.values(allCategories.entities) as CategoryProps[]).find(
          (category) => category.parentId === categoryId
        )
      : "";
  };
  const slots = {
    // 4: (data: any, row: any) => (
    //   <div className="text-wrap text-left w-40" dangerouslySetInnerHTML={{ __html: row.body }}></div>
    // ),
    4: (data, row) => (
      <div>
        {row.status ? renderCategoryStatus(row.status) : "No Status Available"}
      </div>
    ),
    5: (data: any, row: any) =>
      row.icon && row.iconType === CategoryIconType.IMAGE ? (
        <LightGallery plugins={[lgZoom]}>
          <a
            href={`${CATEGORY_ASSETS}${row.icon}`}
            data-lightbox={`icon-${row.id}`}
            data-exthumbicon={CATEGORY_ASSETS + row.icon}
            data-src={CATEGORY_ASSETS + row.icon}
            data-name={row.name}
          >
            <img
              src={`${CATEGORY_ASSETS}${row.icon}`}
              alt={row.name}
              width="150"
            />
          </a>
        </LightGallery>
      ) : row.icon && row.iconType === CategoryIconType.ICON ? (
        <span>
          <i className={row.icon}></i>
        </span>
      ) : row.icon && row.iconType === CategoryIconType.SVG ? (
        <span>{row.icon}</span>
      ) : (
        <p></p>
      ),
    7: (data: any, row: any) => (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-info light shadow btn-xs sharp me-1"
          onClick={() => showEditForm({ data: row.category, showModal: true })}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger light shadow btn-xs sharp"
          onClick={() => onDeleteCategory(row.category.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    ),
  };

  const categoriesTableData =
    (allCategories?.entities &&
      (Object.values(allCategories?.entities) as CategoryProps[])?.map(
        (category: CategoryProps | unknown, i: number) => ({
          i: i + 1,
          icon: category,
          name: category?.name,
          parentId: ParentCategoryName(category.id)?.name ?? "",
          for: category.for,
          status: category.status,
          createdAt: new Date(category?.createdAt).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          category: category,
        })
      )) ||
    [];
  const tprops = {
    data: categoriesTableData,
    slots,
    options: {
      columns: [
        { data: "i", name: "i", width: "2%" },
        { data: "icon", name: "icon", width: "12%" },
        { data: "name", name: "name", width: "15%" },
        { data: "parentId", name: "parentId", width: "15%" },
        { data: "for", name: "for", width: "38%" },
        { data: "status", name: "status", width: "8%" },
        { data: "createdAt", name: "createdAt", width: "8%" },
        { data: "category", name: "actions", width: "10%" },
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
                <h4 className="card-name">All Categorys</h4>
              </div>
              <div className="card-body">
                <div className="mb-5 d-flex">
                  <CreateCategoryModal />
                </div>
                <EditCategoryForm modalData={modalData} />
                <div className="table-responsive table-scrollable">
                  {isPending ? (
                    <GeneralPreloader />
                  ) : (
                    <DataTableComponent
                      tableHead={tableHead}
                      dataTableProps={tprops}
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

export default React.memo(Listing);
