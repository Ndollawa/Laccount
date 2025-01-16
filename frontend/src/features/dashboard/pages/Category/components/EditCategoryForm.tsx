import React, { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import tinyMCEInit from "@configs/tinymce.config";
import RecursiveCategorySelector from "./RecursiveCategorySelector";
import showToast from "@utils/showToast";
import { CategoryIconType, CategoryForEnum } from "@enums/index";
import handleApiErrors from "@utils/handleApiErrors";
import useWindowSize from "@hooks/useWindowSize";
import CategoryProps from "@Props/categoryProps";
import {
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
} from "../slices/categoryApi.slice";
import ModalComponent from "@dashboard/components/Modal";
import FileUpload from "@components/FileUpload";


const CATEGORY_ASSETS = import.meta.env.VITE_CATEGORY_ASSETS;
interface FormInputs {
  name: string;
  parentId: string;
  for: CategoryForEnum;
  status: string;
  iconType: CategoryIconType;
  icon: File | string | SVGElement | null;
}

const EditCategoryForm = (
{ modalData: { data, showModal } }: ModalDataProps<CategoryProps>) => {
  const { width } = useWindowSize();
     const { categories } = useGetCategoriesQuery("categoriesList", {
       selectFromResult: ({ data }) => ({
         categories: data?.ids?.map((id: string) => data?.entities[id]),
       }),
     });
  const [addIcon, setAddIcon] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [updateCategory, { isSuccess, isError, error }] =
    useUpdateCategoryMutation();

  const [show, setShow] = useState(false);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => {
    setShow(false);
    reset();
    clearErrors();
  }, [show]);
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      parentId: "",
      for: "",
      status: "ACTIVE",
      icon: null,
      iconType: "",
    },
  });
  const iconType = watch("iconType");
  const categoryFor = watch("for");
  // Reset form when successfully submitted

  const onsubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault();
    await updateCategory({...formFields, id:data.id});
  };

  useEffect(() => {
    // When `data` is available, reset form fields with the new default values
    if (data) {
      setShow(showModal);
      reset({
        name: data?.name,
        icon: data?.icon,
        iconType: data?.iconType,
        for: data?.for,
        parentId: data?.parentId,
        status: data?.status,
      });
      // Set preview image if available
      if (data.image) {
        setPreviewImage(`${CATEGORY_ASSETS}${data.image}`);
      }
    }
  }, [data, reset]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleClose();
      showToast("success", "Category updated successfully");
      setAddIcon(false);
      setPreviewImage("");
    }
    if (isError) {
      handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  useEffect(() => {
    if (data?.image) {
      setPreviewImage(`${CATEGORY_ASSETS}${data?.image}`);
    }
  }, [data?.image]);

  const uploadBg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("icon", file);
        setPreviewImage(URL.createObjectURL(file));
      }
    },
    [setValue]
  );

  return (
    <>
      <ModalComponent
        {...{
          size: (width as number) < 600 ? "xl" : "lg",
          header: { show: true, title: "Edit Category" },
          modalStates: { show, handleOpen, handleClose },
        }}
      >
        <form
          onSubmit={(e) => handleSubmit(onsubmit)(e)}
          encType="multipart/form-data"
        >
          <div className="card-for">
            <div className="basic-form">
              <div className="row">
                {/* name */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter name"
                    {...register("name", { required: "name is required" })}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                {/* Status */}
                <div className="mb-3 col-md-3">
                  <label className="form-label">
                    <strong>Status</strong>
                  </label>
                  <select
                    id="status"
                    className={`form-control default-select form-control wide ${
                      errors.status ? "is-invalid" : ""
                    }`}
                    {...register("status", { required: "Status is required" })}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.status?.message}
                  </div>
                </div>
                {/* Icon type */}
                <div className="mb-3 col-md-3">
                  <label className="form-label">
                    <strong>For Entity</strong>
                  </label>
                  <select
                    id="for"
                    className={`form-control default-select form-control wide ${
                      errors.for ? "is-invalid" : ""
                    }`}
                    {...register("for", { required: "Entity is required" })}
                  >
                    <option value={CategoryForEnum.POST}>Post</option>
                    <option value={CategoryForEnum.LISTING}>Listing</option>
                  </select>
                  <div className="invalid-feedback">{errors.for?.message}</div>
                </div>
                <div className="col-12 row">
                  {categories && (
                    <>
                      <RecursiveCategorySelector
                        categories={categories}
                        depth={0} // Start at the root level (depth 0)
                        name="parentId" // Base name for dynamic keys
                        control={control}
                        errors={errors}
                        register={register}
                        isRequired={false}
                      />
                    </>
                  )}
                </div>

                {/* CTO Toggle */}
                <div className="my-20 col-md-12 d-flex justify-content-between">
                  <strong>Add Category Icon</strong>
                  <label className="p-10" htmlFor="addIcon">
                    {addIcon ? (
                      <BsToggleOn className="text-primary" fontSize={"2rem"} />
                    ) : (
                      <BsToggleOff className="text-default" fontSize={"2rem"} />
                    )}
                  </label>
                  <input
                    type="checkbox"
                    id="addIcon"
                    className="setting-checkbox d-none"
                    onClick={() => setAddIcon((prev) => !prev)}
                  />
                </div>

                {/* CTO Text and Link */}
                {addIcon && (
                  <>
                    {/* Icon type */}
                    <div className="mb-3 col-md-4">
                      <label className="form-label">
                        <strong>Icon Type</strong>
                      </label>
                      <select
                        id="iconType"
                         value={data.iconType}
                        className={`form-control default-select form-control wide ${
                          errors.iconType ? "is-invalid" : ""
                        }`}
                        {...register("iconType")}
                      >
                        <option  value={CategoryIconType.ICON}>
                          Icon Class
                        </option>
                        <option value={CategoryIconType.SVG}>SVG</option>
                        <option value={CategoryIconType.IMAGE}>
                          Image upload
                        </option>
                      </select>
                      <div className="invalid-feedback">
                        {errors.iconType?.message}
                      </div>
                    </div>
                    {iconType === CategoryIconType.ICON && (
                      <div className="mb-3 col-md-8">
                        <label className="form-label">
                          <strong>Icon Class</strong>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.icon ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Icon class"
                          {...register("icon")}
                        />
                        <div className="invalid-feedback">
                          {errors.icon?.message}
                        </div>
                      </div>
                    )}
                    {iconType === CategoryIconType.SVG && (
                      <div className="col-12">
                        <label className="form-label">
                          <strong>SVG Icon</strong>
                        </label>
                        <Editor
                          tinymceScriptSrc="/tinymce/tinymce.min.js"
                          onEditorChange={(newValue) =>
                            setValue("icon", newValue)
                          }
                          value={watch("icon")}
                          init={tinyMCEInit}
                        />
                      </div>
                    )}
                    {iconType === CategoryIconType.IMAGE && (
                      <>
                        {/* Icon Image */}
                        <div className="row col-12">
                          <div className="col-md-6">
                            <FileUpload onChange={uploadBg} />
                            <div className="invalid-feedback">
                              {errors.image?.message}
                            </div>
                          </div>

                          {/* Preview */}
                          <div className="col-md-6">
                            <label className="form-label">Preview</label>
                            <div id="preview">
                              {previewImage && (
                                <img
                                  className="img-responsive"
                                  src={previewImage}
                                  alt="Preview"
                                  width="240"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 my-3">
            <Button
              variant="primary"
              size="sm"
              className="rounded-md"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              className="rounded-md"
            >
              {isSubmitting ? (
                <>
                  {/* <span> Updating</span> */}
                  <PulseLoader
                    loading={isSubmitting}
                    color="#ffffff"
                    size="0.7rem"
                  />
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </form>
      </ModalComponent>
    </>
  );
};

export default React.memo(EditCategoryForm);
