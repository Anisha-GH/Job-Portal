import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchApplications = async () => {
      try {
        const url =
          user?.role === "Employer"
            ? `${import.meta.env.VITE_API_BASE_URL}/application/employer/getall`
            : `${
                import.meta.env.VITE_API_BASE_URL
              }/application/jobseeker/getall`;

        const res = await axios.get(url, {
          withCredentials: true,
        });

        console.log("Fetched Applications:", res.data.applications); // DEBUG LOG
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch applications."
        );
        console.error("Error fetching applications:", error); // DEBUG LOG
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  useEffect(() => {
    if (!isAuthorized) navigateTo("/");
  }, [isAuthorized, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length === 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>

        {/* ✅ New Line for Job Status */}
        <p>
          <span>Job:</span>{" "}
          {element.jobDeleted || element?.jobID?.expired ? (
            <span style={{ color: "red" }}>This job was removed or expired.</span>
          ) : (
            element?.jobID?.title || "Job Info Unavailable"
          )}
        </p>

      </div>
      <div className="resume">
        <img
          src={element?.resume?.url}
          alt="resume"
          onClick={() => openModal(element?.resume?.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

// Employer Card Component
const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element?.resume?.url}
          alt="resume"
          onClick={() => openModal(element?.resume?.url)}
        />
      </div>
    </div>
  );
};
