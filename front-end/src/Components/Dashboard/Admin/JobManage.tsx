/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateJobMutation } from '../../../redux/features/jobs/jobsApi';


// === Zod Schema (Validation Rules) ===
const jobSchema = z.object({
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Too long'),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100),
  jobType: z.enum(['Internship', 'Part-time', 'Full-time', 'Freelance']),
  experienceLevel: z.enum([
    'Fresher',
    'Junior (0-2 years)',
    'Mid-Level (2-5 years)',
    'Senior (5+ years)',
  ]),
  skillsInput: z
    .string()
    .min(1, 'At least one skill is required')
    .transform((val) =>
      val
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    )
    .refine((arr) => arr.length > 0, 'At least one valid skill is required'),
  careerTrack: z
    .enum([
      'Web Development',
      'Mobile Development',
      'Data Science & Analytics',
      'UI/UX Design',
      'Graphic Design',
      'Digital Marketing',
      'Content Creation',
      'Business Development',
      'Project Management',
      'HR & Recruitment',
      'Finance & Accounting',
      'Customer Support',
      'Sales',
      'Other',
    ])
    .optional(),
  description: z.string().optional(),
  applyLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type JobFormData = z.infer<typeof jobSchema>;

// === Options ===
const jobTypeOptions = ['Internship', 'Part-time', 'Full-time', 'Freelance'] as const;
const experienceLevelOptions = [
  'Fresher',
  'Junior (0-2 years)',
  'Mid-Level (2-5 years)',
  'Senior (5+ years)',
] as const;
const careerTrackOptions = [
  'Web Development',
  'Mobile Development',
  'Data Science & Analytics',
  'UI/UX Design',
  'Graphic Design',
  'Digital Marketing',
  'Content Creation',
  'Business Development',
  'Project Management',
  'HR & Recruitment',
  'Finance & Accounting',
  'Customer Support',
  'Sales',
  'Other',
] as const;

// === Reusable Field ===
const FormField: React.FC<{
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, required = false, error, children }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

// === Main Component ===
const PostJobForm: React.FC = () => {
  const [createJob, { isLoading, isSuccess, isError, error, reset }] =
    useCreateJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: '',
      location: '',
      jobType: 'Full-time',
      experienceLevel: 'Fresher',
      skillsInput: '',
      careerTrack: undefined,
      description: '',
      applyLink: '',
    },
  });

  const [message, setMessage] = React.useState<{
    type: 'success' | 'error' | null;
    text: string | null;
  }>({ type: null, text: null });

  // === Success / Error Feedback ===
  useEffect(() => {
    if (isSuccess) {
      setMessage({ type: 'success', text: 'Job posted successfully!' });
      resetForm();
      const t = setTimeout(() => {
        setMessage({ type: null, text: null });
        reset();
      }, 5000);
      return () => clearTimeout(t);
    }
    if (isError) {
      const msg =
        (error as any)?.data?.message || 'Failed to post job. Try again.';
      setMessage({ type: 'error', text: msg });
      const t = setTimeout(() => {
        setMessage({ type: null, text: null });
        reset();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [isSuccess, isError, error, reset, resetForm]);

  // === Submit Handler ===
  const onSubmit = async (data: JobFormData) => {
    setMessage({ type: null, text: null });

    const payload = {
      ...data,
      requiredSkills: data.skillsInput,
      // Remove temp field
      skillsInput: undefined as any,
    };
    delete (payload as any).skillsInput;

    try {
      await createJob(payload).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">
          Post New Opportunity
        </h2>
        <p className="text-gray-500 mb-8">
          Fill in the details to create a job listing.
        </p>

        {/* === Status Message === */}
        {message.type && (
          <div
            className={`p-4 mb-6 rounded-xl font-medium transition-all duration-300 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                : 'bg-red-100 text-red-700 border-l-4 border-red-500'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* === Required Fields === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
            <FormField label="Company Name" required error={errors.company?.message}>
              <input
                {...register('company')}
                type="text"
                placeholder="Google"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              />
            </FormField>

            <FormField label="Location" required error={errors.location?.message}>
              <input
                {...register('location')}
                type="text"
                placeholder="Bangalore, Remote"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              />
            </FormField>

            <FormField label="Job Type" required error={errors.jobType?.message}>
              <select
                {...register('jobType')}
                className="p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              >
                {jobTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Experience Level"
              required
              error={errors.experienceLevel?.message}
            >
              <select
                {...register('experienceLevel')}
                className="p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              >
                {experienceLevelOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Required Skills"
              required
              error={errors.skillsInput?.message}
            >
              <input
                {...register('skillsInput')}
                type="text"
                placeholder="React, TypeScript, Node.js"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              />
            </FormField>

            <FormField label="Career Track (Optional)" error={errors.careerTrack?.message}>
              <select
                {...register('careerTrack')}
                className="p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              >
                <option value="">-- Select Track --</option>
                {careerTrackOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* === Optional Fields === */}
          <h3 className="text-2xl font-semibold text-gray-800 pt-4">
            Job Details (Optional)
          </h3>

          <FormField label="Job Description" error={errors.description?.message}>
            <textarea
              {...register('description')}
              rows={5}
              placeholder="Describe the role..."
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm resize-y"
            />
          </FormField>

          <FormField label="Application Link" error={errors.applyLink?.message}>
            <input
              {...register('applyLink')}
              type="url"
              placeholder="https://yourcompany.com/apply"
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
            />
          </FormField>

          {/* === Submit === */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.01] shadow-lg flex items-center justify-center ${
              isLoading
                ? 'bg-indigo-400 text-white cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Posting...
              </>
            ) : (
              'Post Job Listing'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;