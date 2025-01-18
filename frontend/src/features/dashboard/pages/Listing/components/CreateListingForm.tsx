import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useAddNewListingMutation } from "../slices/listingApi.slice";
import { Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { IoIosClose, IoMdPricetags } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@auth/slices/auth.slice";
import { useGetCategoriesQuery } from "@dashboard/pages/Category/";
import RecursiveCategorySelector from "@dashboard/pages/Category/components/RecursiveCategorySelector";
import showToast from "@utils/showToast";
import handleApiErrors from "@utils/handleApiErrors";
import { checkKeyDown } from "@utils/form.utils";
import { capitalizeFirstLetter } from "@utils/stringFormat";
import useWindowSize from "@hooks/useWindowSize";
import ModalComponent from "@dashboard/components/Modal";
import FileUpload from "@components/FileUpload";
import tinyMCEInit from "@configs/tinymce.config";
import { ListingStatus } from "@app/app/enums";
import CategoryProps from "@app/app/props/categoryProps";

const CreateListingForm = () => {
  const [tagName, setTagName] = useState("");
  const [listingBg, setListingBg] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const { width } = useWindowSize();
  const [show, setShow] = useState(false);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      tags: [],
      description: "",
      url: "",
      categoryId: "",
      price: 0,
      status: ListingStatus.ACTIVE,
      attachments: [],
    },
  });
  const [addNewListing, { isLoading, isError, error, isSuccess }] =
    useAddNewListingMutation();
  const { data: allCategories } = useGetCategoriesQuery("categoriesList", {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
 const { categories } = useGetCategoriesQuery("categoriesList", {
    selectFromResult: ({ data }) => ({
      categories:
        data?.entities &&
        (Object.values(data?.entities) as CategoryProps[])?.filter(
          (cat: CategoryProps) => cat?.for === "LISTING"
        ),
    }),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast("success", "Listing created successfully");
      setPreviewImage("");
    }
    if (isError) {
      handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit = async (data: any) => {
    if (listingBg) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("body", data.body);
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("categoryId", data.categoryId);
      formData.append("status", data.status);
      formData.append("file", listingBg);

      await addNewListing(formData);
    }
  };

  const createTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };
  // const tagwrapper= document.getElementsByClassName('tag-wrapper')!;
  const addTag = (e: any) => {
    if (e.key === "Enter") {
      if (tagName !== "") {
        setValue("tags", [
          ...(getValues("tags") as string[]),
          capitalizeFirstLetter(tagName),
        ]);
        setTagName("");
      }
    }
  };

  const removeTag = (key: string) => {
    setValue(
      "tags",
      (getValues("tags") as string[]).filter((tag) => tag !== key)
    );
    setTagName("");
  };

  const uploadBg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setListingBg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const status = watch("status");
  const btnLabel = capitalizeFirstLetter(status.toLowerCase());
  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={handleOpen}
      >
        Add New
      </button>

      <ModalComponent
        {...{
          size: (width as number) < 600 ? "xl" : "lg",
          header: { show: true, title: "Add New Listing" },
          modalStates: { show, handleOpen, handleClose },
        }}
      >
        <form
          onKeyDown={checkKeyDown}
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
          encType="multipart/form-data"
        >
          <div className="card-body">
            <div className="row">
              <div className="mb-3 col-md-9">
                <label className="form-label">
                  <strong>Title</strong>
                </label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                />
                {errors.title && (
                  <p className="text-danger">Title is required</p>
                )}
              </div>
              <div className="mb-3 col-md-3">
                <label className="form-label">
                  <strong>Status</strong>
                </label>
                <select
                  {...register("status", { required: true })}
                  className={`form-control ${
                    errors.status ? "is-invalid" : ""
                  }`}
                >
                  <option value="PUBLISHED">Publish</option>
                </select>
                {errors.status && (
                  <p className="text-danger">status is required</p>
                )}
              </div>

              <div className="col-12 row">
                <RecursiveCategorySelector
                  categories={categories}
                  depth={0} // Start at the root level (depth 0)
                  name="categoryId" // Base name for dynamic keys
                  control={control}
                  errors={errors}
                  isRequired
                  register={register}
                />
              </div>
              <div className="col-12 my-5">
                <label
                  htmlFor="listingTag"
                  className="block text-sm font-medium text-gray"
                >
                  Tags {/* <span className="required"> * </span> */}
                </label>
                <div className="mt-1 d-flex rounded-md shadow-sm align-items-stretch overflow-hidden h-100">
                  <span className="d-flex w-10 align-items-center rounded-l-md border border-r-0  bg-secondary bg-opacity-10 px-3 text-xl ">
                    <IoMdPricetags fontSize={"1.5rem"} />{" "}
                  </span>
                  <div className="mt-1 rounded-md shadow-sm p-1 border-2 border-secondary rounded-sm d-flex flex-wrap align-items-center m-0 w-100">
                    {getValues("tags")?.map((tagName: string, i: number) => {
                      return (
                        <div
                          className="p-1 font-xs border border-secondary rounded-sm d-flex align-items-center bg-gray-light mx-1"
                          key={i}
                        >
                          <span>{tagName}</span>
                          <IoIosClose
                            className="text-sm ml-1.5 cursor-pointer"
                            onClick={() => removeTag(tagName)}
                          />
                        </div>
                      );
                    })}
                    <input
                      className="d-flex font-16 bg-transparent p-2 outline-none border-0 w-100 form-control"
                      name="tag-input"
                      value={tagName}
                      onChange={createTag}
                      onKeyDown={addTag}
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <FileUpload onChange={uploadBg} />

                {errors.attachments && (
                  <div className="invalid-feedback">
                    Background image is required
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label block w-100 position-relative">
                  Preview{" "}
                </label>
                {previewImage && (
                  <img
                    className="img-responsive position-relative w-100"
                    src={previewImage}
                    alt="Preview"
                  />
                )}
              </div>

              <div className="col-12">
                <label className="form-label">
                  <strong>Details</strong>
                </label>
                <Editor
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  onEditorChange={(newValue) =>
                    setValue("description", newValue)
                  }
                  init={tinyMCEInit}
                  initialValue={` 
                    username        String
                    url             String
                    followers       Int
                    engagementRate  Float
                    averageLikes    Int
                    averageComments Int
                    bio             String?
                    description     String?
                    `}
                />
                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <PulseLoader
                  loading={isSubmitting}
                  color="#ffffff"
                  size="0.7rem"
                />
              ) : (
                `${btnLabel === "Published" ? "Publish" : btnLabel} Listing`
              )}
            </Button>
          </div>
        </form>
      </ModalComponent>
    </>
  );
};

export default React.memo(CreateListingForm);