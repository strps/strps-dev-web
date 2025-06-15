'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { StrpsCareersBlock } from '@/payload-types'

type JobType = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  featured?: boolean
}

type FormValues = {
  // Add form field types here based on your application form fields
  name: string
  email: string
  phone?: string
  resume: FileList
  coverLetter?: string
  // Add other fields as needed
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
}

export const StrpsCareers: React.FC<StrpsCareersBlock> = ({
  heading = 'Join Our Team',
  description = 'Explore career opportunities and join our growing team.',
  layout = 'grid',
  columns = '2',
}) => {
  const [loading] = useState(false)
  const [filteredJobs] = useState<JobType[]>([])
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null)

  // Add form handling
  const {
    // register,
    // handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<FormValues>()

  const handleApply = (job: JobType) => {
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  // Add form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      // Handle form submission here
      console.log('Form submitted:', data)
      // Reset form and close modal
      reset()
      setShowApplicationModal(false)
    } catch (error) {
      console.error('Error submitting application:', error)
    }
  }

  const renderJobCard = (job: JobType, featured = false) => (
    <motion.div
      key={job.id}
      className={`relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${
        featured ? 'ring-2 ring-indigo-500' : ''
      }`}
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {job.department}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {job.location}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
      <p className="mt-3 text-sm text-gray-500 line-clamp-3">{job.description}</p>
      <div className="mt-4">
        <motion.button
          type="button"
          onClick={() => handleApply(job)}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-900 text-sm font-medium"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply now
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )

  // Update the renderApplicationModal function with animations
  const renderApplicationModal = () => (
    <AnimatePresence>
      {showApplicationModal && selectedJob && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <motion.div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowApplicationModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Modal content remains the same */}
              {/* ... */}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Update the main return with animations
  return (
    <motion.div
      className="py-12 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {heading}
          </motion.h2>
          {description && (
            <motion.p
              className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Rest of the component with animations */}
        {/* ... */}

        {/* Job Listings */}
        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div className="text-center py-12" variants={itemVariants}>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No positions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are currently no open positions that match your criteria.
              </p>
            </motion.div>
          ) : layout === 'grid' ? (
            <motion.div
              className={`grid gap-6 md:grid-cols-${columns} lg:grid-cols-${columns}`}
              variants={containerVariants}
            >
              {filteredJobs.map((job) => (
                <motion.div key={job.id} variants={itemVariants}>
                  {renderJobCard(job, job.featured)}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="bg-white shadow overflow-hidden sm:rounded-md"
              variants={containerVariants}
            >
              <motion.ul className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <motion.li key={job.id} variants={itemVariants} whileHover={{ x: 5 }}>
                    {renderJobCard(job, job.featured)}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </motion.div>

        {/* Application Modal */}
        {renderApplicationModal()}
      </div>
    </motion.div>
  )
}

export default StrpsCareers
