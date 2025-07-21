-- Add recipient information columns to the referrals table
ALTER TABLE public.referrals 
ADD COLUMN recipient_first_name TEXT,
ADD COLUMN recipient_last_name TEXT,
ADD COLUMN recipient_email TEXT;