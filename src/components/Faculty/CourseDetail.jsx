import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { courseService } from '../../services/courseService';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        // Fetch course details
        const courseResponse = await courseService.getCourseById(courseId);
        setCourse(courseResponse.data);
        
        // Fetch course materials
        const materialsResponse = await courseService.getCourseMaterials(courseId);
        setMaterials(materialsResponse.data);
        
        // Fetch announcements
        const announcementsResponse = await courseService.getCourseAnnouncements(courseId);
        setAnnouncements(announcementsResponse.data);
        
        // Fetch assignments
        const assignmentsResponse = await courseService.getCourseAssignments(courseId);
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await courseService.deleteCourse(courseId);
        navigate('/faculty/courses');
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleUploadMaterial = () => {
    // Implement material upload functionality or navigate to upload page
    navigate(`/faculty/courses/${courseId}/upload-material`);
  };

  const handleCreateAnnouncement = () => {
    // Implement announcement creation or navigate to create announcement page
    navigate(`/faculty/courses/${courseId}/create-announcement`);
  };

  const handleCreateAssignment = () => {
    // Implement assignment creation or navigate to create assignment page
    navigate(`/faculty/courses/${courseId}/create-assignment`);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Link to="/faculty/courses" className="btn btn-primary">
            Return to Course List
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="faculty-course-detail">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/faculty/dashboard">Home</Link></li>
            <li><Link to="/faculty/courses">My Courses</Link></li>
            <li>{course.title}</li>
          </ul>
        </div>
        
        {/* Course Header */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-gray-600 mt-1">{course.code} • {course.credits} Credits</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/faculty/courses/${courseId}/edit`} className="btn btn-secondary">
                Edit Course
              </Link>
              <button onClick={handleDeleteCourse} className="btn btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="tabs tabs-bordered mb-6">
          <button 
            className={`tab tab-lg ${activeTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'materials' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            Materials
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'announcements' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'assignments' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            Assignments
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'students' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-xl">Course Description</h2>
                  <p>{course.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title text-xl">Course Details</h2>
                    <div className="space-y-2 mt-2">
                      <p><span className="font-semibold">Department:</span> {course.department}</p>
                      <p><span className="font-semibold">Semester:</span> {course.semester}</p>
                      <p><span className="font-semibold">Schedule:</span> {course.schedule}</p>
                      <p><span className="font-semibold">Location:</span> {course.location}</p>
                      <p><span className="font-semibold">Prerequisites:</span> {course.prerequisites || 'None'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title text-xl">Learning Objectives</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {course.objectives ? (
                        course.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))
                      ) : (
                        <li>No learning objectives specified</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-xl">Syllabus</h2>
                  <div className="mt-2">
                    {course.syllabus ? (
                      <div dangerouslySetInnerHTML={{ __html: course.syllabus }} />
                    ) : (
                      <p>No syllabus content available</p>
                    )}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/faculty/courses/${courseId}/edit-syllabus`} className="btn btn-primary">
                      Edit Syllabus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Course Materials</h2>
                <button onClick={handleUploadMaterial} className="btn btn-primary">
                  Upload Material
                </button>
              </div>
              
              {materials && materials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {materials.map(material => (
                    <div key={material.id} className="card bg-base-100 shadow-md">
                      <div className="card-body">
                        <h3 className="card-title">{material.title}</h3>
                        <p className="text-sm text-gray-600">{material.type} • Uploaded on {new Date(material.uploadDate).toLocaleDateString()}</p>
                        <p className="mt-2">{material.description}</p>
                        <div className="card-actions justify-end mt-4">
                          <a href={material.fileUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            Download
                          </a>
                          <button onClick={() => navigate(`/faculty/materials/${material.id}/edit`)} className="btn btn-secondary">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                  <h3 className="text-xl mb-2">No materials uploaded yet</h3>
                  <p className="text-gray-500 mb-4">Upload course materials for your students</p>
                  <button onClick={handleUploadMaterial} className="btn btn-primary">
                    Upload Material
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Announcements</h2>
                <button onClick={handleCreateAnnouncement} className="btn btn-primary">
                  Create Announcement
                </button>
              </div>
              
              {announcements && announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="card bg-base-100 shadow-md">
                      <div className="card-body">
                        <h3 className="card-title">{announcement.title}</h3>
                        <p className="text-sm text-gray-600">Posted on {new Date(announcement.createdAt).toLocaleDateString()}</p>
                        <div className="mt-2">
                          <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                        </div>
                        <div className="card-actions justify-end mt-4">
                          <button onClick={() => navigate(`/faculty/announcements/${announcement.id}/edit`)} className="btn btn-secondary">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                  <h3 className="text-xl mb-2">No announcements posted yet</h3>
                  <p className="text-gray-500 mb-4">Keep your students informed with regular announcements</p>
                  <button onClick={handleCreateAnnouncement} className="btn btn-primary">
                    Create Announcement
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Assignments</h2>
                <button onClick={handleCreateAssignment} className="btn btn-primary">
                  Create Assignment
                </button>
              </div>
              
              {assignments && assignments.length > 0 ? (
                <div className="space-y-4">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="card bg-base-100 shadow-md">
                      <div className="card-body">
                        <div className="flex flex-col md:flex-row justify-between">
                          <h3 className="card-title">{assignment.title}</h3>
                          <div className="badge badge-primary mt-2 md:mt-0">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="mt-2">{assignment.description}</p>
                        <div className="mt-2">
                          <span className="font-semibold">Points:</span> {assignment.points}
                          {assignment.submissionsCount !== undefined && (
                            <span className="ml-4">
                              <span className="font-semibold">Submissions:</span> {assignment.submissionsCount}
                            </span>
                          )}
                        </div>
                        <div className="card-actions justify-end mt-4">
                          <Link to={`/faculty/assignments/${assignment.id}/submissions`} className="btn btn-primary">
                            View Submissions
                          </Link>
                          <button onClick={() => navigate(`/faculty/assignments/${assignment.id}/edit`)} className="btn btn-secondary">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                  <h3 className="text-xl mb-2">No assignments created yet</h3>
                  <p className="text-gray-500 mb-4">Create assignments for your students</p>
                  <button onClick={handleCreateAssignment} className="btn btn-primary">
                    Create Assignment
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Students Tab */}
          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Enrolled Students</h2>
                <Link to={`/faculty/courses/${courseId}/student-management`} className="btn btn-primary">
                  Manage Students
                </Link>
              </div>
              
              {course.students && course.students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.students.map(student => (
                        <tr key={student.id}>
                          <td>{student.studentId}</td>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td>{student.department}</td>
                          <td>
                            <div className="flex gap-2">
                              <Link to={`/faculty/students/${student.id}/performance/${courseId}`} className="btn btn-xs btn-primary">
                                View Performance
                              </Link>
                              <Link to={`/faculty/messaging?to=${student.id}`} className="btn btn-xs btn-secondary">
                                Message
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                  <h3 className="text-xl mb-2">No students enrolled yet</h3>
                  <p className="text-gray-500 mb-4">Students will appear here once they enroll in your course</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;