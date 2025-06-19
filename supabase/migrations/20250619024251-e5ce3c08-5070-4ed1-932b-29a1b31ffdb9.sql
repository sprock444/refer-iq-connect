
-- Create enum types for better data consistency
CREATE TYPE public.relationship_type AS ENUM (
  'friend',
  'former-colleague', 
  'family',
  'classmate',
  'other'
);

-- Create referrals table to store all referral information
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Referrer information
  referrer_name TEXT NOT NULL,
  referrer_email TEXT NOT NULL,
  
  -- Candidate information
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  position TEXT NOT NULL,
  relationship relationship_type NOT NULL,
  
  -- Optional URLs
  linkedin_url TEXT,
  portfolio_url TEXT,
  
  -- Text content
  endorsement_text TEXT,
  why_fit TEXT,
  culture_alignment TEXT,
  
  -- File references (we'll store file paths/URLs)
  resume_file_path TEXT,
  video_file_path TEXT,
  
  -- AI analysis results (stored as JSON)
  ai_insights JSONB,
  
  -- Status tracking
  status TEXT DEFAULT 'pending',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert referrals (for now - we can restrict later)
CREATE POLICY "Anyone can create referrals" ON public.referrals
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to view referrals (for now - we can restrict later)
CREATE POLICY "Anyone can view referrals" ON public.referrals
  FOR SELECT USING (true);

-- Create policy to allow anyone to update referrals (for now - we can restrict later)
CREATE POLICY "Anyone can update referrals" ON public.referrals
  FOR UPDATE USING (true);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
