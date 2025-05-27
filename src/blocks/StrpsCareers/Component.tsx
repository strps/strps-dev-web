import React, { useState, useEffect, useRef } from 'react';
import { Block } from 'payload/types';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

type JobType = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

type FilterType = {
  type: 'department' | 'location' | 'jobType' | 'experience';
  label: string;
};

type CategoryType = {
  name: string;
  slug: string;
  description?: string;
  icon?: any;
};

type BenefitType = {
  title: string;
  description?: string;
  icon?: any;
};

type FormFieldType = {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  accept?: string;
  maxFileSize?: number;
};

type Props = {
  block: Block & {
    heading?: string;
    description?: string;
    layout?: 'grid' | 'list';
    columns?: string;
    showFilters?: boolean;
    filters?: FilterType[];
    defaultFilters?: {
      department?: string;
      location?: string;
      jobType?: string;
    };
    showSearch?: boolean;
    searchPlaceholder?: string;
    showCategories?: boolean;
    categories?: CategoryType[];
    showFeatured?: boolean;
    featuredTitle?: string;
    showBenefits?: boolean;
    benefits?: BenefitType[];
    showApplicationForm?: boolean;
    applicationForm?: {
      title?: string;
      description?: string;
      submitButtonText?: string;
      successMessage?: string;
      fields?: FormFieldType[];
    };
    showContact?: boolean;
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    showSocial?: boolean;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  };
};

