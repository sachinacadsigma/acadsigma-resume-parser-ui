import { X } from 'lucide-react';
import toast from 'react-hot-toast';

type JDGuideProps = {
  onClose: () => void;
};

const template = `Role: Senior Data Engineer
Team/Domain: Analytics Platform • Fintech

Responsibilities:
- Build and maintain batch/streaming data pipelines.
- Optimize warehouse models and query performance.
- Collaborate with ML/Analytics to productionize datasets.

Must-Have Skills: python, sql, airflow, dbt, spark, aws (s3, glue, athena), data modeling
Nice-to-Have Skills: kafka, terraform, snowflake, docker, kubernetes

Experience: 5–8 years (data engineering); 1+ year leading small initiatives
Location & Work Mode: Bangalore • Hybrid (2–3 days onsite)
Notes: Immediate joiners preferred; fintech experience is a plus.`;

const JDGuide = ({ onClose }: JDGuideProps) => {
  const copyTemplate = () => {
    navigator.clipboard.writeText(template);
    toast.success('Copied!');
  };
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl space-y-5 text-sm text-slate-700'>
        {/* Header */}

        <div className='sticky top-0 flex items-center justify-end'>
          <button
            onClick={onClose}
            className='p-2 cursor-pointer text-slate-500 hover:text-slate-700'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <div className='rounded-2xl border border-slate-200 p-4 bg-white'>
          <h3 className='text-base font-semibold text-slate-900'>
            Write a clear Job Description
          </h3>
          <p className='mt-1 text-slate-600'>
            Paste your JD text or upload a file. The clearer the JD, the better
            the candidate matching.
          </p>
          <div className='mt-3 flex flex-wrap items-center gap-2'>
            <span className='inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700'>
              ✅ Best length: 150–300 words
            </span>
            <span className='inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-700'>
              🎯 Add must-have & nice-to-have skills
            </span>
            <span className='inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700'>
              ⏱ Experience in years
            </span>
          </div>
        </div>

        {/* What to include */}
        <div className='rounded-2xl border border-slate-200 bg-white p-4'>
          <h4 className='text-sm font-semibold text-slate-900'>
            Include these sections
          </h4>
          <ul className='mt-2 list-disc space-y-1 pl-5'>
            <li>
              <span className='font-medium'>Role Title</span> (e.g., “Senior
              Data Engineer”)
            </li>
            <li>
              <span className='font-medium'>About the Team</span> (1–2 lines on
              product/domain)
            </li>
            <li>
              <span className='font-medium'>Responsibilities</span> (4–7
              action-oriented bullets)
            </li>
            <li>
              <span className='font-medium'>Must-Have Skills</span> (explicit,
              comma-separated)
            </li>
            <li>
              <span className='font-medium'>Nice-to-Have Skills</span> (separate
              list)
            </li>
            <li>
              <span className='font-medium'>Experience</span> (min/max years,
              leadership if needed)
            </li>
            <li>
              <span className='font-medium'>Location & Work Mode</span>{' '}
              (onsite/hybrid/remote, shift if any)
            </li>
            <li>
              <span className='font-medium'>Compensation/CTC Range</span>{' '}
              (optional but helpful)
            </li>
          </ul>
        </div>

        {/* Do / Don't */}
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-2xl border border-emerald-200 bg-emerald-50 p-4'>
            <h5 className='text-sm font-semibold text-emerald-900'>Do</h5>
            <ul className='mt-2 list-disc space-y-1 pl-5 text-emerald-900/90'>
              <li>Use simple, unambiguous language.</li>
              <li>
                Call out certifications or tool versions (e.g., “AWS
                (Associate+)”).
              </li>
              <li>Group skills by category (Backend, Data, Cloud).</li>
              <li>
                Mention domain if critical (fintech, healthcare, e-commerce).
              </li>
            </ul>
          </div>
          <div className='rounded-2xl border border-rose-200 bg-rose-50 p-4'>
            <h5 className='text-sm font-semibold text-rose-900'>Don’t</h5>
            <ul className='mt-2 list-disc space-y-1 pl-5 text-rose-900/90'>
              <li>Mix must-have and nice-to-have in one list.</li>
              <li>
                Use vague phrases like “good knowledge” without specifics.
              </li>
              <li>Paste marketing copy or benefits only—focus on the work.</li>
              <li>Leave out experience range or tech stack.</li>
            </ul>
          </div>
        </div>

        {/* Copyable template */}
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-semibold text-slate-900'>
              Quick template
            </h4>
            <span
              onClick={copyTemplate}
              className='text-[10px]  cursor-pointer uppercase tracking-wider text-slate-500 hover:text-slate-700'
            >
              Copy & edit
            </span>
          </div>
          <pre className='mt-2 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-3 text-xs leading-5 text-slate-800'>
            {template}
          </pre>
        </div>

        {/* Helper footnote */}
        <p className='text-xs text-slate-500'>
          Tip: Use commas for skills (e.g.,{' '}
          <span className='font-medium'>python, pandas, aws</span>) so we can
          parse them accurately.
        </p>
      </div>
    </div>
  );
};

export default JDGuide;
