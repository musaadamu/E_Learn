import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import CourseCard from './CourseCard';
import { courseService } from '../../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [courseTypeFilter, setCourseTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Assuming courseService has a method to get faculty courses
        const response = await courseService.getFacultyCourses();
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = courses;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply semester filter
    if (semesterFilter !== 'all') {
      result = result.filter(course => course.semester === semesterFilter);
    }
    
    // Apply course type filter
    if (courseTypeFilter !== 'all') {
      result = result.filter(course => course.type === courseTypeFilter);
    }
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, semesterFilter, courseTypeFilter, courses]);

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Semester options (could be fetched from API in a real application)
  const semesterOptions = ['all', 'Fall 2024', 'Spring 2025', 'Summer 2025'];
  const courseTypeOptions = ['all', 'Lecture', 'Lab', 'Seminar', 'Workshop'];

  return (
    <div className="faculty-course-list">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/faculty/dashboard">Home</Link></li>
            <li>My Courses</li>
          </ul>
        </div>
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <Link 
            to="/faculty/courses/create" 
            className="btn btn-primary"
          >
            Create New Course
          </Link>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search by course title or code"
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="select select-bordered w-full"
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
              >
                {semesterOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Semesters' : option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="select select-bordered w-full"
                value={courseTypeFilter}
                onChange={(e) => setCourseTypeFilter(e.target.value)}
              >
                {courseTypeOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Course Types' : option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Course List Container */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  linkTo={`/faculty/courses/${course.id}`}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button 
                    className="join-item btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button 
                    className="join-item btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseList;