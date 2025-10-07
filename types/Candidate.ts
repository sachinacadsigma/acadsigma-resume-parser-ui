// types/Candidate.ts

export type Candidate = {
  candidate_name: string;
  match_score: number;
  fit_label: string;
  matched_skills: string[];
  missing_must_have_skills: string[];
  missing_preferred_skills: string[];
  experience_fit?: string;
  education_fit?: string;
  certifications_fit?: string;
  risks?: string[];
  one_liner?: string[];
  github_summary?: {
    profile: {
      username: string;
      name: string;
      bio: string;
      followers: number;
      following: number;
      public_repos: number;
      account_age_years: number;
      url: string;
    };
    languages_all: { language: string; percent: number }[];
    top_repos_by_stars: {
      name: string;
      desc: string;
      stars: number;
      language: string;
      url: string;
    }[];
    commit_activity_last_year: number;
  };
  questions?: { question: string; answer: string }[];
  resume_file_name?: string;
  email?: string;
  contact_no?: string;
  url?: string | null;
  file_name?: string | null;
};
