-- Add thumbnail_url column to referrals table
ALTER TABLE public.referrals 
ADD COLUMN thumbnail_url TEXT;