const StrpsCareers: React.FC<Props> = ({
  block: {
    heading = 'Join Our Team',
    description = 'Explore career opportunities and join our growing team.',
    layout = 'grid',
    columns = '2',
    showFilters = true,
    filters = [],
    defaultFilters = {},
    showSearch = true,
    searchPlaceholder = 'Search jobs...',
    showCategories = true,
    categories = [],
    showFeatured = true,
    featuredTitle = 'Featured Positions',
    showBenefits = true,
    benefits = [],
    showApplicationForm = true,
    applicationForm = {},
    showContact = true,
    contactInfo = {},
    showSocial = true,
    socialLinks = [],
  },
}) => {
  const router = useRouter();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // State for jobs data
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    department?: string;
    location?: string;
    jobType?: string;
    experience?: string;
  }>(defaultFilters);

  // Application form state
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm();

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/jobs');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockJobs: JobType[] = [
          {
            id: '1',
            title: 'Frontend Developer',
            slug: 'frontend-developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'full-time',
            experience: 'mid-level',
            description: 'We are looking for a skilled Frontend Developer to join our team.',
            responsibilities: [
              'Develop new user-facing features',
              'Build reusable code and libraries',
              'Ensure the technical feasibility of UI/UX designs',
              'Optimize application for maximum speed and scalability',
            ],
            requirements: [
              'Proficient in React, TypeScript, and modern JavaScript',
              'Experience with state management libraries (Redux, Context API)',
              'Familiarity with RESTful APIs and GraphQL',
              'Strong understanding of responsive design',
            ],
            benefits: [
              'Competitive salary',
              'Flexible working hours',
              'Remote work options',
              'Health insurance',
            ],
            featured: true,
            createdAt: '2023-05-20T10:00:00.000Z',
            updatedAt: '2023-05-20T10:00:00.000Z',
          },
          // Add more mock jobs as needed
        ];

        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
        setFeaturedJobs(mockJobs.filter(job => job.featured));
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...jobs];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.type.toLowerCase().includes(term) ||
          job.experience.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (activeFilters.department) {
      result = result.filter(job => 
        job.department.toLowerCase() === activeFilters.department?.toLowerCase()
      );
    }

    if (activeFilters.location) {
      result = result.filter(job => 
        job.location.toLowerCase() === activeFilters.location?.toLowerCase()
      );
    }

    if (activeFilters.jobType) {
      result = result.filter(job => 
        job.type.toLowerCase() === activeFilters.jobType?.toLowerCase()
      );
    }

    if (activeFilters.experience) {
      result = result.filter(job => 
        job.experience.toLowerCase() === activeFilters.experience?.toLowerCase()
      );
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, activeFilters]);

  // Handle filter change
  const handleFilterChange = (filterType: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value === 'all' ? undefined : value,
    }));
  };

  // Handle job application
  const handleApply = (job: JobType) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setFormSubmitted(false);
    setFormError(null);
    reset();
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    if (!selectedJob) return;

    setUploading(true);
    setFormError(null);

    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      // Append job information
      formData.append('jobId', selectedJob.id);
      formData.append('jobTitle', selectedJob.title);

      // In a real app, you would send this to your API
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   body: formData,
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
      //     setUploadProgress(progress);
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit application');
      // }


      // Mock success response
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setShowApplicationModal(false);
        setUploading(false);
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting application:', err);
      setFormError('Failed to submit application. Please try again.');
      setUploading(false);
    }
  };

  // Get unique filter values
  const getFilterOptions = (type: keyof typeof activeFilters) => {
    const values = new Set<string>();
    jobs.forEach(job => {
      const value = job[type as keyof JobType];
      if (typeof value === 'string') {
        values.add(value);
      }
    });
    return Array.from(values);
  };

  // Render filter component
  const renderFilter = (filter: FilterType) => {
    const options = getFilterOptions(filter.type);
    
    if (options.length === 0) return null;

    return (
      <div key={filter.type} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {filter.label}
        </label>
        <select
          value={activeFilters[filter.type] || 'all'}
          onChange={(e) => handleFilterChange(filter.type, e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">All {filter.label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Render job card
  const renderJobCard = (job: JobType, featured = false) => (
    <div 
      key={job.id}
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        featured ? 'border-l-4 border-indigo-500' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {job.department}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {job.location}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {job.type}
              </span>
            </div>
          </div>
          {featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Featured
            </span>
          )}
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => router.push(`/careers/${job.slug}`)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => handleApply(job)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  // Render application form field
  const renderFormField = (field: FormFieldType) => {
    const commonProps = {
      ...register(field.name, {
        required: field.required ? `${field.label} is required` : false,
      }),
      id: field.name,
      className: `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
        errors[field.name] ? 'border-red-500' : ''
      }`,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              {...commonProps}
              rows={4}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select {...commonProps}>
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="relative flex items-start mb-4">
            <div className="flex items-center h-5">
              <input
                id={field.name}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...commonProps}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={field.name} className="font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {errors[field.name] && (
                <p className="text-red-600">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept={field.accept}
              {...register(field.name, {
                required: field.required ? `${field.label} is required` : false,
                validate: (value) => {
                  if (!(value instanceof FileList) || value.length === 0) {
                    return field.required ? `${field.label} is required` : true;
                  }
                  const file = value[0];
                  
                  // Check file size
                  if (field.maxFileSize && file.size > field.maxFileSize * 1024 * 1024) {
                    return `File size must be less than ${field.maxFileSize}MB`;
                  }
                  
                  // Check file type
                  if (field.accept) {
                    const allowedTypes = field.accept.split(',').map(ext => ext.trim());
                    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
                    if (!allowedTypes.some(type => type.endsWith(fileExt))) {
                      return `File type not allowed. Allowed types: ${field.accept}`;
                    }
                  }
                  
                  return true;
                },
              })}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
            {field.accept && (
              <p className="mt-1 text-xs text-gray-500">
                Accepted formats: {field.accept}
                {field.maxFileSize && `, Max size: ${field.maxFileSize}MB`}
              </p>
            )}
          </div>
        );

      case 'hidden':
        return (
          <input
            key={field.name}
            type="hidden"
            {...register(field.name)}
          />
        );

      default: // text, email, tel, etc.
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              {...commonProps}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );
    }
  };

  // Render application modal
  // Render application modal
  const renderApplicationModal = () => {
    if (!showApplicationModal || !selectedJob) return null;

    // Default form fields if none provided
    const defaultFields: FormFieldType[] = [
      {
        type: 'text',
        name: 'fullName',
        label: 'Full Name',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email Address',
        required: true,
      },
      {
        type: 'tel',
        name: 'phone',
        label: 'Phone Number',
        required: true,
      },
      {
        type: 'file',
        name: 'resume',
        label: 'Resume',
        accept: '.pdf,.doc,.docx',
        maxFileSize: 5,
        required: true,
      },
      {
        type: 'textarea',
        name: 'coverLetter',
        label: 'Cover Letter',
        placeholder: 'Tell us why you would be a great fit for this position...',
      },
    ];

    const formFields = applicationForm?.fields?.length 
      ? applicationForm.fields 
      : defaultFields;

    // Add hidden job field
    formFields.unshift({
      type: 'hidden',
      name: 'jobId',
      label: 'Job ID',
      value: selectedJob.id,
    });

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div 
            className="fixed inset-0 transition-opacity" 
            aria-hidden="true"
            onClick={() => !uploading && setShowApplicationModal(false)}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {applicationForm?.title || 'Apply for this position'}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowApplicationModal(false)}
                      disabled={uploading}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {selectedJob.title}
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="mt-6 p-4 bg-green-50 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            {applicationForm?.successMessage || 'Your application has been submitted successfully!'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                      {formFields.map(field => renderFormField(field))}
                      
                      {formError && (
                        <div className="rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 0L6 8.586 4.707 7.293a1 1 0 00-1.414 1.414L4.586 10l-1.293 1.293a1 1 0 101.414 1.414L6 11.414l1.293 1.293a1 1 0 001.414-1.414L7.414 10l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700">{formError}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowApplicationModal(false)}
                          disabled={uploading}
                          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={uploading}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          {uploading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {uploadProgress > 0 ? `Uploading (${uploadProgress}%)` : 'Submitting...'}
                            </>
                          ) : (
                            applicationForm?.submitButtonText || 'Submit Application'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the main component
  return (
    <div ref={inViewRef} className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
              {description}
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {showSearch && (
              <div className="w-full md:w-1/3">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 sm:text-sm"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {showFilters && filters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => renderFilter(filter))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Jobs */}
        {showFeatured && featuredJobs.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {featuredTitle}
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map(job => renderJobCard(job, true))}
            </div>
          </div>
        )}

        {/* All Jobs */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              All Positions
            </h3>
            <p className="text-sm text-gray-500">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 0L6 8.586 4.707 7.293a1 1 0 00-1.414 1.414L4.586 10l-1.293 1.293a1 1 0 101.414 1.414L6 11.414l1.293 1.293a1 1 0 001.414-1.414L7.414 10l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilters({});
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Reset filters
                </button>
              </div>
            </div>
          ) : layout === 'grid' ? (
            <div className={`grid gap-6 ${columns === '1' ? 'md:grid-cols-1' : columns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {filteredJobs.map(job => renderJobCard(job))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <li key={job.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {job.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {job.type}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="[http://www.w3.org/2000/svg"](http://www.w3.org/2000/svg") viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {job.location}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="[http://www.w3.org/2000/svg"](http://www.w3.org/2000/svg") viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                            {job.department}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="[http://www.w3.org/2000/svg"](http://www.w3.org/2000/svg") viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <p>
                            Posted on{' '}
                            <time dateTime={job.createdAt}>
                              {new Date(job.createdAt).toLocaleDateString()}
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleApply(job)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        {showBenefits && benefits.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text
