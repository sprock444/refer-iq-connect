
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ReferralData {
  referrerName: string;
  referrerEmail: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  relationship: 'friend' | 'former-colleague' | 'family' | 'classmate' | 'other';
  linkedinUrl?: string;
  portfolioUrl?: string;
  endorsementText?: string;
  whyFit?: string;
  cultureAlignment?: string;
  resumeFilePath?: string;
  videoFilePath?: string;
  thumbnailUrl?: string;
  status?: string;
}

export const useReferrals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadResumeFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('resume')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      return filePath;
    } catch (error) {
      console.error('Error uploading resume file:', error);
      throw error;
    }
  };

  const uploadVideoFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('video')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Video upload error:', uploadError);
        throw uploadError;
      }

      return filePath;
    } catch (error) {
      console.error('Error uploading video file:', error);
      throw error;
    }
  };

  const createReferral = async (data: ReferralData, resumeFile?: File | null, videoFile?: File | null, thumbnailUrl?: string | null) => {
    setIsLoading(true);
    try {
      let resumeFilePath = data.resumeFilePath;
      let videoFilePath = data.videoFilePath;
      
      // If a resume file is provided, upload it first
      if (resumeFile) {
        resumeFilePath = await uploadResumeFile(resumeFile);
      }

      // If a video file is provided, upload it first
      if (videoFile) {
        videoFilePath = await uploadVideoFile(videoFile);
      }

      const { data: referral, error } = await supabase
        .from('referrals')
        .insert({
          referrer_name: data.referrerName,
          referrer_email: data.referrerEmail,
          recipient_first_name: data.recipientFirstName,
          recipient_last_name: data.recipientLastName,
          recipient_email: data.recipientEmail,
          candidate_name: data.candidateName,
          candidate_email: data.candidateEmail,
          position: data.position,
          relationship: data.relationship,
          linkedin_url: data.linkedinUrl,
          portfolio_url: data.portfolioUrl,
          endorsement_text: data.endorsementText,
          why_fit: data.whyFit,
          culture_alignment: data.cultureAlignment,
          resume_file_path: resumeFilePath,
          video_file_path: videoFilePath,
          thumbnail_url: thumbnailUrl,
          status: data.status || 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Referral submitted successfully!",
        description: "Thank you for your referral. We'll review it shortly.",
      });

      return referral;
    } catch (error) {
      console.error('Error creating referral:', error);
      toast({
        title: "Error submitting referral",
        description: "There was a problem submitting your referral. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getReferrals = async () => {
    setIsLoading(true);
    try {
      const { data: referrals, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return referrals;
    } catch (error) {
      console.error('Error fetching referrals:', error);
      toast({
        title: "Error loading referrals",
        description: "There was a problem loading the referrals.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createReferral,
    getReferrals,
    isLoading
  };
};
