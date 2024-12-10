import React, { ChangeEvent } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  useSettingsUploadMutation,
  useSettingsRemoveFileMutation,
} from "../slices/settingApi.slice";
import { useLandingConfig } from "../slices/settings.slice";
import showToast from "@utils/showToast";
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const SiteImage = () => {
  const {
    id,
    settings: {
      siteImages: {
        favicon,
        logo,
        logoIcon,
        logoDark,
        aboutUsBg,
        aboutVideo,
        pagesBg,
        backgroundImage,
      } = {},
    } = {},
  } = useSelector(useLandingConfig);

  const [settingsUpload] = useSettingsUploadMutation();
  const [removeFile] = useSettingsRemoveFileMutation();

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("file", files[0]!);
    formData.append("id", id);
    formData.append("type", type);

    try {
      await settingsUpload(formData).unwrap();
      showToast("success", `${type} Uploaded successfully`);
    } catch (error: any) {
      showToast("error", `Sorry, couldn't upload ${type}: ${error?.data?.message}`);
    }
  };

  const handleFileRemove = async (file: string, type: string) => {
    if (file) {
      try {
        await removeFile({ id, file, type }).unwrap();
        showToast("success", `${type} removed successfully`);
      } catch (error: any) {
        showToast("error", `Sorry, couldn't remove ${type}: ${error?.data?.message}`);
      }
    }
  };

  const renderImagePreview = (image: string, type: string, width = 50) => (
    <div
      style={{
        backgroundColor: "#ccc",
        padding: "10px",
        border: "2px solid #f68600",
        borderRadius: "2%",
      }}
      className="container position-relative w-100"
    >
      <LightGallery plugins={[lgZoom]}>
        <a
          href={`${BRAND_ASSETS}${image}`}
          data-exthumbimage={`${BRAND_ASSETS}${image}`}
          data-src={`${BRAND_ASSETS}${image}`}
          data-title={type}
        >
          <img
            className="img-responsive offset-1"
            src={`${BRAND_ASSETS}${image}`}
            alt={type}
            width={width}
          />
        </a>
      </LightGallery>
      <div
        className="position-absolute top-0"
        onClick={() => handleFileRemove(image, type)}
      >
        <FaTrash color="red" cursor="pointer" fontSize="1rem" />
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Site Images</h4>
      </div>
      <div className="card-body">
        <div className="row align-center">
          {/* Favicon */}
          <div className="col-md-6">
            <label className="form-label">Favicon</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "favicon")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {favicon && renderImagePreview(favicon, "favicon")}
          </div>

          {/* Logo Icon */}
          <div className="col-md-6">
            <label className="form-label">Logo Icon</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "logoIcon")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {logoIcon && renderImagePreview(logoIcon, "logoIcon")}
          </div>

          {/* Logo */}
          <div className="col-md-6">
            <label className="form-label">Logo</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "logo")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {logo && renderImagePreview(logo, "logo", 200)}
          </div>

          {/* Dark Logo */}
          <div className="col-md-6">
            <label className="form-label">Dark Logo</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "logoDark")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {logoDark && renderImagePreview(logoDark, "logoDark", 200)}
          </div>

          {/* About Us Image */}
          <div className="col-md-6">
            <label className="form-label">About Us Image</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "aboutUsBg")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {aboutUsBg && renderImagePreview(aboutUsBg, "aboutUsBg", 200)}
          </div>

          {/* About Us Video */}
          <div className="col-md-6">
            <label className="form-label">About Us Video</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept="video/*"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "aboutVideo")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {aboutVideo && (
              <div
                style={{
                  backgroundColor: "#ccc",
                  padding: "10px",
                  border: "2px solid #f68600",
                  borderRadius: "2%",
                }}
                className="container position-relative w-100"
              >
                <video
                  className="img-responsive offset-1"
                  src={`${BRAND_ASSETS}${aboutVideo}`}
                  controls
                  width="320"
                ></video>
                <div
                  className="position-absolute top-0"
                  onClick={() => handleFileRemove(aboutVideo, "aboutVideo")}
                >
                  <FaTrash color="red" cursor="pointer" fontSize="1rem" />
                </div>
              </div>
            )}
          </div>

          {/* Pages Background */}
          <div className="col-md-6">
            <label className="form-label">Pages Background Image</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif,.svg"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "pagesBg")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {pagesBg && renderImagePreview(pagesBg, "pagesBg", 200)}
          </div>

          {/* Site Background Image */}
          <div className="col-md-6">
            <label className="form-label">Background Image</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-file-input form-control"
                  onChange={(e) => handleFileUpload(e, "backgroundImage")}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            {backgroundImage && renderImagePreview(backgroundImage, "backgroundImage", 200)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteImage;
