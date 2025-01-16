import React, { useEffect, useState, useCallback, useRef } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { Editor } from "@tinymce/tinymce-react";
import { useAddNewMailTemplateMutation } from "../../slices/mailerApi.slice";
import showToast from "@utils/showToast";
import handleApiErrors from "@utils/handleApiErrors";
import tinyMCEInit from "@configs/tinymce.config";
import useWindowSize from "@hooks/useWindowSize";
import ModalComponent from "@dashboard/components/Modal";
import FileUpload from "@components/FileUpload";
import { ActiveStatus, MailerTemplateEnum } from "@app/app/enums";
import { Editor as EditorProps } from "tinymce";

type FormValues = {
  type: MailerTemplateEnum;
  template: string;
  name: string;
  status: ActiveStatus;
  // image: FileList;
};

const CreateMailTemplateForm = () => {
  const editorRef = useRef<EditorProps | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [addNewMailTemplate, { isLoading, isSuccess, isError, error }] =
    useAddNewMailTemplateMutation();
  // const [previewImage, setPreviewImage] = React.useState<string>("");
  const { width } = useWindowSize();
  const [show, setShow] = useState(false);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      // setPreviewImage("")
      showToast("success", "Mail template created successfully");
    }
    if (isError) {
      handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault();
    // const formData = new FormData();
    // formData.append("name", formFields.name);
    // formData.append("status", formFields.status);
    // formData.append("template", formFields.template);
    // formData.append("file", formFields.image[0]);
    if (editorRef.current) {
      const textContent = editorRef.current.getContent({ format: "text" });
      console.log(textContent);
    }
    await addNewMailTemplate(formFields);
  };

  // const uploadBg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files;
  //   if (file && file.length > 0) {
  //     setValue("image", file);
  //     const fileUrl = URL.createObjectURL(file[0]);
  //     setPreviewImage(fileUrl);
  //   }
  // };

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
          header: { show: true, title: "Add New Mail Template" },
          modalStates: { show, handleOpen, handleClose },
        }}
      >
        <form
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
          encType="multipart/form-data"
        >
          <div className="card-body">
            <div className="basic-form">
              <div className="row">
                <div className="mb-3 col-md-9">
                  <label className="form-label">
                    <strong>Template Name or Title</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-3">
                  <label className="form-label">
                    <strong>Status</strong>
                  </label>
                  <select className="form-control" {...register("status")}>
                    <option value={ActiveStatus.ACTIVE}>Active</option>
                    <option value={ActiveStatus.INACTIVE}>Inactive</option>
                  </select>
                </div>

                {/* <div className="col-md-6">
                 <FileUpload onChange={uploadBg}/>

                    {errors.image && <div className="invalid-feedback">Background image is required</div>}
                  </div> */}

                {/* <div className="col-md-6">
                    <label className="form-label block w-100">Preview </label>
                    {previewImage && <img src={previewImage} alt="Preview" width="240" />}
                  </div> */}

                <div className="col-12">
                  <label className="form-label">
                    <strong>E-mail Template</strong>
                  </label>
                  <Editor
                    onInit={(evt, editor) =>
                      (editorRef.current = editor as EditorProps)
                    }
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    onEditorChange={(contents, editor) => {
                      // Use the editor's getContent method with the 'text' format to get text only
                      const text = editor.getContent({ format: "text" });
                      setValue("template", text);
                    }}
                    init={tinyMCEInit}
                  />
                </div>
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
                "Create Mail Template"
              )}
            </Button>
          </div>
        </form>
      </ModalComponent>
    </>
  );
};

export default CreateMailTemplateForm;
