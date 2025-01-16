import React from 'react'

const FileUpload = ({onChange}:{onChange:React.InputHTMLAttributes<HTMLInputElement> | React.ChangeEventHandler<HTMLInputElement>}) => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 my-3">
                      <label
                        htmlFor="dropzone-file"
                        className="d-flex flex-column p-3 align-items-center justify-content-center w-100 rounded cursor-pointer bg-transparent"
                        style={{ height: '16rem', border: "2px dashed" }}
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center py-3">
                          <svg
                            className="mb-3 text-secondary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-secondary text-center">
                            <span className="fw-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-muted small text-center">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="d-none" accept=".png, .jpg, .jpeg" onChange={onChange} />
                      </label>
                    </div>
  )
}

export default FileUpload